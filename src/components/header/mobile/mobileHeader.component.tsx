import * as React from 'react';

import { HeaderMethod, HeaderProps } from 'container/header';
import HanlightLogo from 'lib/svg/hanlight-logo.svg';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import MobileMenuComponent from './menu';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 3.75rem;
  z-index: 10;
  position: relative;
  border-bottom: 1px solid #e9e9e9;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuIcon = styled.div`
  width: 1.25rem;
  height: 1rem;
  position: absolute;
  left: 1.15rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const MenuSpan = styled.span`
  content: ${' '};
  width: 1.25rem;
  height: 0.125rem;
  background-color: #707070;
`;

const MobileHeaderComponent: React.FC<
  HeaderProps & HeaderMethod & RouteComponentProps
> = props => {
  return (
    <>
      <MobileMenuComponent {...props} />
      <HeaderWrapper>
        <MenuIcon>
          <MenuSpan />
          <MenuSpan style={{ width: '16px' }} />
          <MenuSpan />
        </MenuIcon>
        <img style={{ height: '1rem' }} src={HanlightLogo} alt="" />
      </HeaderWrapper>
    </>
  );
};

export default MobileHeaderComponent;
