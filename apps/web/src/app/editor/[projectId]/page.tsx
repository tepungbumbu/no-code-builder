'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useEditorStore } from '@/store/editor-store';
import { projectAPI } from '@/lib/api';
import { EditorLayout } from '@/components/editor/EditorLayout';
import { EditorHeader } from '@/components/editor/EditorHeader';
import { LeftSidebar } from '@/components/editor/LeftSidebar';
import { Canvas } from '@/components/editor/Canvas';
import { PropertiesPanel } from '@/components/editor/PropertiesPanel';
import { IconSidebar } from '@/components/editor/IconSidebar';
import { EditorSkeleton } from '@/components/ui/Skeleton';

export default function EditorPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const [isIconSidebarOpen, setIsIconSidebarOpen] = useState(true); // Visible by default
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true); // Visible by default
  
  const {
    project,
    setProject,
    device,
    setDevice,
    status,
    selectedIds,
    undo,
    redo,
    save,
  } = useEditorStore();

  // Load project on mount
  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await projectAPI.get(projectId);
        setProject(projectData as any);
      } catch (error) {
        console.error('Failed to load project:', error);
      }
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId, setProject]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            save();
            break;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
        }
      }

      if (e.key === 'Delete' && selectedIds.size > 0) {
        e.preventDefault();
        // Delete selected elements
        selectedIds.forEach(id => {
          useEditorStore.getState().deleteElement(id);
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIds, save, undo, redo]);

  if (!project) {
    return <EditorSkeleton />;
  }

  return (
    <ProtectedRoute>
      <DndProvider backend={HTML5Backend}>
        <div className="h-screen flex flex-col bg-neutral-100">
          <EditorHeader
            projectName={project.name}
            status={status}
            device={device}
            onDeviceChange={setDevice}
            onMenuClick={() => setIsIconSidebarOpen(!isIconSidebarOpen)}
            isSidebarOpen={isIconSidebarOpen}
          />
          
          <EditorLayout
            iconSidebar={<IconSidebar activeSection="elements" showLabels={true} />}
            leftPanel={<LeftSidebar />}
            canvas={<Canvas />}
            rightPanel={<PropertiesPanel />}
            isIconSidebarOpen={isIconSidebarOpen}
            isRightPanelOpen={isRightPanelOpen}
            onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
          />
        </div>
      </DndProvider>
    </ProtectedRoute>
  );
}
