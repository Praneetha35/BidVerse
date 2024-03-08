/*
 *
 * CandidateRegistration reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, UPLOAD_PROFILE_ACTION, UPLOAD_PROFILE_FAILED_ACTION, UPLOAD_PROFILE_SUCCESS_ACTION } from './constants';

export const initialState = {
  upload: {
    data: {},
    error: {},
    isLoading: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const candidateRegistrationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case UPLOAD_PROFILE_ACTION:
        draft.upload.isLoading = true;
        break;
      case UPLOAD_PROFILE_FAILED_ACTION:
        draft.upload.error = action.payload;
        draft.upload.isLoading = false
        break;
      case UPLOAD_PROFILE_SUCCESS_ACTION:
        draft.upload.data = action.payload;
        draft.upload.isLoading = false
    }
  });

export default candidateRegistrationReducer;
