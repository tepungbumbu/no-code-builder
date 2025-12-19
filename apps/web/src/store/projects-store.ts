import { create } from 'zustand';
import { projectAPI } from '@/lib/api';
import type { Project } from '@/lib/types';

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchProjects: () => Promise<void>;
  createProject: (data: { name: string; template?: string }) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  duplicateProject: (id: string) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const projects = await projectAPI.getAll();
      set({ projects: projects as Project[], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createProject: async (data) => {
    set({ loading: true, error: null });
    try {
      const project = await projectAPI.create(data);
      set((state) => ({
        projects: [...state.projects, project as Project],
        loading: false,
      }));
      return project as Project;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteProject: async (id: string) => {
    // Optimistic update
    const previousProjects = get().projects;
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    }));

    try {
      await projectAPI.delete(id);
    } catch (error: any) {
      // Revert on error
      set({ projects: previousProjects, error: error.message });
      throw error;
    }
  },

  duplicateProject: async (id: string) => {
    const project = get().projects.find((p) => p.id === id);
    if (!project) return;

    try {
      const duplicated = await projectAPI.create({
        name: `${project.name} (Copy)`,
        structure: project.draftStructure,
      });
      set((state) => ({
        projects: [...state.projects, duplicated as Project],
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  updateProject: (id: string, data: Partial<Project>) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    }));
  },
}));
