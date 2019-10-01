import * as React from 'react';

import DarkLogoSvg from 'lib/svg/hanlight-dark-logo.svg';
import styled from 'styled-components';

const PayHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3.75rem;

  position: fixed;

  background-color: #313131;
`;

const PayHeaderInnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'yg-jalnan';
  font-size: 1.5rem;
  color: #e4e4e4;

  span {
    margin-left: 0.25rem;
  }

  position: relative;
`;

const LogoImg = styled.img`
  height: 1.775rem;

  cursor: pointer;
`;

const XBtn = styled.span`
  width: 1.375rem;
  height: 1.375rem;

  position: absolute;

  border-radius: 1.25rem;

  cursor: pointer;

  right: 1.125rem;

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &::before,
  &::after {
    height: 1px;
    width: 1.375rem;

    position: absolute;
    top: 50%;

    content: ' ';

    background-color: #707070;
  }
`;

interface FSHeaderProps {
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}

const FSHeaderComponent: React.FC<FSHeaderProps> = ({ setAnimate }) => {
  return (
    <PayHeaderWrapper>
      <PayHeaderInnerBox>
        <LogoImg src={DarkLogoSvg} alt="Hanlight Pay Logo" />
        <span>Pay</span>
      </PayHeaderInnerBox>
      <XBtn
        onClick={() => {
          setAnimate(false);
        }}
      />
    </PayHeaderWrapper>
  );
};

export default FSHeaderComponent;
