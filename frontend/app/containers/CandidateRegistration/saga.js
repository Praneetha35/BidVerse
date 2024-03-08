import { put, takeLatest, call } from 'redux-saga/effects';
import { candidateRegister } from '../../utils/bidVerse.contract';
import { envs } from '../../utils/constants';
import { getBase64 } from '../../utils/methods';
import { onUploadProfileFailed, onUploadProfileSuccess } from './actions';
import { UPLOAD_PROFILE_ACTION } from './constants';

async function fetchCall(...params) {
  return fetch(...params).then(res => res.json());
}

function* uploadProfileDataSaga({ payload }) {
  try {
    const profileImage = payload.profileImage.file;

    const imageBlob = yield call(getBase64, profileImage);

    const profilePicRes = yield call(fetchCall, './uploadToArweave', {
      method: 'POST',
      body: JSON.stringify({ data: imageBlob }),
      headers: { 'content-type': 'application/json' },
    });
    const profileUrl = `${envs.arweaveEndpoint}:${envs.arweavePort}/tx/${
      profilePicRes.txHash
    }/data`;
    const resumeFile = payload.resume.file;

    const resumeBlob = yield call(getBase64, resumeFile);
    const resumeUpload = yield call(fetchCall, './uploadToArweave', {
      method: 'POST',
      body: JSON.stringify({ data: resumeBlob }),
      headers: { 'content-type': 'application/json' },
    });

    const resumeUrl = `${envs.arweaveEndpoint}:${envs.arweavePort}/tx/${
      resumeUpload.txHash
    }/data`;

    const metaData = {
      ...payload,
      resume: undefined,
      profileImage: undefined,
      resumeUrl,
      profileUrl,
    };
    const metaDataUpload = yield call(fetchCall, './uploadToArweave', {
      method: 'POST',
      body: JSON.stringify({ data: metaData }),
      headers: { 'content-type': 'application/json' },
    });

    const metaUri = `${envs.arweaveEndpoint}:${envs.arweavePort}/tx/${
      metaDataUpload.txHash
    }/data`;
    const candidateRegisterData = yield call(candidateRegister, {
      ...payload,
      metaUri,
      profileUrl,
    });
    console.log(candidateRegisterData);

    yield put(
      onUploadProfileSuccess({
        arweave: metaUri,
        message: 'Uploaded successfully',
      }),
    );
  } catch (err) {
    console.log(err);
    if (err.response) {
      const { response } = err;
      yield put(
        onUploadProfileFailed(
          response.data.message ? response.data : { message: response.data },
        ),
      );
    } else {
      yield put(
        onUploadProfileFailed(
          err.message ? err : { message: 'Failed to fetch card details' },
        ),
      );
    }
  }
}

// Individual exports for testing
export default function* candidateRegistrationSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(UPLOAD_PROFILE_ACTION, uploadProfileDataSaga);
}
