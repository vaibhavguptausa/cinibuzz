import React, { lazy, Suspense } from 'react';

const LazyMovieDetailsComponent = lazy(() => import('./MovieDetailsComponent'));

const MovieDetailsComponent = props => (
  <Suspense fallback={null}>
    <LazyMovieDetailsComponent {...props} />
  </Suspense>
);

export default MovieDetailsComponent;
