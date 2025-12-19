export type PlanType = 'free' | 'pro' | 'enterprise';
export type DeviceType = 'desktop' | 'tablet' | 'mobile';
export type ElementType = 'heading' | 'text' | 'image' | 'button' | 'container' | 'grid' | 'spacer' | 'separator' | 'input' | 'form' | 'video' | 'gallery' | 'slider' | 'html' | 'icon' | 'map';
export type SaveStatus = 'saved' | 'saving' | 'error';

/**
 * User type
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  plan: PlanType;
  createdAt: string;
  tokenVersion?: number;
}

/**
 * Project type
 */
export interface Project {
  id: string;
  userId: string;
  name: string;
  slug: string;
  status: 'draft' | 'published';
  draftStructure: PageElement[];
  publishedStructure?: PageElement[];
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

/**
 * Page element styles
 */
export interface ElementStyles {
  // Layout
  display?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  width?: string;
  height?: string;
  
  // Flexbox
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  
  // Spacing
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  
  // Typography
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: string;
  color?: string;
  
  // Background
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  
  // Border
  border?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
  
  // Effects
  boxShadow?: string;
  opacity?: string;
  transform?: string;
  filter?: string;
  
  // Other
  cursor?: string;
  overflow?: string;
  zIndex?: string;
}

/**
 * Responsive styles
 */
export interface ResponsiveStyles {
  desktop?: ElementStyles;
  tablet?: ElementStyles;
  mobile?: ElementStyles;
}

/**
 * Element properties (type-specific)
 */
export interface ElementProps {
  content?: string;
  src?: string;
  alt?: string;
  href?: string;
  target?: string;
  level?: number;
  [key: string]: any;
}

/**
 * Page element (recursive structure)
 */
export interface PageElement {
  id: string;
  type: ElementType;
  props: ElementProps;
  styles: ResponsiveStyles;
  children?: PageElement[];
  parentId?: string | null;
  order?: number;
}

/**
 * Editor history
 */
export interface EditorHistory {
  past: PageElement[][];
  present: PageElement[];
  future: PageElement[][];
}

/**
 * API Error
 */
export interface ApiErrorResponse {
  message: string;
  code?: string;
  status: number;
}

/**
 * Template type
 */
export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  structure: PageElement[];
  category: string;
}
