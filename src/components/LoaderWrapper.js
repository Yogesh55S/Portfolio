'use client';

import { useState } from 'react';
import Loader from './Loader';

export default function LoaderWrapper({ children }) {
  const [done, setDone] = useState(false);

  return (
    <>
      <Loader onComplete={() => setDone(true)} />
      {/* Content is rendered in DOM immediately (good for SEO/hydration),
          but hidden behind the loader overlay until it exits */}
      <div
        style={{
          opacity: done ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: done ? 'auto' : 'none',
        }}
      >
        {children}
      </div>
    </>
  );
}
