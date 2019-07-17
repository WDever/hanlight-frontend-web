import * as React from 'react';

import { HTMainMethod, HTMainProps } from 'container/hanseithon/main';
import { Device } from 'lib/styles';
import TitleMainImg from 'lib/svg/hanseithon-main-title.svg';
import AcceptPage from 'pages/hanseithon/main/acceptPage';
import { AppState, DEEM_BOARD, DeemBoard } from 'store';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 88%;
  height: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  font-family: 'Nanum Myeongjo';
  display: flex;
  align-items: center;
  margin: 2.25rem 0;

  @media ${Device.tabletL} {
    justify-content: space-between;
  }
`;

const TitleImg = styled.img`
  width: 20rem;

  @media ${Device.tabletL} {
    width: unset;
  }
`;

const Title = styled.span`
  font-family: inherit;
  font-size: 5.5rem;
  font-weight: bold;
  letter-spacing: normal;
  width: 36.25rem;
  word-break: keep-all;

  @media ${Device.tabletL} {
    font-size: 1.8rem;
    width: unset;
  }
`;

const ContentWrapper = styled.div`
  font-family: 'Noto Sans KR';
  width: 100%;

  display: flex;
  margin-bottom: 4.375rem;

  @media ${Device.tabletL} {
    flex-direction: column;
  }
`;

const ContentTitleWrapper = styled.span`
  font-family: inherit;
  width: 100%;
  display: flex;
  flex-direction: column;

  b {
    font-family: inherit;
    font-weight: bold;
    font-size: 2.5rem;
    margin-bottom: 3px;

    @media ${Device.tabletL} {
      font-size: 1.25rem;
    }
  }

  span {
    font-family: inherit;
    font-size: 1rem;

    @media ${Device.tabletL} {
      font-size: 0.75rem;
    }
  }
`;

const Content = styled.div`
  font-family: inherit;
  font-size: 15px;
  line-height: 1.5;
  margin-top: 1.5rem;
  width: 30rem;
  word-break: keep-all;
  line-height: 1.47;

  @media ${Device.tabletL} {
    width: unset;
    font-size: 0.625rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;

  @media ${Device.tabletL} {
    font-size: 0.6875rem;
    margin-left: unset;
  }

  button {
    width: 13rem;
    height: 4.375rem;
    border-radius: 63px;
    background-color: #000000;
    color: #ffffff;
    font-family: 'Opne Sans';
    font-size: 1.25rem;
    outline: none;
    border: none;
    cursor: pointer;

    @media ${Device.tabletL} {
      width: 7.5rem;
      height: 2.25rem;
      font-size: 0.6875rem;
    }
  }
`;

const Exaplain = styled.span`
  font-family: 'Opne Sans';
  font-size: 0.6875rem;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;

  @media ${Device.tabletL} {
    margin-top: 0.5rem;
    font-size: 0.625rem;
  }
`;

const SponsorWrapper = styled.div`
  width: 100%;
  background-color: #000000;
  height: 18.5rem;
  color: #ffffff;
  font-family: 'Opne Sans';
  display: flex;
  justify-content: center;

  @media ${Device.tabletL} {
    height: 15.375rem;
  }
`;

const SponsorSeparator = styled.div`
  width: 88%;
`;

const Sponsors = styled.div`
  height: 50%;
  width: 100%;
  display: flex;

  div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-right: 12rem;

    font-size: 1.25rem;

    @media ${Device.tabletL} {
      margin-right: 0;
      font-size: 11px;
    }

    @media ${Device.mobileL} {
      margin-right: 0;
    }
  }

  @media ${Device.tabletL} {
    height: 7rem;
  }

  @media ${Device.mobileL} {
    height: 6.3rem;
  }
`;

const SponsorInnerWrapper = styled.div`
  height: 100%;
  width: 33%;
  display: flex;
  justify-content: space-between;
`;

const SponsorTitle = styled.div`
  font-family: inherit;
  font-size: 1.875rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 3.125rem;

  @media ${Device.tabletL} {
    font-size: 1.125rem;
  }
`;

const LeftSeparator = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightSeparator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 9.1625rem;

  @media ${Device.tabletL} {
    margin-left: 0;
    margin-top: 1.5rem;
  }
`;

const HTMainComponent: React.FC<HTMainMethod & HTMainProps> = ({
  deem,
  deemStatus,
}) => {
  return (
    <>
      {deemStatus && <AcceptPage />}
      <Wrapper>
        <TitleWrapper>
          <TitleImg src={TitleMainImg} alt="Main Title" />
          <Title>오빠, 쉬면서 하자</Title>
        </TitleWrapper>
        <ContentWrapper>
          <LeftSeparator>
            <ContentTitleWrapper>
              <b>쉬어가는 한세톤 : 休</b>
              <span>Hansei thon : 休</span>
            </ContentTitleWrapper>
            <Content>
              안녕하세요, 한세사이버보안고등학교 주관 " 한세톤 : 休 "의
              페이지입니다. 한세톤의 참가 신청 및 한세톤 정보는 모두 이
              페이지에서 보실 수 있습니다. 마음이 잘 맞는 팀원들을 모집하여 보다
              멋진 작품을 선보여주세요. 개인적으로 저는 여름에는 팥빙수가 제일
              맛있다고 생각합니다 팥빙수는 특히 엔젤리너스의 팥빙수가 엄청나게
              맛있더라구요 꿀팁입니다. 감사합니다.
            </Content>
          </LeftSeparator>
          <RightSeparator>
            <ButtonWrapper>
              <button
                style={{ marginRight: '1.25rem' }}
                onClick={() => deem(true)}
              >
                참가신청 해臝
              </button>
              <button>참가현황 봐臝</button>
            </ButtonWrapper>
            <Exaplain>臝(라) : 자유와 해방을 뜻함</Exaplain>
          </RightSeparator>
        </ContentWrapper>
      </Wrapper>
      <SponsorWrapper>
        <SponsorSeparator>
          <SponsorTitle>쉬어가는 스폰서</SponsorTitle>
          <Sponsors>
            <div>
              <span>Gudak</span>
              <span>Insite</span>
              <span>Micro Software</span>
            </div>
            <div>
              <span>goorm</span>
              <span>J-pup</span>
              <span>Unity korea</span>
            </div>
            <div>
              <span />
              <span>Laftel</span>
              <span>easypublishing</span>
            </div>
          </Sponsors>
        </SponsorSeparator>
      </SponsorWrapper>
    </>
  );
};

export default HTMainComponent;
