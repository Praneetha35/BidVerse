export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const routes = {
  landingPage: '/',
  candidatePage: '/candidate-panel',
  candidateReg: '/candidate-registration',
  companyPanel: '/company-panel',
  candidateBidDashboard: '/candidate-bid-dashboard',
  notFound: '/not-found',
  companyReg: '/company-registration',
};

export const envs = {
  arweaveEndpoint: process.env.ARWEAVE_ENDPOINT,
  arweavePort: process.env.ARWEAVE_PORT,
};
