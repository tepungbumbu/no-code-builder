import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { enableMapSet } from 'immer';
import { projectAPI } from '@/lib/api';
import { debounce } from '@/lib/utils';
import type { 
  Project, 
  PageElement, 
  DeviceType, 
  SaveStatus,
  EditorHistory 
} from '@/lib/types';

// Enable Immer MapSet support for Set/Map data structures
enableMapSet();

interface EditorState {
  // Data
  project: Project | null;
  pageStructure: PageElement[];
  selectedIds: Set<string>;
  history: EditorHistory;
  
  // UI State
  device: DeviceType;
  activePanel: 'layers' | 'components' | 'cms';
  status: SaveStatus;
  
  // Actions - Project
  setProject: (project: Project) => void;
  save: () => Promise<void>;
  
  // Actions - Elements
  addElement: (element: PageElement, parentId?: string) => void;
  updateElement: (id: string, changes: Partial<PageElement>) => void;
  deleteElement: (id: string) => void;
  moveElement: (id: string, newPosition: { x: number; y: number }) => void;
  reorderElement: (id: string, newOrder: number) => void;
  
  // Actions - Selection
  selectElement: (id: string | null, multi?: boolean) => void;
  clearSelection: () => void;
  
  // Actions - History
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;
  
  // Actions - UI
  setDevice: (device: DeviceType) => void;
  setActivePanel: (panel: 'layers' | 'components' | 'cms') => void;
}

// Helper to find element by ID
const findElementById = (elements: PageElement[], id: string): PageElement | null => {
  for (const element of elements) {
    if (element.id === id) return element;
    if (element.children) {
      const found = findElementById(element.children, id);
      if (found) return found;
    }
  }
  return null;
};

// Helper to remove element by ID
const removeElementById = (elements: PageElement[], id: string): PageElement[] => {
  return elements
    .filter((el) => el.id !== id)
    .map((el) => ({
      ...el,
      children: el.children ? removeElementById(el.children, id) : undefined,
    }));
};

export const useEditorStore = create<EditorState>()(
  immer((set, get) => ({
    // Initial state
    project: null,
    pageStructure: [],
    selectedIds: new Set(),
    history: {
      past: [],
      present: [],
      future: [],
    },
    device: 'desktop',
    activePanel: 'layers',
    status: 'saved',

    // Set project
    setProject: (project: Project) => {
      set((state) => {
        state.project = project;
        state.pageStructure = project.draftStructure || [];
        state.history.present = project.draftStructure || [];
      });
    },

    // Save to backend
    save: debounce(async () => {
      const { project, pageStructure } = get();
      if (!project) return;

      set({ status: 'saving' });

      try {
        await projectAPI.save(project.id, pageStructure);
        set({ status: 'saved' });
      } catch (error) {
        console.error('Save error:', error);
        set({ status: 'error' });
      }
    }, 2000),

    // Add element
    addElement: (element: PageElement, parentId?: string) => {
      set((state) => {
        // Push current state to history
        state.history.past.push(state.pageStructure);
        state.history.future = [];

        if (!parentId) {
          state.pageStructure.push(element);
        } else {
          const parent = findElementById(state.pageStructure, parentId);
          if (parent) {
            if (!parent.children) parent.children = [];
            parent.children.push(element);
          }
        }

        state.selectedIds = new Set([element.id]);
      });

      get().save();
    },

    // Update element
    updateElement: (id: string, changes: Partial<PageElement>) => {
      set((state) => {
        const element = findElementById(state.pageStructure, id);
        if (element) {
          Object.assign(element, changes);
        }
      });

      get().save();
    },

    // Delete element
    deleteElement: (id: string) => {
      set((state) => {
        state.history.past.push(state.pageStructure);
        state.history.future = [];
        
        state.pageStructure = removeElementById(state.pageStructure, id);
        state.selectedIds.delete(id);
      });

      get().save();
    },

    // Move element
    moveElement: (id: string, newPosition: { x: number; y: number }) => {
      set((state) => {
        const element = findElementById(state.pageStructure, id);
        if (element) {
          const device = state.device;
          if (!element.styles[device]) element.styles[device] = {};
          element.styles[device]!.left = `${newPosition.x}px`;
          element.styles[device]!.top = `${newPosition.y}px`;
        }
      });

      get().save();
    },

    // Reorder element
    reorderElement: (id: string, newOrder: number) => {
      set((state) => {
        state.history.past.push(state.pageStructure);
        state.history.future = [];
        
        // Implementation depends on drag & drop library
        // For now, just update the order property
        const element = findElementById(state.pageStructure, id);
        if (element) {
          element.order = newOrder;
        }
      });

      get().save();
    },

    // Select element
    selectElement: (id: string | null, multi = false) => {
      set((state) => {
        if (id === null) {
          state.selectedIds.clear();
        } else if (multi) {
          if (state.selectedIds.has(id)) {
            state.selectedIds.delete(id);
          } else {
            state.selectedIds.add(id);
          }
        } else {
          state.selectedIds = new Set([id]);
        }
      });
    },

    // Clear selection
    clearSelection: () => {
      set((state) => {
        state.selectedIds.clear();
      });
    },

    // Undo
    undo: () => {
      set((state) => {
        if (state.history.past.length === 0) return;

        const previous = state.history.past[state.history.past.length - 1];
        state.history.future.unshift(state.pageStructure);
        state.pageStructure = previous;
        state.history.past.pop();
      });

      get().save();
    },

    // Redo
    redo: () => {
      set((state) => {
        if (state.history.future.length === 0) return;

        const next = state.history.future[0];
        state.history.past.push(state.pageStructure);
        state.pageStructure = next;
        state.history.future.shift();
      });

      get().save();
    },

    // Push history
    pushHistory: () => {
      set((state) => {
        state.history.past.push(state.pageStructure);
        state.history.future = [];
      });
    },

    // Set device
    setDevice: (device: DeviceType) => {
      set({ device });
    },

    // Set active panel
    setActivePanel: (panel: 'layers' | 'components' | 'cms') => {
      set({ activePanel: panel });
    },
  }))
);
