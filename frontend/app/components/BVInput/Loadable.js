/**
 *
 * Asynchronously loads the component for Input
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
