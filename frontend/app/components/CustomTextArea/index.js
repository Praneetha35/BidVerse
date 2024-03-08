/**
 *
 * CustomTextArea
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.textarea`
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  color: ${props => props.color};
  background: ${props => props.background};
  border-radius: ${props => props.borderRadius};
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius};
  font-size: ${props => props.fontSize};
  border: none;
  outline: none;
`;

const CustomTextArea = props => {
  return <Wrapper {...props} onChange={props.onChange} />;
};

CustomTextArea.defaultProps = {
  appearance: 'none',
  backgroundColor: 'rgba(196, 196, 196, 0.1)',
  padding: '12px',
  border: 'none',
  borderRadius: '10px',
  width: '400px',
  color: 'white',
  rows: 5,
  outline: "none",
  fontSize: '20px',
};
CustomTextArea.propTypes = {};

export default memo(CustomTextArea);
