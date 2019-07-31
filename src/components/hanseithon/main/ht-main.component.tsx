import * as React from 'react';

import HTVideoComponent from 'components/hanseithon/video';
import { HTMainMethod, HTMainProps } from 'container/hanseithon/main';
import GroupPicture from 'lib/png/group-pic.jpg';
import Logos from 'lib/sponsor';
import { Device } from 'lib/styles';
import BackgroundImg from 'lib/svg/ht-background.svg';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { gameWinTeams, livingWinTeams } from './participantData';

const { useState, useEffect } = React;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-x: hidden;

  background-image: url(${BackgroundImg});
  background-size: 102.5%;
  background-position: center -1rem;
  background-repeat: no-repeat;
`;

const TitleWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  padding: 10rem 0;
  margin-bottom: 5rem;

  @media ${Device.laptopS} {
    padding-top: 9rem;
  }

  @media ${Device.mobileL} {
    padding-top: 4rem;
    margin-bottom: 0.55rem;
  }

  span {
    font-size: 3.5rem;
    color: #ffffff;

    @media ${Device.mobileL} {
      font-size: 1rem;
    }
  }
`;

const WinWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  margin-bottom: 50%;

  @media ${Device.laptopL} {
    margin-bottom: 45%;
  }

  div {
    width: 35%;
    font-family: 'yg-jalnan';
    font-size: 1.5rem;
    color: #ffffff;

    display: flex;
    align-items: center;
    flex-direction: column;

    span {
      font-family: 'Spoqa Han Sans';
      font-size: 2.25rem;
      font-weight: bold;
      color: #ff476c;
    }
  }
`;

const GroupImg = styled.img`
  background-color: #ffffff;

  margin-bottom: 5rem;

  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.46);
  border-radius: 0.25rem;

  width: 80%;
  height: auto;
`;

const ContentWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  @media ${Device.mobileL} {
    font-size: 0.875rem;

    margin-bottom: 3.175rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;

  font-size: 2.25rem;

  margin-bottom: 15rem;

  @media ${Device.mobileL} {
    font-size: 1rem;
  }

  div {
    flex-direction: column;
    align-items: center;

    p {
      margin: 0;
      margin-bottom: 2.4rem;

      text-align: center;

      @media ${Device.mobileL} {
        margin-bottom: 0.9rem;
      }
    }
  }

  button {
    width: 15rem;
    height: 4rem;

    box-shadow: 0 21px 30px 0 rgba(95, 95, 95, 0.4);

    border-radius: 2rem;

    background-color: #000000;

    color: #ffffff;
    font-family: 'Nanum Myeongjo';
    font-size: 1.5rem;

    cursor: pointer;

    outline: none;
    border: none;
    padding: none;

    @media ${Device.mobileL} {
      width: 9.3125rem;
      height: 2.25rem;

      font-size: 0.875rem;
    }
  }

  input {
    display: none;
  }

  label {
    width: 15rem;
    height: 4rem;

    box-shadow: 0 21px 30px 0 rgba(95, 95, 95, 0.4);

    border-radius: 2rem;

    background-color: #000000;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #ffffff;
    font-family: 'Nanum Myeongjo';
    font-size: 1.5rem;

    cursor: pointer;

    outline: none;
    border: none;
    padding: none;

    @media ${Device.mobileL} {
      width: 9.3125rem;
      height: 2.25rem;

      font-size: 0.875rem;
    }
  }
`;

const SponsorWrapper = styled.div`
  width: 90%;
  background-color: #000000;
  color: #ffffff;
  font-family: 'Opne Sans';
  padding-bottom: 2rem;

  box-shadow: 0 10px 15px 0 rgba(101, 101, 101, 0.66);
  border-radius: 0.25rem;

  margin-bottom: 15rem;
`;

const SponsorSeparator = styled.div`
  margin-left: 5%;
`;

const Sponsors = styled.div`
  width: 100%;

  display: flex;

  div {
    width: 33%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    img {
      margin-bottom: 3rem;

      cursor: pointer;

      transition: 0.1s ease-in-out;

      :hover {
        opacity: 1;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
      }
    }
  }
`;

const SponsorTitle = styled.div`
  font-family: inherit;
  font-size: 2.25rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 3rem;

  @media ${Device.tabletL} {
    font-size: 1.5rem;
  }
  @media ${Device.mobileL} {
    font-size: 1.125rem;
    margin-bottom: 2.31rem;
  }
`;

const EasysPubImg = styled.img`
  width: 9.25rem;
  height: 2.25rem;
`;

const EbrainImg = styled.img`
  width: 7.25rem;
  height: 3.25rem;
`;

const ListWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 3rem;
    font-family: 'yg-jalnan';

    margin: 0;
    margin-bottom: 5rem;
  }

  margin-bottom: 15rem;
`;

const ListSeparator = styled.div`
  width: 80%;
  height: 4rem;

  background-color: #ffffff;

  display: flex;

  div {
    width: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #000000;

    font-family: 'Open Sans';
    font-weight: bold;
    font-size: 2rem;
  }
`;

const List = styled.div`
  width: 80%;

  display: flex;
`;

const ListLine = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;
`;

const HTMainComponent: React.FC<
  HTMainMethod & HTMainProps & RouteComponentProps
> = ({ userName, accessToken, history }) => {
  return (
    <>
      <Wrapper>
        <HTVideoComponent />
        <ListWrapper>
          <p>쉬어가는 참가자들</p>
          <ListSeparator>
            <div>생활 부문</div>
            <div>게임 부문</div>
          </ListSeparator>
          <List>
            <div />
            <div />
          </List>
        </ListWrapper>
        <ContentWrapper>
          <SponsorWrapper>
            <SponsorSeparator>
              <SponsorTitle>쉬어가는 스폰서</SponsorTitle>
              <Sponsors>
                <div>
                  <img
                    src={Logos.Gudak}
                    alt="Gudak Logo"
                    onClick={() => window.open('https://www.screw-bar.com/')}
                  />
                  <img
                    src={Logos.Insight}
                    alt="Insight Logo"
                    onClick={() =>
                      window.open('https://blog.insightbook.co.kr/')
                    }
                  />
                  <img
                    src={Logos.Maso}
                    alt="Maso Logo"
                    onClick={() => window.open('https://www.imaso.co.kr/')}
                  />
                </div>
                <div>
                  <img
                    src={Logos.Goorm}
                    alt="Goorm Logo"
                    onClick={() => window.open('https://www.goorm.io/')}
                  />
                  <img
                    src={Logos.Jpub}
                    alt="Jpub Logo"
                    onClick={() => window.open('https://jpub.tistory.com/')}
                  />
                  <img
                    src={Logos.Unity}
                    alt="Unity Logo"
                    onClick={() => window.open('https://unity.com/kr')}
                  />
                </div>
                <div>
                  <EbrainImg
                    src={Logos.Ebrain}
                    alt="Ebrain Logo"
                    onClick={() => window.open('http://www.ebrain.kr/')}
                  />
                  <img
                    src={Logos.Laftel}
                    alt="Laftel Logo"
                    onClick={() => window.open('https://laftel.net/')}
                  />
                  <EasysPubImg
                    src={Logos.Easyspub}
                    alt="EasysPub Logo"
                    onClick={() =>
                      window.open('http://www.easyspub.co.kr/Main/pub')
                    }
                  />
                </div>
              </Sponsors>
            </SponsorSeparator>
          </SponsorWrapper>
          <GroupImg src={GroupPicture} alt="group picture" />
          <ButtonWrapper>
            <div>
              <p>사진 보고 가세요!</p>
              <button onClick={() => alert('사진 링크')}>눌러보게</button>
            </div>
          </ButtonWrapper>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default HTMainComponent;
