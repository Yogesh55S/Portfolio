# Coding Conventions

## JavaScript Patterns
- **React**: Functional components with hooks.
- **Animations**:
  - `framer-motion` for simple entry/exit animations.
  - `gsap` for complex timeline-based animations.
- **State Management**: Local `useState` for UI states (like loading).

## CSS Patterns
- **Tailwind CSS**: Utility-first styling used within JSX classes.
- **Custom CSS Variables**: Defined in `src/app/globals.css` for theme colors.
- **Animations**: Custom `@keyframes` in `globals.css` (e.g., `gradientShift`).

## Error Handling
- **Status**: Minimal explicit error boundaries seen. Standard React/Next.js error handling applies.

## Code Style
- **Indentation**: 2 spaces.
- **Semicolons**: Used consistently.
- **Quotes**: Single quotes preferred for strings.
