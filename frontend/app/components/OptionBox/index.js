/**
 *
 * OptionBox
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.option`
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
  text-transform: capitalize;
  line-height: ${props => props.lineHeight};
`;

const OptionBox = props => {
  return <Wrapper {...props} onChange={props.onChange} />;
};

OptionBox.propTypes = {};
OptionBox.defaultProps = {
  appearance: 'none',
  padding: '12px',
  border: 'none',
  borderRadius: '10px',
  width: '483px',
  height: '60px',
  color: 'black',
  textTransform: 'capitalize',
  fontSize: '20px',
};
export default memo(OptionBox);
