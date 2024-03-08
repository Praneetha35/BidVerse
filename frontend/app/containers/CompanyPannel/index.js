/**
 *
 * CompanyPannel
 *
 */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { Modal, Tag } from 'antd';
import { isEmpty } from 'lodash';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Button from '../../components/Button';
import SelectBox from '../../components/SelectBox';
import InputBox from '../../components/InputBox';
import OptionBox from '../../components/OptionBox';
import makeSelectCompanyPannel from './selectors';
import reducer from './reducer';
import saga from './saga';
import './company-detail.css';

import avatar from '../../images/man.png';

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 700;
  font-size: 48px;
  color: white;
`;

const FilterBox = styled.div`
  background-color: rgba(196, 196, 196, 0.1);
  height: 80%;
  width: 450px;
  border-radius 10px;
  padding: 12px;
`;

const Label = styled.label`
  font-family: Ubuntu;
  font-size: 15px;
  font-weight: 400;
  color: #5956ff;
`;

const SkillWrapper = styled.div`
  background-color: rgba(196, 196, 196, 0.1);
  width: 250px;
  border-radius: 10px;
  height: 95px;
`;

export function CompanyPannel() {
  useInjectReducer({ key: 'companyPannel', reducer });
  useInjectSaga({ key: 'companyPannel', saga });
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState('');
  const [domain, setDomain] = useState('');
  const [ctc, setCTC] = useState('');
  const [exp, setExp] = useState('');

  const userData = [
    {
      title: 'currentCTC',
      value: '5 LPA',
    },
    {
      title: 'experience',
      value: '5YRS',
    },
    {
      title: 'currentCTC',
      value: '5 LPA',
    },
  ];

  const candidateDataSet = [
    {
      name: 'Nandha Gopal',
      profileImage: 'arweave_url',
      bio: '100 percent suthamana playboy!',
      dob: '09/09/0999',
      email: 'nandhu.playgod@hotmail.com',
      resumeUrl: 'arweave_url',
      currentCTC: '5 LPA',
      currentDesignation: 'Blockchain developer',
      skillSets: [
        {
          skill: 'React',
          score: '4',
        },
        {
          skill: 'Nest',
          score: '5',
        },
        {
          skill: 'Solidity',
          score: '5',
        },
      ],
      domain: 'Blockchain',
      experience: '1 YRS',
      projects: [
        {
          name: 'Some',
          description: 'Random project for two lines',
          url: 'https://some',
        },
      ],
      publicProfiles: [
        {
          url: 'nandhu@gitpub.com',
          name: 'gitpub.com',
        },
      ],
    },
    {
      name: 'Akash Kanan',
      profileImage: 'arweave_url',
      bio: 'Commited guy',
      dob: '21/02/1998',
      email: 'akash.kannan@gmail.com',
      resumeUrl: 'arweave_url',
      currentCTC: '5 LPA',
      currentDesignation: 'Web developer',
      skillSets: [
        {
          skill: 'React',
          score: '4',
        },
        {
          skill: 'Nest',
          score: '5',
        },
        {
          skill: 'Mongo',
          score: '3',
        },
        {
          skill: 'Solidity',
          score: '5',
        },
      ],
      domain: 'Web Developement',
      experience: '2 YRS',
      projects: [
        {
          name: 'Some',
          description: 'Random project for two lines',
          url: 'https://some',
        },
      ],
      publicProfiles: [
        {
          url: 'akash@gitpub.com',
          name: 'gitpub.com',
        },
      ],
    },
  ];

  let filteredDataSet = [];
  const [visible, setVisible] = useState(false);

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      setSkills(prev => [...prev, skill]);
      setSkill('');
    }
  };

  if (isEmpty(filteredDataSet)) {
    filteredDataSet = candidateDataSet;
  }
  if (!isEmpty(domain)) {
    filteredDataSet = filteredDataSet.filter(val => val.domain === domain);
  }
  if (!isEmpty(ctc)) {
    filteredDataSet = filteredDataSet.filter(
      val => val.currentCTC === `${ctc} LPA`,
    );
  }
  if (!isEmpty(exp)) {
    filteredDataSet = filteredDataSet.filter(
      val => val.experience === `${exp} YRS`,
    );
  }

  return (
    <div style={{ backgroundColor: '#1d1d1d' }} className="p-5">
      <Title>Recruiter Panel</Title>
      <div className="d-flex">
        <FilterBox className="d-flex flex-column align-items-center mt-5">
          <SelectBox
            placeholder="Category"
            className="mb-3 mt-3"
            width="400px"
            onChange={v => setDomain(v.target.value)}
          >
            <OptionBox>Front-End</OptionBox>
            <OptionBox>Back-End</OptionBox>
            <OptionBox>Blockchain</OptionBox>
          </SelectBox>
          <InputBox
            width="400px"
            placeholder="Current CTC in LPA"
            type="number"
            className="mb-3"
            onChange={data => setCTC(data.target.value)}
          />
          <InputBox
            width="400px"
            placeholder="Experience in years"
            type="number"
            className="mb-3"
            onChange={data => setExp(data.target.value)}
          />
          <InputBox
            width="400px"
            id="myInput"
            placeholder="Add Skill"
            type="text"
            className="mb-3"
            value={skills}
            onChange={e => setSkills(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="d-flex flex-wrap p-2">
            {skills.map(skillData => (
              <Tag className="me-3 mb-3">{skillData}</Tag>
            ))}
          </div>
        </FilterBox>
        <Modal
          centered
          footer={null}
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={900}
          height={700}
        >
          <div className="d-flex justify-content-between">
            <div>
              <div className="d-flex">
                <div className="profile  mb-3">
                  <img src={avatar} className="card-avatar" alt="avatar" />
                </div>
                <div className="profile-details">
                  <h2 className="card-profile-name">Nagato Uzumaki</h2>
                  <h2 className="card-designation">Developer / Full-stack</h2>
                  {userData.map(val => (
                    <div className="d-flex justify-content-between">
                      <h2 className="card-subtitle mt-2">{val.title}</h2>
                      <h2 className="card-subtitle mt-2">{val.value}</h2>
                    </div>
                  ))}
                </div>
              </div>
              <br />
              <Label>LinkendIn profile</Label>
              <br />
              <InputBox
                width="99%"
                value="https://some@gitpub.com"
                type="text"
                style={{ textTransform: 'none' }}
                disabled
                className="mb-3"
              />
              <br />
              <Label>Github profile</Label>
              <br />
              <InputBox
                width="99%"
                style={{ textTransform: 'none' }}
                value="https://some@gitpub.com"
                type="text"
                disabled
                className="mb-3"
              />
              <div className="d-flex justify-content-start mt-0">
                <div>
                  <Label>Current CTC</Label>
                  <br />
                  <InputBox
                    width="235px"
                    value="500,000"
                    type="text"
                    disabled
                    className="mb-3"
                  />
                </div>
                <div className="ms-5">
                  <Label>Highest Bid</Label>
                  <br />
                  <InputBox
                    width="235px"
                    value="600,000"
                    type="text"
                    disabled
                    className="mb-3"
                  />
                </div>
              </div>
              <div style={{ display: 'none' }}>
                <h2 className="card-title">Bid</h2>
                <div className="d-flex justify-content-start mt-2">
                  <InputBox
                    width="235px"
                    placeholder="Designation"
                    type="text"
                    className="mb-3"
                  />
                  <InputBox
                    width="235px"
                    placeholder="Bid value"
                    type="text"
                    className="mb-3 ms-5"
                  />
                </div>
                <InputBox
                  width="99%"
                  placeholder="Job Description"
                  type="text"
                  className="mb-3 mt-3"
                />
              </div>
            </div>
            <div className="skills-section p-3">
              {candidateDataSet[0].skillSets.map(data => (
                <div
                  className="d-flex align-items-center  justify-content-between"
                  style={{ color: 'white' }}
                >
                  <div>
                    <p>{`${data.skill}  -  ${data.score} Rating`}</p>
                  </div>
                  <Button width="80px" className="ms-2 mb-3">
                    Delete
                  </Button>
                </div>
              ))}
              <h2 className="card-title mt-3">Bid</h2>
              <div className="d-grid justify-content-start mt-3">
                <InputBox
                  width="100%"
                  placeholder="Company Name"
                  type="text"
                  className="mb-4"
                />
                {/* <InputBox
                  width="100%"
                  placeholder="Bid value"
                  type="text"
                  className="mb-4"
                /> */}
                <InputBox
                  width="100%"
                  placeholder="Job Description"
                  type="text"
                  className="mb-4"
                />
                <Button
                  height="50px"
                  className="mb-2"
                  type="primary"
                  backgroundColor="#8247E5"
                >
                  Request for interview
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        <div className="card-list d-flex flex-wrap">
          {filteredDataSet.map(dataSet => (
            <div
              className="candidate-card me-5 mb-5"
              onClick={() => setVisible(true)}
            >
              <div className="profile  mb-3">
                <img src={avatar} className="card-avatar" alt="avatar" />
              </div>
              <div className="candidate-details p-3">
                <h2 className="card-title">{dataSet.name}</h2>
                <h2 className="card-designation">
                  {dataSet.currentDesignation}
                </h2>
                {userData.map(val => (
                  <div className="d-flex mt-3 justify-content-between">
                    <h2
                      className="card-subtitle"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {val.title}
                    </h2>
                    <h2 className="card-subtitle">{dataSet[val.title]}</h2>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

CompanyPannel.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  companyPannel: makeSelectCompanyPannel(),
});

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
)(CompanyPannel);
