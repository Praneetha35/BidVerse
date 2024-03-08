/**
 *
 * CompanyRegistrationForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import reducer from './reducer';
import saga from './saga';
import CompanyProfile from '../../components/CompanyProfile';
import WalletConnect from '../../components/WalletConnect';
import { uploadCompanyProfile } from './actions';

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 700;
  font-size: 40px;
  color: white;
  padding-left: 5rem;
  padding-top: 5rem;
  margin-bottom: 3rem;
`;

const WalletWrapper = styled.div`
  width: 450px;
  height: 350px;
  background-color: #2e2e2e;
  border-radius: 8px;
  margin-top: 50px;
`;

export function CompanyRegistrationForm({ dispatch }) {
  useInjectReducer({ key: 'companyRegistrationForm', reducer });
  useInjectSaga({ key: 'companyRegistrationForm', saga });

  return (
    <div style={{ backgroundColor: '#1d1d1d', width: '100%' }}>
      <Title>Company Registration</Title>
      <Row justify="space-around">
        <Col span={14}>
          <CompanyProfile
            uploadCompanyProfile={data => {
              dispatch(uploadCompanyProfile(data));
            }}
          />
        </Col>
        <Col span={8} style={{ alignItems: 'center' }}>
          <WalletWrapper>
            <WalletConnect />
          </WalletWrapper>
        </Col>
      </Row>
    </div>
  );
}

CompanyRegistrationForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CompanyRegistrationForm);
