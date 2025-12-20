'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/store/editor-store';
import type { PageElement } from '@/lib/types';
import { cn } from '@/lib/utils';

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
    <div className="space-y-0">
      {/* 1. Design Section */}
      <CollapsibleSection title="Design" defaultOpen>
        <div className="space-y-4 px-1 py-2">
            
          {/* Typography */}
          {(element.type === 'heading' || element.type === 'text' || element.type === 'button') && (
             <div className="space-y-3">
               <h5 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Typography</h5>
               <StyleInput label="Font Size" value={currentStyles.fontSize || '16px'} onChange={(v) => handleStyleChange('fontSize', v)} type="text" placeholder="16px" />
               <StyleInput label="Weight" value={currentStyles.fontWeight || '400'} onChange={(v) => handleStyleChange('fontWeight', v)} type="select" 
                    options={[{ value: '300', label: 'Light' },{ value: '400', label: 'Normal' },{ value: '600', label: 'Semibold' },{ value: '700', label: 'Bold' }]} />
               <StyleInput label="Color" value={currentStyles.color || '#000000'} onChange={(v) => handleStyleChange('color', v)} type="color" />
               <StyleInput label="Line Height" value={currentStyles.lineHeight || '1.5'} onChange={(v) => handleStyleChange('lineHeight', v)} type="text" placeholder="1.5" />
             </div>
          )}

          {/* Size */}
          <div className="space-y-2 mt-4">
             <h5 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Size</h5>
             <div className="grid grid-cols-2 gap-2">
                <SizeInput label="W" value={currentStyles.width?.replace('px', '').replace('%', '') || 'auto'} unit={currentStyles.width?.includes('%') ? '%' : 'px'} onChange={(v) => handleStyleChange('width', v)} />
                <SizeInput label="H" value={currentStyles.height?.replace('px', '').replace('vh', '') || 'auto'} unit={currentStyles.height?.includes('vh') ? 'vh' : 'px'} onChange={(v) => handleStyleChange('height', v)} />
             </div>
          </div>

          {/* Spacing */}
           <div className="space-y-2 mt-4">
             <h5 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Spacing</h5>
             <div className="grid grid-cols-2 gap-2">
                 <StyleInput label="Padding" value={currentStyles.padding || '0'} onChange={(v) => handleStyleChange('padding', v)} type="text" placeholder="0px" />
                 <StyleInput label="Margin" value={currentStyles.margin || '0'} onChange={(v) => handleStyleChange('margin', v)} type="text" placeholder="0px" />
             </div>
          </div>

          {/* Fill / Background */}
          <div className="space-y-2 mt-4">
             <h5 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Fill</h5>
             <StyleInput label="Background" value={currentStyles.backgroundColor || 'transparent'} onChange={(v) => handleStyleChange('backgroundColor', v)} type="color" />
          </div>

          {/* Borders */}
          <div className="space-y-2 mt-4">
               <h5 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Border</h5>
               <div className="grid grid-cols-2 gap-2">
                   <StyleInput label="Radius" value={currentStyles.borderRadius || '0'} onChange={(v) => handleStyleChange('borderRadius', v)} type="text" placeholder="0px" />
                   <StyleInput label="Width" value={currentStyles.border || 'none'} onChange={(v) => handleStyleChange('border', v)} type="text" placeholder="1px solid" />
               </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Layout Section */}
      <CollapsibleSection title="Layout">
        <div className="space-y-4 px-1 py-2">
            <StyleInput label="Display" value={currentStyles.display || 'block'} onChange={(v) => handleStyleChange('display', v)} type="select" options={[{ value: 'block', label: 'Block' },{ value: 'flex', label: 'Flex' },{ value: 'grid', label: 'Grid' },{ value: 'inline-block', label: 'Inline Block' }]} />
            
            {currentStyles.display === 'flex' && (
                <>
                <StyleInput label="Direction" value={currentStyles.flexDirection || 'row'} onChange={(v) => handleStyleChange('flexDirection', v)} type="select" options={[{ value: 'row', label: 'Row' },{ value: 'column', label: 'Column' }]} />
                <StyleInput label="Justify" value={currentStyles.justifyContent || 'flex-start'} onChange={(v) => handleStyleChange('justifyContent', v)} type="select" options={[{ value: 'flex-start', label: 'Start' },{ value: 'center', label: 'Center' },{ value: 'flex-end', label: 'End' },{ value: 'space-between', label: 'Space Between' }]} />
                <StyleInput label="Align" value={currentStyles.alignItems || 'stretch'} onChange={(v) => handleStyleChange('alignItems', v)} type="select" options={[{ value: 'stretch', label: 'Stretch' },{ value: 'flex-start', label: 'Start' },{ value: 'center', label: 'Center' },{ value: 'flex-end', label: 'End' }]} />
                <StyleInput label="Gap" value={currentStyles.gap || '0'} onChange={(v) => handleStyleChange('gap', v)} type="text" placeholder="0px" />
                </>
            )}

            {currentStyles.display === 'grid' && (
                 <StyleInput label="Columns" value={currentStyles.gridTemplateColumns || '1fr'} onChange={(v) => handleStyleChange('gridTemplateColumns', v)} type="text" placeholder="1fr 1fr" />
            )}
        </div>
      </CollapsibleSection>

      {/* 3. Position Section */}
      <CollapsibleSection title="Position">
         <div className="space-y-4 px-1 py-2">
            <StyleInput label="Type" value={currentStyles.position || 'static'} onChange={(v) => handleStyleChange('position', v)} type="select" options={[{ value: 'static', label: 'Static' },{ value: 'relative', label: 'Relative' },{ value: 'absolute', label: 'Absolute' },{ value: 'fixed', label: 'Fixed' }]} />
            
            {currentStyles.position !== 'static' && (
                <div className="grid grid-cols-2 gap-2">
                    <StyleInput label="Top" value={currentStyles.top || 'auto'} onChange={(v) => handleStyleChange('top', v)} type="text" placeholder="auto" />
                    <StyleInput label="Right" value={currentStyles.right || 'auto'} onChange={(v) => handleStyleChange('right', v)} type="text" placeholder="auto" />
                    <StyleInput label="Bottom" value={currentStyles.bottom || 'auto'} onChange={(v) => handleStyleChange('bottom', v)} type="text" placeholder="auto" />
                    <StyleInput label="Left" value={currentStyles.left || 'auto'} onChange={(v) => handleStyleChange('left', v)} type="text" placeholder="auto" />
                    <StyleInput label="Z-Index" value={currentStyles.zIndex || 'auto'} onChange={(v) => handleStyleChange('zIndex', v)} type="text" placeholder="auto" />
                </div>
            )}
         </div>
      </CollapsibleSection>

      {/* 4. Adjust Section */}
      <CollapsibleSection title="Adjust">
         <div className="space-y-4 px-1 py-2">
            <StyleInput label="Opacity" value={currentStyles.opacity || '1'} onChange={(v) => handleStyleChange('opacity', v)} type="text" placeholder="0.0 - 1.0" />
            <StyleInput label="Overflow" value={currentStyles.overflow || 'visible'} onChange={(v) => handleStyleChange('overflow', v)} type="select" options={[{ value: 'visible', label: 'Visible' },{ value: 'hidden', label: 'Hidden' },{ value: 'scroll', label: 'Scroll' },{ value: 'auto', label: 'Auto' }]} />
         </div>
      </CollapsibleSection>

       {/* 5. Cursor Section */}
      <CollapsibleSection title="Cursor">
          <div className="px-1 py-2">
            <StyleInput label="Type" value={currentStyles.cursor || 'auto'} onChange={(v) => handleStyleChange('cursor', v)} type="select" options={[{ value: 'auto', label: 'Auto' },{ value: 'pointer', label: 'Pointer' },{ value: 'default', label: 'Default' },{ value: 'text', label: 'Text' },{ value: 'not-allowed', label: 'Not Allowed' }]} />
          </div>
      </CollapsibleSection>

      {/* 6. Anchor Section */}
      <CollapsibleSection title="Anchor">
          <div className="px-1 py-2 text-xs text-neutral-500">
             To set the ID or Link properties, please use the <strong>Settings</strong> tab.
          </div>
      </CollapsibleSection>

    </div>
  );
};

// --- Subcomponents ---

const CollapsibleSection = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 px-4 bg-neutral-50 hover:bg-neutral-100 transition-colors group"
      >
        <span className="text-sm font-bold text-neutral-800">{title}</span>
        <span className={cn("material-symbols-outlined text-sm text-neutral-500 transition-transform", isOpen ? "rotate-0" : "-rotate-90")}>
          arrow_drop_down
        </span>
      </button>
      {isOpen && (
        <div className="p-3 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

const SizeInput = ({ label, value, unit, onChange }: { label: string, value: string, unit: string, onChange?: (val: string) => void }) => (
  <div className="flex items-center border border-neutral-200 rounded-md px-2 py-1.5 bg-white focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
    <span className="text-xs text-neutral-400 w-4 font-medium mr-1 uppercase">{label}</span>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange && onChange(e.target.value + unit)}
      className="w-full text-sm outline-none bg-transparent font-medium text-neutral-700 text-right" 
    />
    <span className="text-xs text-neutral-400 ml-1 select-none">{unit}</span>
  </div>
);

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
          className="w-full px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
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
            className="flex-1 px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      )}
      
      {type === 'select' && options && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
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

