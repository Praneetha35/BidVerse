/**
 *
 * CandidateRegistration
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Steps } from 'antd';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCandidateRegistration, {
  getTransactionStatus,
  getTransactionSuccessMessage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import WorkProfileRegistration from '../../components/WorkProfileRegistration';
import WalletConnect from '../../components/WalletConnect';
import './candidate-registration.css';
import { uploadProfileAction } from './actions';
import PersonalProfileForm from '../../components/PersonalProfileForm';
import { useMetamask } from 'use-metamask';
import { useHistory } from 'react-router-dom';
import { routes } from '../../utils/constants';

const { Step } = Steps;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 700;
  font-size: 40px;
  color: white;
`;

export function CandidateRegistration(props) {
  useInjectReducer({ key: 'candidateRegistration', reducer });
  useInjectSaga({ key: 'candidateRegistration', saga });
  const [step, setStep] = useState(0);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const { metaState } = useMetamask();
  // const uploadStatus = useSelector(getTransactionStatus);
  // const uploadSuccessMessage = useSelector(getTransactionSuccessMessage);

  useEffect(() => {
    if (metaState.isConnected) {
      onWalletConnectFinish();
    }
  }, [metaState.isConnected]);

  const LoadForm = memo(() => {
    switch (step) {
      case 0:
        return <PersonalProfileForm form={form1} />;
      case 1:
        return <WorkProfileRegistration form={form2} />;
      case 2:
        return (
          <div
            style={{ height: '100%' }}
            className="d-flex justify-content-center align-content-center wallet-connect"
          >
            <WalletConnect onFinish={onWalletConnectFinish} />
          </div>
        );
      default:
        return '';
    }
  }, []);

  useEffect(() => {
    if (metaState.isConnected && step === 2) {
      onWalletConnectFinish();
    }
  }, [metaState.isConnected]);

  const onWalletConnectFinish = () => {
    const form1Values = form1.getFieldValue();
    const form2Values = form2.getFieldValue();
    const formData = {
      ...form1Values,
      ...form2Values,
    };
    props.uploadProfileToArweave(formData);
    console.log('FORMDATA', formData);
  };

  // useEffect(() => {
  //   if (uploadStatus && uploadSuccessMessage) {
  //     history.go(routes.candidateBidDashboard);
  //   }
  // }, [uploadStatus, uploadSuccessMessage]);

  const onChangeStep = current => {
    if (step > current) {
      setStep(current);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ maxHeight: '100vh', width: '100%' }}
    >
      <Helmet>
        <title>Candidate Registration</title>
        <meta
          name="description"
          content="Description of CandidateRegistration"
        />
      </Helmet>
      <div className="p-5">
        <Title>Candidate Registration</Title>
        <Steps current={step} onChange={onChangeStep} className="mt-5">
          <Step title="Personal Profile" />
          <Step title="Work Profile" />
          <Step title="Connect Wallet" />
        </Steps>
        <div className="mt-5">
          <Form.Provider
            onFormFinish={name => {
              if (name === 'personalProfile') {
                setStep(1);
              } else if (name === 'workProfile') {
                setStep(2);
                // TODO -  Remove this after wallet connect is implemented
                onWalletConnectFinish();
              }
            }}
          >
            <LoadForm />
          </Form.Provider>
        </div>
      </div>
    </div>
  );
}

CandidateRegistration.propTypes = {
  uploadProfileToArweave: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  candidateRegistration: makeSelectCandidateRegistration(),
});

function mapDispatchToProps(dispatch) {
  return {
    uploadProfileToArweave: formData => {
      dispatch(uploadProfileAction(formData));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CandidateRegistration);
