'use client';

import React from 'react';
import { useEditorStore } from '@/store/editor-store';
import type { PageElement } from '@/lib/types';

interface StylePanelProps {
  element: PageElement;
}

export const StylePanel: React.FC<StylePanelProps> = ({ element }) => {
  const { updateElement, device } = useEditorStore();

  const currentStyles = element.styles[device] || element.styles.desktop || {};

  const handleStyleChange = (key: string, value: string) => {
    updateElement(element.id, {
      styles: {
        ...element.styles,
        [device]: {
          ...currentStyles,
          [key]: value,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Typography Section */}
      {(element.type === 'heading' || element.type === 'text' || element.type === 'button') && (
        <Section title="Typography">
          <StyleInput
            label="Font Size"
            value={currentStyles.fontSize || '16px'}
            onChange={(v) => handleStyleChange('fontSize', v)}
            type="text"
            placeholder="16px"
          />
          
          <StyleInput
            label="Font Weight"
            value={currentStyles.fontWeight || '400'}
            onChange={(v) => handleStyleChange('fontWeight', v)}
            type="select"
            options={[
              { value: '300', label: 'Light' },
              { value: '400', label: 'Normal' },
              { value: '600', label: 'Semibold' },
              { value: '700', label: 'Bold' },
            ]}
          />
          
          <StyleInput
            label="Color"
            value={currentStyles.color || '#000000'}
            onChange={(v) => handleStyleChange('color', v)}
            type="color"
          />
          
          <StyleInput
            label="Line Height"
            value={currentStyles.lineHeight || '1.5'}
            onChange={(v) => handleStyleChange('lineHeight', v)}
            type="text"
            placeholder="1.5"
          />
        </Section>
      )}

      {/* Spacing Section */}
      <Section title="Spacing">
        <StyleInput
          label="Padding"
          value={currentStyles.padding || '16px'}
          onChange={(v) => handleStyleChange('padding', v)}
          type="text"
          placeholder="16px"
        />
        <StyleInput
          label="Margin"
          value={currentStyles.margin || '0'}
          onChange={(v) => handleStyleChange('margin', v)}
          type="text"
          placeholder="0"
        />
      </Section>

      {/* Size Section */}
      {element.type === 'image' && (
        <Section title="Size">
          <StyleInput
            label="Width"
            value={currentStyles.width || 'auto'}
            onChange={(v) => handleStyleChange('width', v)}
            type="text"
            placeholder="auto"
          />
          <StyleInput
            label="Height"
            value={currentStyles.height || 'auto'}
            onChange={(v) => handleStyleChange('height', v)}
            type="text"
            placeholder="auto"
          />
        </Section>
      )}

      {/* Background Section */}
      {(element.type === 'container' || element.type === 'grid' || element.type === 'button') && (
        <Section title="Background">
          <StyleInput
            label="Background Color"
            value={currentStyles.backgroundColor || 'transparent'}
            onChange={(v) => handleStyleChange('backgroundColor', v)}
            type="color"
          />
        </Section>
      )}

      {/* Border Section */}
      <Section title="Border">
        <StyleInput
          label="Border Radius"
          value={currentStyles.borderRadius || '0px'}
          onChange={(v) => handleStyleChange('borderRadius', v)}
          type="text"
          placeholder="0px"
        />
        <StyleInput
          label="Border"
          value={currentStyles.border || 'none'}
          onChange={(v) => handleStyleChange('border', v)}
          type="text"
          placeholder="1px solid #000"
        />
      </Section>

      {/* Layout Section for Containers */}
      {(element.type === 'container' || element.type === 'grid') && (
        <Section title="Layout">
          <StyleInput
            label="Display"
            value={currentStyles.display || 'flex'}
            onChange={(v) => handleStyleChange('display', v)}
            type="select"
            options={[
              { value: 'flex', label: 'Flex' },
              { value: 'grid', label: 'Grid' },
              { value: 'block', label: 'Block' },
            ]}
          />
          
          {currentStyles.display === 'flex' && (
            <StyleInput
              label="Flex Direction"
              value={currentStyles.flexDirection || 'column'}
              onChange={(v) => handleStyleChange('flexDirection', v)}
              type="select"
              options={[
                { value: 'row', label: 'Row' },
                { value: 'column', label: 'Column' },
              ]}
            />
          )}
          
          {currentStyles.display === 'grid' && (
            <StyleInput
              label="Grid Columns"
              value={currentStyles.gridTemplateColumns || '1fr'}
              onChange={(v) => handleStyleChange('gridTemplateColumns', v)}
              type="text"
              placeholder="1fr 1fr"
            />
          )}
          
          <StyleInput
            label="Gap"
            value={currentStyles.gap || '16px'}
            onChange={(v) => handleStyleChange('gap', v)}
            type="text"
            placeholder="16px"
          />
        </Section>
      )}
    </div>
  );
};

// Section Component
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="border-b border-neutral-200 pb-4">
      <h4 className="text-sm font-semibold text-neutral-900 mb-3">{title}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
};

// Style Input Component
interface StyleInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: 'text' | 'color' | 'select';
  placeholder?: string;
  options?: { value: string; label: string }[];
}

const StyleInput: React.FC<StyleInputProps> = ({
  label,
  value,
  onChange,
  type,
  placeholder,
  options,
}) => {
  return (
    <div>
      <label className="block text-xs font-medium text-neutral-700 mb-1">{label}</label>
      
      {type === 'text' && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      )}
      
      {type === 'color' && (
        <div className="flex space-x-2">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-16 rounded-lg border border-neutral-300 cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      )}
      
      {type === 'select' && options && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
