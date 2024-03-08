/**
 *
 * SelectBox
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.select`
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

const SelectBox = props => <Wrapper {...props} onChange={props.onChange} />;

SelectBox.propTypes = {};
SelectBox.defaultProps = {
  appearance: 'none',
  padding: '12px',
  border: 'none',
  borderRadius: '10px',
  width: '483px',
  height: '60px',
  color: 'white',
  outline: 'none',
  backgroundColor: 'rgba(196, 196, 196, 0.1)',
  textTransform: 'capitalize',
  fontSize: '20px',
};

export default memo(SelectBox);
