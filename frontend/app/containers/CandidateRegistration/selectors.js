import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the candidateRegistration state domain
 */

const selectCandidateRegistrationDomain = state =>
  state.candidateRegistration || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CandidateRegistration
 */

const makeSelectCandidateRegistration = () =>
  createSelector(
    selectCandidateRegistrationDomain,
    substate => substate,
  );

const getTransactionStatus = () =>
  createSelector(
    selectCandidateRegistrationDomain,
    substate => substate.upload.isLoading,
  );

const getTransactionSuccessMessage = () =>
  createSelector(
    selectCandidateRegistrationDomain,
    substate => substate.upload.data.message,
  );

export default makeSelectCandidateRegistration;
export {
  selectCandidateRegistrationDomain,
  getTransactionStatus,
  getTransactionSuccessMessage,
};
