# NoCode Website Builder

A complete no-code website builder with visual drag-and-drop editor, built with Next.js 14+, TailwindCSS, and Turborepo monorepo architecture.

## 🎨 Design

- **Style**: Flat Professional & Minimalist
- **Color Palette**: Modern, high-contrast, professional look
  - Primary Purple: `#6C5CE7`
  - Backgrounds: Clean White (`#FFFFFF`) & Soft Grays (`#FAFAFA`, `#F7F7F7`)
  - Text: Dark Stark (`#0A0A0A`) & Muted Secondary (`#6B7280`)
- **Features**: Crisp borders, subtle shadows, focus on content hierarchy

## 🚀 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design tokens
- **State Management**: Zustand with immer middleware
- **Validation**: Zod schemas
- **Drag & Drop**: React DND
- **Animations**: Framer Motion
- **Icons**: SVG & Unicode

## 📦 Project Structure

```
no-code-builder/
├── apps/
│   └── web/                # Next.js frontend application
│       ├── src/
│       │   ├── app/        # Next.js app router pages
│       │   ├── components/ # React components
│       │   ├── lib/        # Utilities, types, API client
│       │   └── store/      # Zustand stores
│       └── package.json
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 9+

### Installation

```bash
# Install dependencies
cd /Applications/XAMPP/xamppfiles/htdocs/no-code-builder
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cd apps/web
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📱 Features Implemented

### ✅ Core Infrastructure
- [x] Turborepo monorepo setup
- [x] Next.js 14+ with TypeScript
- [x] TailwindCSS with Flat Design tokens
- [x] Zustand stores (auth, projects, editor)
- [x] Comprehensive Type definitions and Zod validation
- [x] In-memory data storage (simulated backend)

### ✅ Authentication & Dashboard
- [x] Register & Login pages with validation
- [x] Protected routes & Cookie-based auth
- [x] Onboarding flow with templates
- [x] Dashboard with project management (Create/Delete)
- [x] Subscription plan enforcement & Upgrade modal

### ✅ Visual Editor
- [x] **Drag & Drop Canvas**: Free-flow editing experience
- [x] **Responsive Controls**: Switch between Desktop (1024px), Tablet (640px), and Mobile (360px)
- [x] **Component Library**: Categorized elements (Basic, Layout, Media, Interactive)
- [x] **Properties Panel**: Edit styles, content, and layout properties
- [x] **Layers & Navigation**: Tree view of page structure
- [x] **History**: Undo/Redo functionality
- [x] **Zoom Controls**: Zoom in/out of the canvas

### ✅ Publishing & Export
- [x] **Publish**: Live preview of the built page
- [x] **Export**: Generate clean HTML/CSS code
- [x] **Auto-save**: Changes saved automatically

## 🎯 User Flow

1. **Landing** (`/`) → Check auth → Redirect to `/dashboard` if logged in
2. **Register** (`/register`) → Create account → Redirect to `/onboarding`
3. **Onboarding** (`/onboarding`) → Choose template → Create project → Redirect to `/editor/{id}`
4. **Dashboard** (`/dashboard`) → View/create/delete projects
5. **Editor** (`/editor/{id}`) → Build your website visually
6. **Publish/Export** → Share your creation

## 🎨 Design System

### Design Tokens
- **Primary**: `bg-primary-600` (Purple)
- **Surface**: `bg-white` / `bg-neutral-50`
- **Borders**: `border-neutral-200` (Subtle gray)
- **Radius**: `rounded-md` (6px default)

### Responsive Breakpoints
- **Mobile**: 360px
- **Tablet**: 640px
- **Desktop**: 1024px

## 📝 API Structure (Internal/Mock)

The application uses Next.js Route Handlers to simulate a backend:

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id      # Auto-save
POST   /api/projects/:id/publish
POST   /api/projects/:id/export
```

## 🔧 Development Commands

```bash
# Run dev server
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint

# Check types
pnpm type-check
```

## 📄 License

MIT