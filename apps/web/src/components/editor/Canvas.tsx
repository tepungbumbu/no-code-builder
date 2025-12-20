'use client';

import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useEditorStore } from '@/store/editor-store';
import { CanvasElement } from './CanvasElement';
import type { PageElement } from '@/lib/types';

export const Canvas: React.FC = () => {
  const { pageStructure, addElement, device, selectedIds, selectElement } = useEditorStore();
  const canvasRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item: PageElement, monitor) => {
      if (!monitor.didDrop()) {
        addElement(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }), [addElement]);

  const deviceWidths = {
    desktop: '1280px', // Large
    tablet: '640px',   // Medium
    mobile: '360px',   // Small
  };

  const getMarginTop = () => {
    if (device === 'mobile') return 'mt-[160px]';
    if (device === 'tablet') return 'mt-[65px]';
    return 'mt-8';
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={dropRef}
        style={{
          width: deviceWidths[device],
          maxWidth: '100%',
        }}
        className={`bg-white ${getMarginTop()} shadow-clay-lg rounded-clay min-h-[800px] relative transition-all duration-300 ${
          isOver ? 'ring-4 ring-primary-300' : ''
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            selectElement(null);
          }
        }}
      >
        <div ref={canvasRef} className="relative min-h-[800px]">
          {pageStructure.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-600">Your Canvas Awaits</h3>
              <p className="text-center text-neutral-500">
                Drag components from the left sidebar to start building
              </p>
            </div>
          ) : (
            pageStructure.map((element) => (
              <CanvasElement
                key={element.id}
                element={element}
                selected={selectedIds.has(element.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
