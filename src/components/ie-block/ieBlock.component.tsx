import * as React from 'react';

import styled from 'styled-components';

import ChromeImg from 'lib/png/ie-block-chrome@3x.png';
import HanlightLogo from 'lib/svg/hanlight-logo.svg';
import CharImg from 'lib/svg/ie-block-black.svg';
import DisconnectImg from 'lib/svg/ie-block-disconnect.svg';
import IEImg from 'lib/svg/ie-block-ie.svg';

const Wrapper = styled.article`
  width: 100%;
  height: 100%;
  max-height: 100%;

  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

const CharIllust = styled.img`
  position: absolute;

  right: -2.5rem;
  bottom: -2rem;
`;

const MessageBox = styled.section`
  width: 61.75rem;
  height: 21.875rem;

  position: relative;

  background-color: #ffffff;

  box-shadow: 0 20px 30px 0 rgba(101, 101, 101, 0.19);

  border-radius: 1rem;
  border: solid 1px #f3f3f3;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 1.625rem;
  font-family: 'Spoqa Han Sans';

  z-index: 1;

  button {
    width: 17.5rem;
    height: 4.125rem;

    background-color: #ffffff;

    border: 1px solid #bebebe;
    border-radius: 0.5rem;

    font-size: 1.375rem;
    font-family: 'Spoqa Han Sans';
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    img {
      width: 3.375rem;
      height: 3.375rem;

      margin-right: 0.5rem;
    }
  }
`;

const Message = styled.p`
  text-align: center;
`;

const InfoBox = styled.section`
  font-family: 'yg-jalnan';
  font-size: 2.625rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 5rem;

  p {
    font-family: inherit;
    text-align: center;

    margin: 0;

    span {
      color: #ff476c;
    }
  }
`;

const ImgWrapper = styled.article`
  width: 20.125rem;

  display: flex;
  justify-content: space-between;

  margin-bottom: 2.875rem;

  img {
    width: 5.375rem;
    height: 4.125rem;
  }
`;

const IEBlockComponent: React.FC = () => {
  const openChromePage = (): void => {
    window.location.href = 'https://www.google.com/intl/ko/chrome/';
  };

  return (
    <Wrapper>
      <InfoBox>
        <ImgWrapper>
          <img src={HanlightLogo} alt='hanlight' />
          <img src={DisconnectImg} alt='disconnect' />
          <img src={IEImg} alt='IE internet explorer' />
        </ImgWrapper>
        <p>
          <p> 인터넷 익스플로러 Internet Explorer</p>
          <span>지원 중단</span> 안내
        </p>
      </InfoBox>
      <MessageBox>
        <Message>
          <p>
            한빛을 이용해주시는 모든 학생, 선생님 분들께 감사드리며 한빛은
            <br /> 인터넷 익스플로러(Internet Explorer) 지원이 중단되었음을
            알려드립니다.
          </p>
          <p>기존 사용자분들께 구글 크롬(Chrome) 사용을 권장합니다.</p>
        </Message>
        <button onClick={openChromePage}>
          <img src={ChromeImg} alt='Chrome' />
          Chrome 다운로드
        </button>
        <CharIllust src={CharImg} alt='character' />
      </MessageBox>
    </Wrapper>
  );
};

export default IEBlockComponent;
