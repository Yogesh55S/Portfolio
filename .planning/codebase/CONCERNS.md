# Technical Concerns

## Technical Debt
- **Hardcoded Data**: Dot matrix dictionaries and content (awards, project details) are directly in component files. Suggest moving to a `constants/` or `data/` directory.
- **Component Placement**: `Hero.js` is in `components/` while most other sections are in `section/`.

## Performance Concerns
- **Animation Overhead**: Concurrent use of Framer Motion, GSAP, and tsparticles could lead to high CPU/GPU usage on low-end devices.
- **Three.js**: Heavy assets or complex shaders could impact initial load.

## Structural Gaps
- **Testing**: Complete lack of automated testing for UI components or state logic.
- **SEO**: Meta descriptions and social tags need optimization (as noted in project intent).

## Known Issues (from initial context)
- **Dot-Matrix Loader**: Implementation needs refinement to match high-fidelity designs.
