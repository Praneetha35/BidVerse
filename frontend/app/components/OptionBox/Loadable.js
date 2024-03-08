/**
 *
 * Asynchronously loads the component for OptionBox
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
