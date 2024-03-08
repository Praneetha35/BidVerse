/**
 *
 * CandidateBidList
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { Table } from 'antd';
import { getCandidateTable } from '../../utils/bidVerse.contract';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const columns = [
  {
    title: 'Company Name',
    dataIndex: ['org', 'name'],
  },
  {
    title: 'Job Description',
    dataIndex: ['bid', 'role'],
    render: text => text.split(':')[1],
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'Designation',
    dataIndex: ['bid', 'role'],
    render: text => text.split(':')[0],
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Bid value',
    dataIndex: ['bid', 'bid'],
    render: text => ethers.utils.formatUnits(text, 2),
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: 'Approve / Deny',
    dataIndex: 'approveOrDeny',
    render: () => (
      <>
        <button onClick={() => setApprove(0)}>Approve</button>
        <button onClick={() => setApprove(1)}>Reject</button>
      </>
    ),
  },
];

function handleClick(company) {
  console.log('Clicked', company);
}

function CandidateBidList() {
  const [contractData, setContractData] = useState('');

  useEffect(() => {
    decrement();
  }, []);

  const decrement = useCallback(async () => {
    const getData = await getCandidateTable();
    setContractData(getData);
  }, [getCandidateTable]);

  async function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  return (
    <div style={{ color: 'white' }}>
      <Table columns={columns} dataSource={contractData} onChange={onChange} />
    </div>
  );
}

CandidateBidList.propTypes = {};

export default memo(CandidateBidList);
