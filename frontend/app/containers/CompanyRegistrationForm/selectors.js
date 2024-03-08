import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the companyRegistrationForm state domain
 */

const selectCompanyRegistrationFormDomain = state =>
  state.companyRegistrationForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CompanyRegistrationForm
 */

const makeSelectCompanyRegistrationForm = () =>
  createSelector(
    selectCompanyRegistrationFormDomain,
    substate => substate,
  );

export default makeSelectCompanyRegistrationForm;
export { selectCompanyRegistrationFormDomain };
