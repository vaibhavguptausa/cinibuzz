import React, { lazy, Suspense } from 'react';

const LazyMovieComponent = lazy(() => import('./MovieComponent'));

const MovieComponent = props => (
  <Suspense fallback={null}>
    <LazyMovieComponent {...props} />
  </Suspense>
);

export default MovieComponent;
