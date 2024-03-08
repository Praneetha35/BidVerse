import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  color: ${props => props.color};
  background: ${props => props.background};
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius};
  border: none;
  &:hover {
    color: #8247e5;
    box-shadow: rgb(130 71 229 / 19%) -1px -1px 2px, rgb(0 0 0) 2px 2px 4px;
  }
`;

const Button = props => (
  <Wrapper className="hover-style" {...props} onClick={props.onClick}>
    {props.children}
  </Wrapper>
);

Button.propTypes = {
  children: PropTypes.element,
  width: PropTypes.string,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  padding: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.string,
};

Button.defaultProps = {
  backgroundColor: 'rgba(196, 196, 196, 0.1)',
  padding: '12px',
  border: 'none',
  borderRadius: '10px',
  color: 'white',
  width: '200px',
  height: '60px',
  fontWeight: 700,
  fontSize: '60px',
};

export default Button;
