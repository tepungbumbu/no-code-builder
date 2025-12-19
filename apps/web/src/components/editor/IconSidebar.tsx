'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'favorites',
    label: 'Favorites',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3l2.5 5.5L18 9l-4.5 4 1 6-4.5-2.5L5 19l1-6L1.5 9l5.5-.5L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'elements',
    label: 'Elements',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'content',
    label: 'Content',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 4h12M4 7h12M4 10h8M4 13h8M4 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'boxes',
    label: 'Boxes',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'tables',
    label: 'Tables',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 8h14M10 8v9" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'features',
    label: 'Features',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 2v3M10 15v3M18 10h-3M5 10H2M15.5 4.5l-2 2M6.5 13.5l-2 2M15.5 15.5l-2-2M6.5 6.5l-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'images',
    label: 'Images',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/>
        <path d="M17 13l-4-4-6 6-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'accordion',
    label: 'Accordion',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="9" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="15" width="14" height="2" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'slider',
    label: 'Slider',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="5" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="2" fill="currentColor"/>
        <path d="M6 14l-1.5 1.5M14 14l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

interface IconSidebarProps {
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
  showLabels?: boolean;
}

export const IconSidebar: React.FC<IconSidebarProps> = ({
  activeSection = 'elements',
  onSectionChange,
  showLabels = true,
}) => {
  return (
    <div className={cn(
      'bg-neutral-100 border-r border-neutral-200 flex flex-col items-center py-4 space-y-1 transition-all',
      showLabels ? 'w-24' : 'w-16'
    )}>
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionChange?.(item.id)}
          className={cn(
            'flex flex-col items-center justify-center rounded-lg transition-all px-2',
            showLabels ? 'py-2.5 space-y-1' : 'w-12 h-12',
            activeSection === item.id
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-neutral-600 hover:bg-white hover:text-neutral-900'
          )}
          title={item.label}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          {showLabels && (
            <span className="text-[10px] font-medium text-center leading-tight">{item.label}</span>
          )}
        </button>
      ))}
    </div>
  );
};
