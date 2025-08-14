# Technology Stack

## Framework & Runtime
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript 5** - Type-safe JavaScript
- **Node.js** - Runtime environment

## Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Radix UI** - Headless UI components for accessibility
- **Lucide React** - Icon library
- **next-themes** - Dark/light theme support

## Data & State Management
- **Supabase** - Backend as a Service (database, real-time subscriptions)
- **React Hook Form** - Form handling with Zod validation
- **Zod** - Schema validation

## Charts & Visualization
- **Recharts** - Chart library for data visualization

## Development Tools
- **pnpm** - Package manager
- **ESLint** - Code linting (build errors ignored in config)
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Build Configuration
- **TypeScript errors ignored during build** for rapid development
- **ESLint errors ignored during build** for deployment flexibility
- **Unoptimized images** enabled for faster builds

## Common Commands

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Package management
pnpm install      # Install dependencies
pnpm add <pkg>    # Add new dependency
```

## Path Aliases
- `@/*` maps to project root for clean imports
- Components: `@/components`
- Utils: `@/lib/utils`
- UI Components: `@/components/ui`
- Hooks: `@/hooks`
- Types: `@/types`