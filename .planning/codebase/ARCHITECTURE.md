# System Architecture

## Pattern
- **Framework**: Next.js App Router.
- **Rendering**: Mix of Server Components and Client Components (`'use client'` used extensively for animations).

## Component Layers
- **Layout**: `src/app/layout.js` handles the main structure, using a `ClientLayout` for client-side providers/wrappers.
- **Sections**: Major page sections are defined in `src/section/` (Achievements, Contact, Experience, Projects, Skills, about).
- **UI Components**: Smaller, reusable components in `src/components/` (Hero, Loader, Navbar).

## Data Flow
- **Props-based**: Data is passed down to sections from the main page (`src/app/page.js`).
- **Animations**: GSAP and Framer Motion handle most visual state transitions.

## Entry Points
- `src/app/page.js`: Main landing page assembling various sections.
- `src/app/layout.js`: Global wrapper.
