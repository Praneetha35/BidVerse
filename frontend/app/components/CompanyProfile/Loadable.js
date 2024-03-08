/**
 *
 * Asynchronously loads the component for CompanyProfile
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
