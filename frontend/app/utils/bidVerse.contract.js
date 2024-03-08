import { Contract, ethers } from 'ethers';
import { map } from 'lodash';

import * as bidVerseAbi from '../../../smartcontracts/artifacts/contracts/BidVerse.sol/BidVerse.json';
import * as bidVerseProfileAbi from '../../../smartcontracts/artifacts/contracts/BidVerseProfile.sol/BidVerseProfile.json';

import * as contracts from '../../../smartcontracts/deployed.json';

let provider;
let signer;

let bidVerseContract;
let bidVerseProfileContract;

export async function init() {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    signer = provider.getSigner();
    bidVerseContract = new Contract(
      contracts.BIDVERSE,
      bidVerseAbi.abi,
      provider,
    );
    bidVerseProfileContract = new Contract(
      contracts.BIDVERSE_PROFILE,
      bidVerseProfileAbi.abi,
      provider,
    );

    const activeAddress = await signer.getAddress();
    return {
      activeAddress,
      bidVerseContract,
    };
  } catch (error) {
    alert(error.message);
  }
}

export async function registerOrganisation(_params) {
  await init();

  try {
    // TODO: Make these
    const receipt = await (await bidVerseContract
      .connect(signer)
      .addOrganisation([
        _params.name,
        _params.experience,
        _params.metaUri,
        _params.selectedType.key,
      ])).wait();
    console.log(receipt);
    // TODO: Add a toast to display success messages.
  } catch (error) {
    console.log(error);
  }
}

export async function candidateRegister(payload) {
  const skillsets = map(payload.skillSets, skill => skill.name);
  try {
    await init();

    const tx = await bidVerseContract.connect(signer).addProfile({
      name: payload.name,
      experience: payload.experience,
      uri: payload.metaUri,
      profileUri: payload.profileUrl,
      domain: payload.domain,
      designation: payload.currentDesignation,
      skills: skillsets,
      status: payload.status,
      validity: 30,
    });
    if (tx) {
      console.log(tx);
      window.location.href = '/candidate-panel';
    }
  } catch (err) {
    console.log('Candidate', {
      name: payload.name,
      experience: payload.experience,
      uri: payload.metaUri,
      profileUri: payload.profileUrl,
      domain: payload.domain,
      designation: payload.currentDesignation,
      skills: skillsets,
      status: payload.status,
      validity: 30,
    });
  }
}
export async function getCandidateTable() {
  await init();

  try {
    // TODO: Make these
    const bids = await bidVerseContract.connect(signer).getBidsByCandidate();
    console.log('Bids', bids);
    return bids;
    // TODO: Add a toast to display success messages.
  } catch (error) {
    console.log(error);
  }
}

export async function getInterviewRequests() {
  await init();

  try {
    const requests = await bidVerseContract
      .connect(signer)
      .getMyInterviewOffers();
    console.log('Requests', requests);
    return requests;
  } catch (err) {
    console.log(err);
  }
}

export async function sendApproveOrDeny(_id) {
  await init();

  try {
    const setApproval = await (await bidVerseContract
      .connect(signer)
      .apporveOrg(_id)).wait();
    console.log(setApproval);
  } catch (error) {
    console.log(error);
  }
}

export async function whoIsThis() {
  await init();

  try {
    // console.log(signer);
    const setApproval = await bidVerseContract.connect(signer).whoAmI();
    return setApproval;
  } catch (error) {
    return error;
  }
}
