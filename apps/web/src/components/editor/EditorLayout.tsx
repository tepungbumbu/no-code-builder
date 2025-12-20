import React from 'react';
import { cn } from '@/lib/utils';

interface EditorLayoutProps {
  iconSidebar?: React.ReactNode;
  leftPanel: React.ReactNode;
  canvas: React.ReactNode;
  rightPanel: React.ReactNode;
  isIconSidebarOpen?: boolean;
  isRightPanelOpen?: boolean;
  onToggleRightPanel?: () => void;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({
  iconSidebar,
  leftPanel,
  canvas,
  rightPanel,
  isIconSidebarOpen = true,
  isRightPanelOpen = true,
  onToggleRightPanel,
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

      {/* Left Panel - Hidden when icon sidebar is closed */}
      <div 
        className={cn(
          "bg-white border-r border-neutral-200 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
          isIconSidebarOpen ? "w-80 opacity-100" : "w-0 opacity-0 border-none"
        )}
      >
        {leftPanel}
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-8 relative">
        {canvas}
      </div>

      {/* Right Sidebar */}
      <div className="relative flex flex-col h-full bg-white border-l border-neutral-200 shadow-sm z-30">
        {/* Toggle Button */}
        <button
          onClick={onToggleRightPanel}
          className="absolute top-6 left-[-30px] z-50 bg-white border border-neutral-200 rounded-md p-4 shadow-md hover:bg-neutral-50 transition-colors focus:outline-none"
          title={isRightPanelOpen ? "Close panel" : "Open panel"}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={cn("transition-transform duration-200", isRightPanelOpen ? "rotate-0" : "rotate-180")}
          >
            <path
              d="M7.5 2L3.5 6L7.5 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div 
          className={cn(
            "flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
            isRightPanelOpen ? "w-96 opacity-100" : "w-0 opacity-0 px-0"
          )}
        >
          {rightPanel}
        </div>
      </div>
    </div>
  );
};
