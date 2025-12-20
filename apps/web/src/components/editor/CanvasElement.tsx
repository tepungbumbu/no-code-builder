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
        'relative transition-all duration-200'
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

      {(element.type === 'container' || element.type === 'grid') && React.createElement(
        element.props.tagName || 'div',
        {
          style: {
            display: styles.display,
            flexDirection: styles.flexDirection as any,
            justifyContent: styles.justifyContent,
            alignItems: styles.alignItems,
            padding: styles.padding,
            gridTemplateColumns: styles.gridTemplateColumns,
            gap: styles.gap,
            backgroundColor: styles.backgroundColor,
            borderRadius: styles.borderRadius,
            minHeight: styles.minHeight,
            borderBottom: styles.borderBottom,
            backdropFilter: styles.backdropFilter as any,
          },
          className: 'relative',
        },
        element.children && element.children.length > 0 ? (
          element.children.map((child) => (
            <CanvasElement
              key={child.id}
              element={child}
              selected={useEditorStore.getState().selectedIds.has(child.id)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center text-neutral-400 text-sm py-4 border-2 border-dashed border-neutral-200 rounded-lg bg-neutral-50/50">
            Drop elements here
          </div>
        )
      )}

      {element.type === 'icon' && (
        <span 
          className="material-symbols-outlined"
          style={{
            fontSize: styles.fontSize || '24px',
            color: styles.color,
          }}
        >
          {element.props.content || 'star'}
        </span>
      )}

      {/* Selection indicator with delete button */}
      {/* Selection indicator with delete button */}
      {selected && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-primary-500 z-50">
          {/* Element label - Attached tab style */}
          <div className="absolute top-0 left-0 -translate-y-full flex items-center bg-primary-500 text-white text-xs px-2 h-6 rounded-t-md font-medium pointer-events-auto">
            <span className="capitalize">{element.type}</span>
          </div>
          
          {/* Delete button - Attached tab style on right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Delete this element?')) {
                useEditorStore.getState().deleteElement(element.id);
              }
            }}
            className="absolute top-0 right-0 -translate-y-full flex items-center justify-center bg-danger-500 hover:bg-danger-600 text-white w-6 h-6 rounded-t-md transition-colors pointer-events-auto"
            title="Delete element"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path 
                d="M3 3.5h8M5.5 3.5v-1a1 1 0 011-1h1a1 1 0 011 1v1m1.5 0v7a1 1 0 01-1 1h-5a1 1 0 01-1-1v-7" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
