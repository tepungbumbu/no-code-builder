# NoCode Website Builder

A complete no-code website builder with visual drag-and-drop editor, built with Next.js 14+, TailwindCSS, and Turborepo monorepo architecture.

## 🎨 Design

- **Style**: Semantic minimalism with claymorphism effects
- **Color Palette**: Extracted from detikcom logo
  - Primary Blue: `#1e3a8a` / `#3b82f6`
  - Secondary Coral: `#ff6b6b` / `#f87171`
- **Features**: Soft shadows, rounded corners, subtle gradients

## 🚀 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design tokens
- **State Management**: Zustand with immer middleware
- **Validation**: Zod schemas
- **UI Components**: Radix UI primitives
- **Drag & Drop**: React DND
- **Animations**: Framer Motion

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
├── packages/
│   ├── ui/                 # Shared UI components (future)
│   ├── config/             # Shared configs (future)
│   └── types/              # Shared types (future)
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
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📱 Features Implemented

### ✅ Phase 1-3: Infrastructure
- [x] Turborepo monorepo setup
- [x] Next.js 14+ with TypeScript
- [x] TailwindCSS with claymorphism tokens
- [x] Zustand stores (auth, projects, editor)
- [x] UI component library (Button, Input, Modal, Toast, Spinner, Skeleton)
- [x] API client with error handling
- [x] Type definitions and Zod validation

### ✅ Phase 4: Authentication
- [x] Landing page with hero, features, pricing
- [x] Register page with validation
- [x] Login page
- [x] Protected routes
- [x] Cookie-based authentication
- [x] Onboarding with templates

### ✅ Phase 5: Dashboard
- [x] Dashboard with stats
- [x] Projects grid
- [x] Create/delete projects
- [x] Plan limit enforcement
- [x] Upgrade modal

### 🚧 Phase 6-11: Editor (In Progress)
- [ ] Visual drag & drop editor
- [ ] Properties panel
- [ ] Component library
- [ ] Responsive design tools
- [ ] Publish functionality
- [ ] Export to HTML/CSS

## 🎯 User Flow

1. **Landing** (`/`) → Check auth → Redirect to `/dashboard` if logged in
2. **Register** (`/register`) → Create account → Redirect to `/onboarding`
3. **Onboarding** (`/onboarding`) → Choose template → Create project → Redirect to `/editor/{id}`
4. **Dashboard** (`/dashboard`) → View/create/delete projects
5. **Editor** (`/editor/{id}`) → Visual editing (coming soon)

## 🎨 Claymorphism Design System

### Shadows
- `shadow-clay-sm`: Small clay effect
- `shadow-clay`: Medium clay effect
- `shadow-clay-lg`: Large clay effect
- `shadow-clay-inset`: Inset clay effect

### Utility Classes
- `.clay-card`: Card with clay effect
- `.clay-button`: Button with clay effect
- `.clay-input`: Input with clay effect

## 📝 API Structure (Mock)

The frontend is ready for backend integration. Expected endpoints:

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
POST   /api/projects/:id/save
DELETE /api/projects/:id
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

# Type check
pnpm type-check

# Clean all
pnpm clean
```

## 📦 Next Steps

1. Build the visual editor with drag & drop
2. Implement properties panel for styling
3. Add component library
4. Create responsive design tools
5. Add publish functionality
6. Implement export to HTML/CSS
7. Add backend API (optional: mock server included)

## 🤝 Contributing

This is a demonstration project. For production use:
- Add comprehensive testing
- Implement actual backend API
- Add real authentication with JWT
- Set up deployment pipeline
- Add error tracking (Sentry)
- Implement analytics

## 📄 License

MIT