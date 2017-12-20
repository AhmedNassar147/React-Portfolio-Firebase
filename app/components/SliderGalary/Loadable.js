/**
 *
 * Asynchronously loads the component for SliderGalary
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
