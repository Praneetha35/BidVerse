/**
 *
 * CardContainer
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.input`
  appearance: none;
  background-color: rgba(196, 196, 196, 0.1);
  border-radius 10px;
  outline: none;
  border: none;
  max-width: 400px;
  min-width: 400px;
  padding: 12px;
  color: white;
  font-wight: 400;
`;

function CardContainer() {
  return <Wrapper {...props} onChange={props.onChange} />;
}

CardContainer.propTypes = {};

export default memo(CardContainer);
