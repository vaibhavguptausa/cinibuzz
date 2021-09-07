import React, { lazy, Suspense } from 'react';

const LazyFooterComponent = lazy(() => import('./FooterComponent'));

const FooterComponent = props => (
  <Suspense fallback={null}>
    <LazyFooterComponent {...props} />
  </Suspense>
);

export default FooterComponent;
