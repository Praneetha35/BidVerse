import { call, put, takeLatest } from 'redux-saga/effects';
import { registerOrganization } from '../../utils/bidVerse.contract';
import { envs } from '../../utils/constants';
import {
  uploadCompanyProfileFailed,
  uploadCompanyProfileSuccess,
} from './actions';
import { UPLOAD_COMPANY_PROFILE_ACTION } from './constants';

const fetchCall = (...params) => fetch(...params).then(res => res.json());

export function* uploadCompanyProfileSaga({ payload }) {
  try {
    const metaDataUpload = yield call(fetchCall, './uploadToArweave', {
      method: 'POST',
      body: JSON.stringify({ data: payload }),
      headers: { 'content-type': 'application/json' },
    });

    yield put(
      uploadCompanyProfileSuccess({
        arweaveHash: metaDataUpload.txHash,
        message: 'Uploaded successfully',
      }),
    );
    yield call(registerOrganization, {
      ...payload,
      metaUri: `${envs.arweaveEndpoint}:${envs.arweavePort}/tx/${
        metaDataUpload.txHash
      }/data`,
    });
  } catch (err) {
    if (err.response) {
      const { response } = err;
      yield put(
        uploadCompanyProfileFailed(
          response.data.message ? response.data : { message: response.data },
        ),
      );
    } else {
      yield put(
        uploadCompanyProfileFailed(
          err.message ? err : { message: 'Failed to fetch card details' },
        ),
      );
    }
  }
}

export default function* companyRegistrationFormSaga() {
  yield takeLatest(UPLOAD_COMPANY_PROFILE_ACTION, uploadCompanyProfileSaga);
}
