# Directory Structure

## Key Locations
- `src/app/`: Next.js App Router routes and global styles.
- `src/components/`: Shared UI components (Hero, Navbar, Loader).
- `src/section/`: Large-scale page sections.
- `src/hooks/`: Custom React hooks (empty or minimal).
- `public/`: Static assets (images, icons).

## Naming Conventions
- **Components/Sections**: PascalCase (e.g., `Hero.js`, `Projects.js`).
- **Files**: Mostly PascalCase or lowercase for Next.js internal files (`page.js`, `layout.js`).

## Organization Pattern
- **Sectional Design**: Each major part of the one-page portfolio has its own file in `src/section/`.
- **Client Components**: Located alongside server components, explicitly marked with `'use client'`.
