/*
 *
 * CompanyRegistrationForm actions
 *
 */

import {
  DEFAULT_ACTION,
  UPLOAD_COMPANY_PROFILE_ACTION,
  UPLOAD_COMPANY_PROFILE_FAILED_ACTION,
  UPLOAD_COMPANY_PROFILE_SUCCESS_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function uploadCompanyProfile(payload) {
  return {
    type: UPLOAD_COMPANY_PROFILE_ACTION,
    payload,
  };
}

export function uploadCompanyProfileSuccess(payload) {
  return {
    type: UPLOAD_COMPANY_PROFILE_SUCCESS_ACTION,
    payload,
  };
}

export function uploadCompanyProfileFailed(payload) {
  return {
    type: UPLOAD_COMPANY_PROFILE_FAILED_ACTION,
    payload,
  };
}
