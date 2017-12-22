/**
 *
 * Asynchronously loads the component for UserEducation
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
