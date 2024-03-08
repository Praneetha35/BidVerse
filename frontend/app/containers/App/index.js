/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import CandidateRegistration from '../CandidateRegistration/Loadable';
import CompanyRegistrationForm from '../CompanyRegistrationForm/Loadable';
import CandidateBidDashboard from '../CandidateBidDashboard/Loadable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import GlobalStyle from '../../global-styles';
import { routes } from '../../utils/constants';
import LandingPage from '../LandingPage';
import Header from '../../components/Header';
import CompanyPanel from '../CompanyPannel/Loadable';
import CandidatePage from '../CandidatePage';

export default function App() {
  return (
    <>
      <Helmet titleTemplate="Bidverse" defaultTitle="Bidverse">
        <meta name="description" content="Bidverse application" />
      </Helmet>
      <Header />
      <Switch>
        <Route
          path={routes.candidateBidDashboard}
          component={CandidateBidDashboard}
        />
        <Route path={routes.candidateReg} component={CandidateRegistration} />
        <Route path={routes.companyReg} component={CompanyRegistrationForm} />
        <Route path={routes.companyPanel} component={CompanyPanel} />
        <Route path={routes.landingPage} component={LandingPage} exact />
        <Route path={routes.candidatePage} component={CandidatePage} />
        <Route path={routes.notFound} component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
