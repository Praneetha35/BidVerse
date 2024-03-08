/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import './index.css';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import history from 'utils/history';
import Button from '../../components/Button';
import { routes } from '../../utils/constants';

export function LandingPage() {
  return (
    <div>
      <Helmet>
        <title>Landing Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div className="landing-container">
        <div className="landing-content">
          <p className="heading">BidVerse</p>

          <p className="description">
            The decentralized destination to hire and get hired. Enhancing the
            conventional methods of recruitment with blockchain.
          </p>
          <div className="landing-actions">
            <Button
              background="black"
              color="#E5E5E5"
              width="220px"
              height="60px"
              margin="10px"
              borderRadius="10px"
              onClick={() => {
                history.push(routes.companyReg);
              }}
            >
              <p className="button-text">Recruiter</p>
            </Button>

            <Button
              background="black"
              color="#E5E5E5"
              width="220px"
              height="60px"
              margin="10px"
              borderRadius="10px"
              onClick={() => {
                history.push(routes.candidateReg);
              }}
            >
              <p className="button-text">Job Seeker</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

LandingPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LandingPage);
