import React, { lazy, Suspense } from 'react';

const LazyHeaderComponent = lazy(() => import('./HeaderComponent'));

const HeaderComponent = props => (
  <Suspense fallback={null}>
    <LazyHeaderComponent {...props} />
  </Suspense>
);

export default HeaderComponent;
