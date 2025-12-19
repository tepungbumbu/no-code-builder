import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { DeviceType, SaveStatus } from '@/lib/types';

interface EditorHeaderProps {
  projectName: string;
  status: SaveStatus;
  device: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  onMenuClick: () => void;
  isSidebarOpen?: boolean;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  projectName,
  status,
  device,
  onDeviceChange,
  onMenuClick,
  isSidebarOpen = true,
}) => {
  const router = useRouter();

  const statusColor = {
    saved: 'text-success-600',
    saving: 'text-warning-600',
    error: 'text-danger-600',
  };

  const statusText = {
    saved: 'Saved',
    saving: 'Saving...',
    error: 'Error',
  };

  return (
    <header className="h-14 bg-white border-b border-neutral-200 px-4 flex items-center justify-between">
      {/* Left: Menu & Navigation */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={onMenuClick}
          className={cn(
            "p-1.5 rounded-md transition-colors",
            isSidebarOpen 
              ? "bg-primary-50 text-primary-600" 
              : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          )}
          title={isSidebarOpen ? "Refor sidebar" : "Show sidebar"}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 4h14M3 10h14M3 16h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="flex items-center space-x-2">
          <button className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors" title="Undo">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 8h10a4 4 0 110 8H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6 6l-2 2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors" title="Redo">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 8H4a4 4 0 100 8h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 6l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Center: Device Switcher & Zoom */}
      <div className="flex items-center space-x-4">
        {/* Device Switcher */}
        <div className="flex items-center bg-neutral-100 rounded-md p-0.5">
          <button
            onClick={() => onDeviceChange('desktop')}
            className={cn(
              'p-1.5 rounded transition-colors',
              device === 'desktop'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
            title="Desktop"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="3" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 13v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => onDeviceChange('tablet')}
            className={cn(
              'p-1.5 rounded transition-colors',
              device === 'tablet'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
            title="Tablet"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="4" y="2" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 13.5h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => onDeviceChange('mobile')}
            className={cn(
              'p-1.5 rounded transition-colors',
              device === 'mobile'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
            title="Mobile"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="5" y="2" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 13h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Zoom */}
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-neutral-100 rounded transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="text-xs text-neutral-600 font-medium w-12 text-center">100%</span>
          <button className="p-1 hover:bg-neutral-100 rounded transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Status */}
        <span className={cn('text-xs font-medium', statusColor[status])}>
          {statusText[status]}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors">
          Design
        </button>
        <button className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors">
          Pages
        </button>
        <button className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors">
          Preview
        </button>
        
        <div className="h-4 w-px bg-neutral-200 mx-1" />
        
        <button className="px-4 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors">
          Publish
        </button>
      </div>
    </header>
  );
};
