'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/store/editor-store';
import { StylePanel } from './StylePanel';
import { cn } from '@/lib/utils';

export const PropertiesPanel: React.FC = () => {
  const { selectedIds, pageStructure } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'styles' | 'settings'>('styles');

  // Get the first selected element
  const selectedId = Array.from(selectedIds)[0];
  const selectedElement = selectedId
    ? findElementById(pageStructure, selectedId)
    : null;

  if (!selectedElement) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-neutral-500 px-6 text-center">
        <div className="text-5xl mb-4">🎨</div>
        <h3 className="font-semibold text-neutral-700 mb-2">No Element Selected</h3>
        <p className="text-sm">
          Click on an element in the canvas to edit its properties
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-neutral-200">
        {(['styles', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 px-4 py-3 text-sm font-medium transition-colors capitalize',
              activeTab === tab
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'styles' && <StylePanel element={selectedElement} />}
        {activeTab === 'settings' && <SettingsPanel element={selectedElement} />}
      </div>
    </div>
  );
};

// Helper function to find element by ID
function findElementById(elements: any[], id: string): any | null {
  for (const element of elements) {
    if (element.id === id) return element;
    if (element.children) {
      const found = findElementById(element.children, id);
      if (found) return found;
    }
  }
  return null;
}

// Settings Panel Component
const SettingsPanel: React.FC<{ element: any }> = ({ element }) => {
  const { updateElement } = useEditorStore();

  const handlePropChange = (key: string, value: any) => {
    updateElement(element.id, {
      props: {
        ...element.props,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-neutral-900 capitalize">{element.type} Settings</h3>

      {/* Type-specific settings */}
      {(element.type === 'heading' || element.type === 'text' || element.type === 'button') && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Content</label>
          <textarea
            value={element.props.content || ''}
            onChange={(e) => handlePropChange('content', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={3}
          />
        </div>
      )}

      {element.type === 'image' && (
        <>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Image URL</label>
            <input
              type="text"
              value={element.props.src || ''}
              onChange={(e) => handlePropChange('src', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Alt Text</label>
            <input
              type="text"
              value={element.props.alt || ''}
              onChange={(e) => handlePropChange('alt', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe the image"
            />
          </div>
        </>
      )}

      {element.type === 'button' && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Link URL</label>
          <input
            type="text"
            value={element.props.href || ''}
            onChange={(e) => handlePropChange('href', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://example.com"
          />
        </div>
      )}

      {element.type === 'heading' && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Heading Level</label>
          <select
            value={element.props.level || 1}
            onChange={(e) => handlePropChange('level', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <option key={level} value={level}>
                H{level}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
