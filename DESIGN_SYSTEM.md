# NoCode Builder — Design System Law

**Status**: Living Document  
**Purpose**: Maximize task efficiency, predictability, and scalability  
**Rule**: Aesthetic preference never overrides usability or system integrity

---

## I. Non-Negotiable UX Laws

### 1. Canvas Supremacy
The editing canvas is **always visible**. No feature may block, replace, or obscure it.

**Violations:**
- ❌ Modal overlays for upgrade/pricing
- ❌ Full-screen preview modes
- ❌ Blocking loading states

**Correct:**
- ✅ Side panel for upgrade options
- ✅ Split-screen preview
- ✅ Inline loading indicators

### 2. Context Over Global
Controls appear **only when relevant** to the current selection.

**Example:**
- No element selected → Show canvas instructions
- Heading selected → Show typography controls
- Container selected → Show layout controls

### 3. One Primary Action Per Context
Each UI state exposes a **single dominant action**.

**Current State:**
- Header: Publish is primary (largest, blue)
- Elements: Edit is primary
- Properties: Apply is implicit

### 4. Progressive Disclosure Only
Advanced functionality must be **opt-in**, not hidden.

**Example:**
- Basic styles visible by default
- Advanced (filters, transforms) behind "Advanced" toggle

### 5. Predictability Over Novelty
Established interaction patterns are **mandatory**.

**Patterns:**
- Click to select
- Drag to move
- Right-click for context menu
- Ctrl+Z for undo

---

## II. System Architecture

### 1. Primitives (Foundation)
Location: `/src/components/ui/`

- **Button** - All click actions
- **Input** - All text entry
- **Select** - All dropdowns
- **Modal** - DEPRECATED (violates Canvas Supremacy)
- **Panel** - Collapsible content areas
- **Spinner** - Loading states
- **Toast** - Non-blocking notifications

**Rules:**
- No business logic in primitives
- Fully themeable via design tokens
- Stable API (changes require migration path)

### 2. Composable Patterns (Core)
Location: `/src/components/editor/patterns/`

- **PropertyRow** - Label + Control pair
- **InspectorSection** - Collapsible group of properties
- **InlineEditor** - Edit-in-place for canvas text
- **ActionBar** - Contextual actions above selection
- **FloatingToolbar** - DEPRECATED (use ActionBar in zone)

**Pattern Template:**
```tsx
interface PatternContract {
  when: 'Appears when...',
  disappears: 'Disappears when...',
  canvasEffect: 'How it affects canvas',
  undo: 'Undo/redo behavior',
  keyboard: 'Keyboard shortcuts',
  error: 'Error state behavior',
  empty: 'Empty state behavior'
}
```

### 3. Product Modules (Disposable)
Location: `/src/modules/`

- SEO, CMS, Animations, AI, Integrations
- **Removable without affecting core system**
- **Must use existing patterns**
- **No custom visual language**

---

## III. Layout & Zone Model

```
┌─────────────────────────────────────────────────┐
│  TOP: Global Actions                            │
├──────────┬────────────────────────┬──────────────┤
│  LEFT:   │  CENTER:               │  RIGHT:      │
│  Nav/    │  Canvas                │  Inspector/  │
│  Struct  │  (Supremacy Zone)      │  Properties  │
│          │                        │              │
└──────────┴────────────────────────┴──────────────┘
```

### Zone Contracts

**LEFT (Structure)**
- Width: 320px (fixed)
- Content: Layers tree, Component library, Pages
- Collapsible: Yes
- Can be hidden: Yes (Ctrl+B)

**CENTER (Canvas)**
- Width: Flexible
- Content: Editable page preview
- Never hidden or obscured
- Device width: Responsive (1280px/768px/375px)

**RIGHT (Inspector)**
- Width: 384px (fixed)
- Content: Selected element properties
- Collapsible: Yes  
- Can be hidden: Yes (Ctrl+I)

**TOP (Actions)**
- Height: 64px (fixed)
- Content: Save, Device switcher, Publish
- Always visible
- Primary action: Publish

### Rules

1. **Zones do not multiply** - No 4th or 5th zone
2. **No floating panels** - All UI lives in zones
3. **Features fit zones** - Not beside them
4. **Modals forbidden** - Use side panels instead

---

## IV. Design Tokens (Purpose-Based)

File: `/src/app/globals.css`

### Current Tokens (Need Migration)

**Before (Appearance-based):**
```css
.clay-card { ... }
color: #3b82f6;
```

**After (Purpose-based):**
```css
/* Backgrounds */
--color-bg-canvas: #ffffff;
--color-bg-panel: #fafafa;
--color-bg-surface: #f5f5f5;

/* Actions */
--color-action-primary: #3b82f6;
--color-action-secondary: #ff6b6b;
--color-action-danger: #dc2626;

/* Text */
--color-text-primary: #171717;
--color-text-secondary: #737373;
--color-text-tertiary: #a3a3a3;

/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;

/* Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;

/* Elevation */
--elevation-1: 0 1px 3px rgba(0,0,0,0.1);
--elevation-2: 0 4px 6px rgba(0,0,0,0.1);
--elevation-3: 0 10px 15px rgba(0,0,0,0.1);
```

**Rules:**
- No hard-coded values in components
- Dark mode must be first-class
- Tokens describe intent, not appearance

---

## V. Interaction Contracts

### Example: PropertyRow

```typescript
const PropertyRowContract = {
  when: 'Element is selected',
  disappears: 'Element is deselected or deleted',
  canvasEffect: 'Updates element style in real-time',
  undo: 'Each change creates undo entry',
  keyboard: 'Tab to next control, Shift+Tab to previous',
  error: 'Shows inline validation message',
  empty: 'Shows placeholder text'
};
```

### Required Contracts

Every pattern must define:

1. **Appearance trigger** - When does it show?
2. **Disappearance trigger** - When does it hide?
3. **Canvas effect** - How does it change canvas?
4. **Undo/redo** - How does history work?
5. **Keyboard** - What shortcuts apply?
6. **Error state** - What happens on error?
7. **Empty state** - What shows when empty?

---

## VI. Feature Admission Rules

### Admission Checklist

Every new feature must answer:

1. **Which zone does it live in?**
2. **Which pattern does it use?**
3. **What complexity does it add?**
4. **Can it be removed safely?**

### Rejection Criteria

A feature is **REJECTED** if it:

- ❌ Requires a new UI zone
- ❌ Breaks existing interaction contracts
- ❌ Introduces unique styling
- ❌ Cannot be removed cleanly
- ❌ Adds complexity without improving core tasks

### Example: "AI Assistant"

**Proposed**: Floating AI chat bubble  
**Verdict**: ❌ REJECTED

**Reasons:**
1. Floating panel violates zone model
2. Introduces unique chat UI pattern
3. Could obscure canvas

**Alternative**: AI panel in LEFT zone (new tab)  
**Verdict**: ✅ APPROVED

**Reasons:**
1. Lives in existing LEFT zone
2. Uses existing Panel pattern
3. Collapsible, doesn't block canvas

---

## VII. Current Implementation Audit

### Violations Found

1. **Upgrade Modal** (`/dashboard/page.tsx`)
   - **Law**: Canvas Supremacy
   - **Fix**: Move to RIGHT zone panel

2. **Multiple header actions** (`EditorHeader.tsx`)
   - **Law**: One Primary Action
   - **Fix**: Publish is primary, others secondary

3. **Hard-coded colors** (Multiple files)
   - **Law**: Design Tokens
   - **Fix**: Migrate to CSS variables

4. **No pattern documentation**
   - **Law**: Documentation Enforcement
   - **Fix**: Create pattern library

### Migration Plan

**Phase 1: Token Migration**
- [ ] Define all design tokens in `globals.css`
- [ ] Replace hard-coded colors with tokens
- [ ] Replace hard-coded spacing with tokens
- [ ] Test dark mode

**Phase 2: Zone Compliance**
- [ ] Remove Upgrade Modal
- [ ] Create UpgradePanel in RIGHT zone
- [ ] Ensure all UI lives in fixed zones

**Phase 3: Pattern Documentation**
- [ ] Document PropertyRow contract
- [ ] Document InspectorSection contract
- [ ] Document ActionBar contract
- [ ] Create visual examples

**Phase 4: Interaction Contracts**
- [ ] Write contracts for all patterns
- [ ] Enforce in TypeScript types
- [ ] Add runtime validation

---

## VIII. Pattern Library (To Be Created)

Location: `/src/components/editor/patterns/`

### PropertyRow
**Purpose**: Label + Control pair for property editing  
**Zone**: RIGHT (Inspector)  
**When**: Element selected  
**Contract**: [See Interaction Contracts]

### InspectorSection
**Purpose**: Collapsible group of properties  
**Zone**: RIGHT (Inspector)  
**When**: Element selected  
**Contract**: [See Interaction Contracts]

### ActionBar
**Purpose**: Contextual actions for selection  
**Zone**: CENTER (above canvas element)  
**When**: Element selected  
**Contract**: [See Interaction Contracts]

---

## Final Rule

> **Features are guests. The system is the landlord.**  
> Anything that weakens the system is rejected — regardless of speed, pressure, or aesthetics.

---

## Enforcement

1. **Code Reviews** must reference this document
2. **PR checklist** includes zone/pattern questions
3. **Design reviews** check token usage
4. **No exceptions** without documented rationale

---

**Last Updated**: 2025-12-19  
**Next Review**: When proposing new features
