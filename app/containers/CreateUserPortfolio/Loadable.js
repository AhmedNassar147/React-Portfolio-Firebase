/**
 *
 * Asynchronously loads the component for CreateUserPortfolio
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
