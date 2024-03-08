/**
 *
 * WalletConnect
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { useMetamask } from 'use-metamask';
import metamaskImg from '../../images/metamask-fox.svg';

import Button from '../Button';

const Wrapper = styled.div`
  border: none;
  height: 200px;
  overflow-y: visible;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
    span {
      padding: 10px;
      font-size: 24px;
      text-align: center;
    }
    padding: 10px;
    font-size: 24px;
    text-align: center;
  }
`;

const Span = styled.span`
  color: white;
`;

const WalletConnect = () => {
  const { connect, metaState } = useMetamask();
  const connectMetamask = async () => {
    try {
      const provider = window.ethereum;
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x137' }],
      });
      await connect();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Wrapper className="d-flex flex-column align-items-center">
      <img src={metamaskImg} alt="metamask" />
      {metaState.isConnected ? (
        <h6>Wallet Connected {metaState.account}</h6>
      ) : (
        <div>
          <Span>Please connect your wallet to continue registration!</Span>{' '}
          <br />
          <Button
            backgroundColor="#F6851B"
            borderRadius="10px"
            color="white"
            padding="15px"
            margin="20px"
            onClick={connectMetamask}
          >
            Connect Wallet
          </Button>
        </div>
      )}
      {metaState.isAvailable ? (
        ''
      ) : (
        <div>
          <p>You don't have Metamask installed</p>
          <p>But wait, what is Metamask?</p>
          <p>
            <code>
              <a href="https://metamask.io/">https://metamask.io</a>
            </code>
          </p>
        </div>
      )}
    </Wrapper>
  );
};

WalletConnect.propTypes = {};

export default memo(WalletConnect);
