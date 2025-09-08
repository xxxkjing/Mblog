# Source Code Structure

This document outlines the refactored codebase structure for better organization and maintainability.

## Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (TagFilter, etc.)
│   └── WorkCarousel/    # Specific components
├── features/            # Feature-based organization
│   ├── blog/           # Blog-related functionality
│   │   └── components/ # Blog-specific components (PostList, FeedHeader)
│   ├── portfolio/      # Portfolio/work functionality
│   │   └── components/ # Portfolio components (WorkCarousel)
│   └── profile/        # Profile-related functionality
│       └── components/ # Profile components (ContactCard, ProfileCard)
├── shared/             # Shared across features
│   ├── components/     # Shared UI components (SearchInput, Footer)
│   ├── hooks/         # Shared custom hooks
│   └── utils/         # Shared utility functions
├── layouts/           # Page layout wrappers
├── pages/            # Next.js pages
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── styles/          # Design system and global styles
├── apis/           # API integration (Notion)
├── libs/           # Third-party integrations and utilities
└── constants/      # Application constants
```

## Import Aliases

The following TypeScript path aliases are configured for cleaner imports:

- `@/components/*` → `src/components/*`
- `@/features/*` → `src/features/*`
- `@/shared/*` → `src/shared/*`
- `@/layouts/*` → `src/layouts/*`
- `@/hooks/*` → `src/hooks/*`
- `@/types/*` → `src/types/*`
- `@/styles/*` → `src/styles/*`
- `@/apis/*` → `src/apis/*`

## Component Organization

### Feature-Based Components
Components are now organized by feature domain:

- **Blog Feature** (`@/features/blog/components/`):
  - `PostList/` - Blog post listing and filtering
  - `FeedHeader/` - Blog feed header with controls

- **Profile Feature** (`@/features/profile/components/`):
  - `ContactCard` - Social media links and contact info
  - `ProfileCard` - Profile information display
  - `MobileProfileCard` - Mobile-optimized profile card

- **Portfolio Feature** (`@/features/portfolio/components/`):
  - `WorkCarousel` - Project showcase carousel (formerly MyComponent)

### Shared Components
Common components used across multiple features (`@/shared/components/`):

- `SearchInput` - Reusable search input component
- `Footer` - Site footer component

### Reusable Components
Generic UI components (`@/components/`):

- `common/TagFilter/` - Consolidated tag filtering component
- `WorkCarousel/` - Portfolio project carousel

## Key Improvements

1. **Clear Separation of Concerns**: Components are grouped by feature domain
2. **Reduced Duplication**: Consolidated multiple tag filter implementations
3. **Better Naming**: Renamed generic components (MyComponent → WorkCarousel)
4. **Cleaner Imports**: TypeScript path aliases for better developer experience
5. **Logical Grouping**: Related functionality is co-located

## Migration Notes

- Old `MyComponent.tsx` → `@/components/WorkCarousel/index.tsx`
- Feed components moved to appropriate feature folders
- Duplicate tag filtering logic consolidated into `@/components/common/TagFilter/`
- Import paths updated to use aliases where possible

## Usage Examples

```tsx
// Old import style
import ContactCard from "src/routes/Feed/ContactCard"

// New import style
import ContactCard from "@/features/profile/components/ContactCard"

// Shared components
import SearchInput from "@/shared/components/SearchInput"

// Common components
import TagFilter from "@/components/common/TagFilter"
```