'use client';

import React from 'react';
import { useDrag } from 'react-dnd';
import { generateId } from '@/lib/utils';
import type { ElementType, PageElement } from '@/lib/types';

// Element library matching reference image
const elementCategories = [
  {
    title: 'Basic Elements',
    elements: [
      { type: 'heading' as ElementType, icon: '📝', label: 'Headline' },
      { type: 'text' as ElementType, icon: '📄', label: 'Text' },
      { type: 'image' as ElementType, icon: '🖼️', label: 'Image' },
      { type: 'container' as ElementType, icon: '📦', label: 'Container' },
    ],
  },
  {
    title: 'Layout',
    elements: [
      { type: 'spacer' as ElementType, icon: '↔️', label: 'Spacer' },
      { type: 'separator' as ElementType, icon: '➖', label: 'Separator' },
      { type: 'grid' as ElementType, icon: '▦', label: 'Grid' },
    ],
  },
  {
    title: 'Interactive',
    elements: [
      { type: 'button' as ElementType, icon: '🔘', label: 'Button' },
      { type: 'input' as ElementType, icon: '📝', label: 'Input' },
      { type: 'form' as ElementType, icon: '📋', label: 'Form' },
    ],
  },
  {
    title: 'Media',
    elements: [
      { type: 'video' as ElementType, icon: '🎥', label: 'Video' },
      { type: 'gallery' as ElementType, icon: '🖼️', label: 'Gallery' },
      { type: 'slider' as ElementType, icon: '🎞️', label: 'Slider' },
    ],
  },
  {
    title: 'Advanced',
    elements: [
      { type: 'html' as ElementType, icon: '</>',  label: 'HTML' },
      { type: 'icon' as ElementType, icon: '⭐', label: 'Icon' },
      { type: 'map' as ElementType, icon: '🗺️', label: 'Map' },
    ],
  },
];

interface DraggableElementProps {
  type: ElementType;
  icon: string;
  label: string;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ type, icon, label }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'COMPONENT',
    item: () => {
      const newElement: PageElement = {
        id: generateId(),
        type,
        props: getDefaultProps(type),
        styles: {
          desktop: getDefaultStyles(type),
        },
      };
      return newElement;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [type]);

  return (
    <div
      ref={dragRef}
      className={`flex flex-col items-center justify-center p-3 bg-white border border-neutral-200 rounded-md cursor-grab active:cursor-grabbing hover:border-primary-600 hover:bg-primary-50 transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <span className="text-xs text-neutral-700 font-medium">{label}</span>
    </div>
  );
};

export const ComponentLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-neutral-900">Add content</h2>
          <button className="text-neutral-500 hover:text-neutral-900">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-1.5 pl-8 text-sm bg-neutral-50 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
          />
          <svg 
            className="absolute left-2.5 top-2 text-neutral-400" 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none"
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-1 bg-neutral-100 rounded-md p-0.5">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Elements */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {elementCategories.map((category) => {
          const filtered = category.elements.filter((el) =>
            el.label.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filtered.length === 0) return null;

          return (
            <div key={category.title}>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-3">
                {category.title}
              </h3>
              <div className={`grid gap-2 ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}>
                {filtered.map((element) => (
                  <DraggableElement key={element.type} {...element} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper functions for default props and styles
function getDefaultProps(type: ElementType) {
  switch (type) {
    case 'heading':
      return { content: 'Heading Text', level: 1 };
    case 'text':
      return { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' };
    case 'image':
      return { src: 'https://via.placeholder.com/400x300', alt: 'Placeholder image' };
    case 'button':
      return { content: 'Click Me', href: '#' };
    case 'container':
    case 'grid':
    case 'spacer':
    case 'separator':
    default:
      return {};
  }
}

function getDefaultStyles(type: ElementType) {
  const baseStyles = {
    margin: '0',
    padding: '16px',
  };

  switch (type) {
    case 'heading':
      return {
        ...baseStyles,
        fontSize: '32px',
        fontWeight: '700',
        color: '#0a0a0a',
        lineHeight: '1.2',
        width: '100%',
      };
    case 'text':
      return {
        ...baseStyles,
        fontSize: '14px',
        color: '#404040',
        lineHeight: '1.6',
        width: '100%',
      };
    case 'image':
      return {
        ...baseStyles,
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
      };
    case 'button':
      return {
        padding: '10px 20px',
        backgroundColor: '#6C5CE7',
        color: '#ffffff',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        border: 'none',
        display: 'inline-block',
      };
    case 'container':
      return {
        ...baseStyles,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        minHeight: '200px',
        width: '100%',
      };
    case 'spacer':
      return {
        height: '40px',
        margin: '0',
        padding: '0',
        width: '100%',
      };
    case 'separator':
      return {
        height: '1px',
        backgroundColor: '#e5e5e5',
        margin: '20px 0',
        padding: '0',
        width: '100%',
      };
    case 'grid':
      return {
        ...baseStyles,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        minHeight: '200px',
        width: '100%',
      };
    default:
      return baseStyles;
  }
}
