/*
 *
 * CandidateRegistration actions
 *
 */

import {
  DEFAULT_ACTION,
  UPLOAD_PROFILE_ACTION,
  UPLOAD_PROFILE_FAILED_ACTION,
  UPLOAD_PROFILE_SUCCESS_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function uploadProfileAction(payload) {
  return {
    type: UPLOAD_PROFILE_ACTION,
    payload,
  };
}

export function onUploadProfileSuccess(payload) {
  return {
    type: UPLOAD_PROFILE_SUCCESS_ACTION,
    payload,
  };
}

export function onUploadProfileFailed(payload) {
  return {
    type: UPLOAD_PROFILE_FAILED_ACTION,
    payload,
  };
}
