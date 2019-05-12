import * as React from 'react';
import styled from 'styled-components';
import FbLogo from 'lib/svg/facebook-logo-button.svg';
import IgLogo from 'lib/svg/instagram.svg';
import HatLogo from 'lib/svg/college-graduation.svg';

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 15rem;
  background-color: #f9f9f9;
`;

const WordsWrapper = styled.div`
  /* height: 3rem; */
  display: flex;
  flex-direction: column;
  font-family: 'Spoqa Han Sans';
  font-size: 1.5rem;
`;

const LinksWrapper = styled.div`
  width: 19.75rem;
  display: flex;
  justify-content: space-around;
`;

const FooterComponent: React.FC = () => {
  return (
    <FooterWrapper>
      <WordsWrapper>
        <span>서울 마포구 마포대로 11길 44-80</span>
        <span>서울 마포구 아현동 771</span>
      </WordsWrapper>
      <WordsWrapper>
        <span>대표자 : 김우혁</span>
        <span>전화번호 : 010 9663 4112</span>
      </WordsWrapper>
      <LinksWrapper>
        <img src={FbLogo} alt="facebook logo" />
        <img src={IgLogo} alt="Instagram logo" />
        <img src={HatLogo} alt="Hat logo" />
      </LinksWrapper>
    </FooterWrapper>
  );
};

export default FooterComponent;
