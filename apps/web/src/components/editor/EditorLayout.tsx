import React from 'react';
import { cn } from '@/lib/utils';

interface EditorLayoutProps {
  iconSidebar?: React.ReactNode;
  leftPanel: React.ReactNode;
  canvas: React.ReactNode;
  rightPanel: React.ReactNode;
  isIconSidebarOpen?: boolean;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({
  iconSidebar,
  leftPanel,
  canvas,
  rightPanel,
  isIconSidebarOpen = true,
}) => {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Icon Sidebar - Slides in/out to the right */}
      {iconSidebar && (
        <div 
          className={cn(
            'transition-transform duration-300 ease-in-out z-20',
            isIconSidebarOpen ? 'relative' : 'absolute -translate-x-full'
          )}
        >
          {iconSidebar}
        </div>
      )}

      {/* Left Panel - Always visible */}
      <div className="w-80 bg-white border-r border-neutral-200 flex flex-col overflow-hidden">
        {leftPanel}
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-8">
        {canvas}
      </div>

      {/* Right Sidebar */}
      <div className="w-96 bg-white border-l border-neutral-200 flex flex-col overflow-hidden">
        {rightPanel}
      </div>
    </div>
  );
};
