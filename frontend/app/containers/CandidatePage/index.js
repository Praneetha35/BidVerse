/**
 *
 * CandidateBidList
 *
 */

import React, { memo, useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { render } from 'react-testing-library';
import {
  getCandidateTable,
  getInterviewRequests,
} from '../../utils/bidVerse.contract';
import { ethers } from 'ethers';
import { get } from 'lodash';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const columns = [
  {
    title: 'Company Name',
    dataIndex: 'organisation',
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'Job description',
    dataIndex: 'jobDescription',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Approve / Deny',
    dataIndex: 'approveOrDeny',
    render: (_, row) => (
      <>
        <a onClick={() => handleClick(row.companyName)}>Approve</a>
      </>
    ),
  },
];

function handleClick(company) {
  console.log('Clicked', company);
}

function CandidatePage() {
  const [contractData, setContractData] = useState('');

  useEffect(() => {
    decrement();
  }, []);

  const decrement = useCallback(async () => {
    const getData = await getInterviewRequests();
    console.log(getData);

    const parsedData = [];
    getData.map(it => {
      parsedData.push({
        title: it.title,
        organisation: it.organisation,
        designation: it.jobDescription.split(':')[0],
        jobDescription: it.jobDescription.split(':')[1],
      });
      return it;
    });

    setContractData(parsedData);
  }, [getCandidateTable]);

  async function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  return (
    <div style={{ color: 'white' }} className="p-5">
      <Table columns={columns} dataSource={contractData} onChange={onChange} />
    </div>
  );
}

CandidatePage.propTypes = {};

export default memo(CandidatePage);
