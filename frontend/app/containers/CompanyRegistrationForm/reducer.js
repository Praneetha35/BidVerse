/*
 *
 * CompanyRegistrationForm reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  UPLOAD_COMPANY_PROFILE_ACTION,
  UPLOAD_COMPANY_PROFILE_FAILED_ACTION,
  UPLOAD_COMPANY_PROFILE_SUCCESS_ACTION,
} from './constants';

export const initialState = {
  uploadProfile: {
    data: {},
    error: {},
    isLoading: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const companyRegistrationFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case UPLOAD_COMPANY_PROFILE_ACTION:
        draft.uploadProfile.isLoading = true;
        break;
      case UPLOAD_COMPANY_PROFILE_SUCCESS_ACTION:
        draft.uploadProfile.data = action.payload;
        draft.uploadProfile.isLoading = false;
        break;
      case UPLOAD_COMPANY_PROFILE_FAILED_ACTION:
        draft.uploadProfile.error = action.payload;
        draft.uploadProfile.isLoading = false;
        break;
    }
  });

export default companyRegistrationFormReducer;
