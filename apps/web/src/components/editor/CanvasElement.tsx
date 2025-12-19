'use client';

import React from 'react';
import { useEditorStore } from '@/store/editor-store';
import { cn } from '@/lib/utils';
import type { PageElement } from '@/lib/types';

interface CanvasElementProps {
  element: PageElement;
  selected: boolean;
}

export const CanvasElement: React.FC<CanvasElementProps> = ({ element, selected }) => {
  const { selectElement, device } = useEditorStore();

  // Get styles for current device
  const styles = element.styles[device] || element.styles.desktop || {};

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative transition-all duration-200',
        selected && 'ring-2 ring-primary-500 ring-offset-2'
      )}
      style={styles as React.CSSProperties}
    >
      {/* Render based on element type */}
      {element.type === 'heading' && (
        <h1
          style={{
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            color: styles.color,
            lineHeight: styles.lineHeight,
          }}
        >
          {element.props.content}
        </h1>
      )}

      {element.type === 'text' && (
        <p
          style={{
            fontSize: styles.fontSize,
            color: styles.color,
            lineHeight: styles.lineHeight,
          }}
        >
          {element.props.content}
        </p>
      )}

      {element.type === 'image' && (
        <img
          src={element.props.src}
          alt={element.props.alt}
          style={{
            width: styles.width,
            height: styles.height,
            borderRadius: styles.borderRadius,
            objectFit: 'cover',
          }}
        />
      )}

      {element.type === 'button' && (
        <button
          style={{
            padding: styles.padding,
            backgroundColor: styles.backgroundColor,
            color: styles.color,
            borderRadius: styles.borderRadius,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            border: styles.border || 'none',
            cursor: 'pointer',
          }}
        >
          {element.props.content}
        </button>
      )}

      {(element.type === 'container' || element.type === 'grid') && (
        <div
          style={{
            display: styles.display,
            flexDirection: styles.flexDirection as any,
            gridTemplateColumns: styles.gridTemplateColumns,
            gap: styles.gap,
            backgroundColor: styles.backgroundColor,
            borderRadius: styles.borderRadius,
            minHeight: styles.minHeight,
          }}
        >
          {element.children && element.children.length > 0 ? (
            element.children.map((child) => (
              <CanvasElement
                key={child.id}
                element={child}
                selected={useEditorStore.getState().selectedIds.has(child.id)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center text-neutral-400 text-sm">
              Drop elements here
            </div>
          )}
        </div>
      )}

      {/* Selection indicator with delete button */}
      {selected && (
        <>
          {/* Element label */}
          <div className="absolute -top-8 left-0 bg-primary-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-md">
            <span className="capitalize">{element.type}</span>
          </div>
          
          {/* Delete button - Top Right, Red */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Delete this element?')) {
                useEditorStore.getState().deleteElement(element.id);
              }
            }}
            className="absolute -top-8 -right-2 p-1.5 bg-danger-500 hover:bg-danger-600 text-white rounded-md shadow-md transition-colors"
            title="Delete element"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path 
                d="M3 3.5h8M5.5 3.5v-1a1 1 0 011-1h1a1 1 0 011 1v1m1.5 0v7a1 1 0 01-1 1h-5a1 1 0 01-1-1v-7" 
                stroke="currentColor" 
                strokeWidth="1.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};
