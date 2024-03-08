import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the companyPannel state domain
 */

const selectCompanyPannelDomain = state => state.companyPannel || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CompanyPannel
 */

const makeSelectCompanyPannel = () =>
  createSelector(
    selectCompanyPannelDomain,
    substate => substate,
  );

export default makeSelectCompanyPannel;
export { selectCompanyPannelDomain };
