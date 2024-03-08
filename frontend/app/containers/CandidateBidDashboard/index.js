/**
 *
 * CandidateBidDashboard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCandidateBidDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';

const data = [
  {
    key: '1',
    candidate: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    organisation: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    role: 'asd:asd',
    bidValue: 70,
  },
  {
    key: '2',
    candidate: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    organisation: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    role: 'asd:asd',
    bidValue: 70,
  },
  {
    key: '3',
    candidate: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    organisation: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    role: 'asd:asd',
    bidValue: 70,
  },
  {
    key: '4',
    candidate: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    organisation: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    role: 'asd:asd',
    bidValue: 70,
  },
];

const parsedData = data.map(it => ({
  key: it.key,
  candidate: it.candidate,
  organisation: it.organisation,
  role: it.role.split(':')[0],
  jobDesciption: it.role.split(':')[1],
  bidValue: it.bidValue,
}));

const columns = [
  {
    title: 'Candidate Name',
    dataIndex: 'candidate',
  },
  {
    title: 'Job description',
    dataIndex: 'jobDesciption',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'Designation',
    dataIndex: 'role',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'Bid value',
    dataIndex: 'bidValue',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: 'Delete Bid',
    dataIndex: 'approveOrDeny',
    render: (_, row) => (
      <>
        <a>Delete Bid</a>
      </>
    ),
  },
];

export function CandidateBidDashboard() {
  useInjectReducer({ key: 'candidateBidDashboard', reducer });
  useInjectSaga({ key: 'candidateBidDashboard', saga });

  return (
    <div className="p-5">
      <h2 className="text-white">Candidates Bided by you</h2>
      <Table className="mt-4" columns={columns} dataSource={parsedData} />
    </div>
  );
}

CandidateBidDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  candidateBidDashboard: makeSelectCandidateBidDashboard(),
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
)(CandidateBidDashboard);
