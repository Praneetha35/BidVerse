/**
 *
 * Card
 *
 */

import React, { memo } from 'react';
import { Card } from 'antd';

import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CardComp(props) {
  const { Meta } = Card;

  const { title, description, imgSrc } = props;

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="profile" src={imgSrc} />}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}

CardComp.defaultProps = {
  imgSrc: 'frontend/app/images/avatar.png',
};

CardComp.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
};

export default memo(CardComp);
