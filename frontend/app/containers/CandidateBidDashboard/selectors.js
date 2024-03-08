import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the candidateBidDashboard state domain
 */

const selectCandidateBidDashboardDomain = state =>
  state.candidateBidDashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CandidateBidDashboard
 */

const makeSelectCandidateBidDashboard = () =>
  createSelector(
    selectCandidateBidDashboardDomain,
    substate => substate,
  );

export default makeSelectCandidateBidDashboard;
export { selectCandidateBidDashboardDomain };
