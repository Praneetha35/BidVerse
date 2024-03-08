/**
 *
 * InputBox
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.input`
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

const InputBox = props => {
  return <Wrapper {...props} onChange={props.onChange} />;
};

InputBox.propTypes = {
  onChange: PropTypes.func,
  appearance: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.string,
  border: PropTypes.string,
  color: PropTypes.string,
  outline: PropTypes.string,
  textTransform: PropTypes.string,
  fontSize: PropTypes.string,
};
InputBox.defaultProps = {
  appearance: 'none',
  backgroundColor: 'rgba(196, 196, 196, 0.1)',
  padding: '12px',
  border: 'none',
  borderRadius: '10px',
  width: '480px',
  height: '60px',
  outline: 'none',
  color: 'white',
  textTransform: 'capitalize',
  fontSize: '20px',
};
export default memo(InputBox);
