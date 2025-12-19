'use client';

import React, { useState } from 'react';
import {  cn } from '@/lib/utils';
import { LayersPanel } from './LayersPanel';
import { ComponentLibrary } from './ComponentLibrary';

type PanelType = 'layers' | 'components' | 'cms';

export const LeftSidebar: React.FC = () => {
  const [activePanel, setActivePanel] = useState<PanelType>('components');

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-neutral-200">
        {(['components', 'layers', 'cms'] as PanelType[]).map((panel) => (
          <button
            key={panel}
            onClick={() => setActivePanel(panel)}
            className={cn(
              'flex-1 px-4 py-3 text-sm font-medium transition-colors',
              activePanel === panel
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            {panel === 'components' && '🧩 Components'}
            {panel === 'layers' && '📋 Layers'}
            {panel === 'cms' && '💾 CMS'}
          </button>
        ))}
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activePanel === 'components' && <ComponentLibrary />}
        {activePanel === 'layers' && <LayersPanel />}
        {activePanel === 'cms' && (
          <div className="text-center text-neutral-500 mt-8">
            <p className="text-2xl mb-2">💾</p>
            <p>CMS Panel</p>
            <p className="text-sm mt-2">Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};
