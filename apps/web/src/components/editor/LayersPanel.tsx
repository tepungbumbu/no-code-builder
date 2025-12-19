'use client';

import React from 'react';
import { useEditorStore } from '@/store/editor-store';
import { cn } from '@/lib/utils';

export const LayersPanel: React.FC = () => {
  const { pageStructure, selectedIds, selectElement, deleteElement } = useEditorStore();

  if (pageStructure.length === 0) {
    return (
      <div className="text-center text-neutral-500 mt-8">
        <p className="text-2xl mb-2">📋</p>
        <p>No elements yet</p>
        <p className="text-sm mt-2">Drag components to canvas</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-neutral-700">Page Structure</h3>
      </div>
      {pageStructure.map((element) => (
        <LayerItem
          key={element.id}
          element={element}
          selected={selectedIds.has(element.id)}
          onClick={() => selectElement(element.id)}
          onDelete={() => deleteElement(element.id)}
        />
      ))}
    </div>
  );
};

interface LayerItemProps {
  element: any;
  selected: boolean;
  onClick: () => void;
  onDelete: () => void;
  depth?: number;
}

const LayerItem: React.FC<LayerItemProps> = ({ element, selected, onClick, onDelete, depth = 0 }) => {
  const icons = {
    heading: '📝',
    text: '📄',
    image: '🖼️',
    button: '🔘',
    container: '📦',
    grid: '▦',
  };

  return (
    <div>
      <div
        onClick={onClick}
        className={cn(
          'px-3 py-2 rounded-lg cursor-pointer transition-colors group flex items-center justify-between',
          selected ? 'bg-primary-100 text-primary-900' : 'hover:bg-neutral-100 text-neutral-700'
        )}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        <div className="flex items-center space-x-2">
          <span>{icons[element.type] || '📄'}</span>
          <span className="text-sm font-medium capitalize">{element.type}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs"
        >
          🗑️
        </button>
      </div>
      
      {/* Render children if any */}
      {element.children && element.children.length > 0 && (
        <div className="ml-4">
          {element.children.map((child: any) => (
            <LayerItem
              key={child.id}
              element={child}
              selected={useEditorStore.getState().selectedIds.has(child.id)}
              onClick={() => useEditorStore.getState().selectElement(child.id)}
              onDelete={() => useEditorStore.getState().deleteElement(child.id)}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
