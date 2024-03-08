/**
 *
 * Input
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled components
const Input = styled.input`
  background-color: #2e2e2e;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c4c4c4;
  }
  border-radius: 8px;
  padding: 14px;
  width: 100%;
  color: #c4c4c4;
`;

function BVInput({ placeholder, onChange }) {
  return <Input placeholder={placeholder} onChange={onChange} />;
}

BVInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(BVInput);
