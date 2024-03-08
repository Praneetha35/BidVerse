import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMetamask } from 'use-metamask';
import { ethers } from 'ethers';
import { whoIsThis } from '../../utils/bidVerse.contract';

import Button from '../Button';
import { routes } from '../../utils/constants';
import history from '../../utils/history';

function Header() {
  const { connect, metaState } = useMetamask();

  useEffect(() => {
    checkWhoAMI();
  }, [metaState.isConnected]);
  const connectMetamask = async () => {
    try {
      const provider = window.ethereum;
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      });
      await connect(
        ethers.providers.Web3Provider,
        'any',
      );
      // await checkWhoAMI();
    } catch (error) {
      alert(error.message);
    }
  };

  async function checkWhoAMI() {
    if (metaState.isConnected) {
      const returnWhoIsThis = await whoIsThis();
      if (returnWhoIsThis.org.orgId.toNumber() !== 0) {
        console.log('I am a Bidder');
        history.push(routes.companyPanel);
      } else if (returnWhoIsThis.user.profileId.toNumber() !== 0) {
        history.push(routes.candidatePage);
      } else if (
        returnWhoIsThis.org.orgId.toNumber() === 0 &&
        returnWhoIsThis.user.profileId.toString() === 0
      ) {
        history.push(routes.landingPage);
        alert('Please register as any of the users below');
      }
    }
  }

  const Wrapper = styled.div`
    display: flex;
    justify-content: end;
    h5 {
      color: white;
    }
    button {
      font-size: 18px;
    }
  `;

  return (
    <Wrapper>
      {metaState.account[0] ? (
        <h5 className="p-5">Account Address : {metaState.account[0]}</h5>
      ) : (
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
      )}
    </Wrapper>
  );
}

export default Header;
