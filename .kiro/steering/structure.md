# Project Structure

## Root Directory
```
├── app/                    # Next.js App Router pages
├── components/             # React components
├── docs/                   # Documentation and guides
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
├── public/                 # Static assets
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
└── .kiro/                  # Kiro AI assistant configuration
```

## App Directory (`app/`)
- **App Router structure** with layout.tsx, page.tsx, loading.tsx
- **globals.css** - Global styles and CSS variables
- Main dashboard entry point at `page.tsx`

## Components (`components/`)
- **dashboard/** - Dashboard-specific components organized by feature
- **ui/** - Reusable UI components (shadcn/ui)
- **theme-provider.tsx** - Theme context provider

## Documentation (`docs/`)
- **Webhook integration guides** - JSON files with API specifications
- **Deploy checklist** - Deployment configuration and TV setup
- All docs use JSON format for structured data

## Library (`lib/`)
- **mockData.ts** - Fallback data for development and error states
- **supabaseClient.ts** - Database client configuration
- **webhookIntegration.ts** - External API integration logic
- **utils.ts** - Utility functions (cn, etc.)
- **supportDataProcessor.ts** - Data transformation logic for support dashboard
- **Domain-specific mock data** - tpvMockData.ts

## Types (`types/`)
- **dashboard.ts** - Core dashboard and sales data types
- **support.ts** - Customer support related types
- **tpv.ts** - Payment processing types
- All interfaces use PascalCase naming

## Hooks (`hooks/`)
- **use-mobile.tsx** - Mobile detection hook
- **use-toast.ts** - Toast notification hook

## Naming Conventions
- **Components**: PascalCase (e.g., `DashboardHeader`)
- **Files**: kebab-case for components, camelCase for utilities
- **Types/Interfaces**: PascalCase with descriptive names
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## TV Mode Architecture
- URL parameters control display modes (`?tv=true&view=left`)
- **Rotation system** for cycling between department views
- **Responsive layouts** optimized for large displays
- **Real-time updates** with configurable refresh intervals

## Data Flow
1. **Webhook integration** for live data
2. **Supabase real-time subscriptions** for sales rankings
3. **Mock data fallback** when external services fail
4. **Component-level state management** with React hooks