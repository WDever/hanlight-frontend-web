import * as React from 'react';

import TitleMainImg from 'lib/svg/hanseithon-main-title.svg';
import AcceptPage from 'pages/hanseithon/main/acceptPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, DEEM_BOARD, DeemBoard } from 'store';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 88%;
  height: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  font-family: 'Nanum Myeongjo';
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2.25rem 0;
`;

const TitleImg = styled.img``;

const Title = styled.span`
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  letter-spacing: normal;
`;

const ContentWrapper = styled.div`
  font-family: 'Noto Sans KR';
  width: 100%;

  display: flex;
  flex-direction: column;
  margin-bottom: 4.375rem;
`;

const ContentTitleWrapper = styled.span`
  font-family: inherit;

  width: 100%;
  display: flex;
  flex-direction: column;

  b {
    font-family: inherit;
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 3px;
  }

  span {
    font-family: inherit;
    font-size: 0.75rem;
  }
`;

const Content = styled.span`
  font-family: inherit;
  font-size: 0.625rem;
  line-height: 1.5;
  margin-top: 1.5rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 1.5rem;

  button {
    width: 7.5rem;
    height: 2.25rem;
    border-radius: 63px;
    background-color: #000000;
    color: #ffffff;
    font-size: 0.6875rem;
    font-family: 'Opne Sans';
    outline: none;
    border: none;
    cursor: pointer;
  }
`;

const Exaplain = styled.span`
  font-family: 'Opne Sans';
  font-size: 0.625rem;
  margin-top: 0.5rem;
`;

const SponsorWrapper = styled.div`
  width: 100%;
  height: 15.375rem;
  background-color: #000000;
  color: #ffffff;
  font-family: 'Opne Sans';
  display: flex;
  justify-content: center;
`;

const SponsorSeparator = styled.div`
  width: 88%;
`;

const Sponsors = styled.div`
  height: 6.3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  font-size: 1.125rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 3.125rem;
`;

const HTMainComponent: React.FC = () => {
  const dispatch = useDispatch();
  const deemBoardStatus = useSelector<AppState, boolean>(
    state => state.board.deemBoardStatus,
  );

  return (
    <>
      {deemBoardStatus && <AcceptPage />}
      <Wrapper>
        <TitleWrapper>
          <TitleImg src={TitleMainImg} alt="Main Title" />
          <Title>오빠, 쉬면서 하자</Title>
        </TitleWrapper>
        <ContentWrapper>
          <ContentTitleWrapper>
            <b>쉬어가는 한세톤 : 休</b>
            <span>Hansei thon : 休</span>
          </ContentTitleWrapper>
          <Content>
            안녕하세요, 한세사이버보안고등학교 주관 " 한세톤 : 休 "의
            페이지입니다. 한세톤의 참가 신청 및 한세톤 정보는 모두 이 페이지에서
            보실 수 있습니다. 마음이 잘 맞는 팀원들을 모집하여 보다 멋진 작품을
            선보여주세요. 개인적으로 저는 여름에는 팥빙수가 제일 맛있다고
            생각합니다 팥빙수는 특히 엔젤리너스의 팥빙수가 엄청나게 맛있더라구요
            꿀팁입니다. 감사합니다.
          </Content>
          <ButtonWrapper>
            <button
              style={{ marginRight: '1.25rem' }}
              onClick={() =>
                dispatch<DeemBoard>({ type: DEEM_BOARD, payload: true })
              }
            >
              참가신청 해臝
            </button>
            <button>참가현황 봐臝</button>
          </ButtonWrapper>
          <Exaplain>臝(라) : 자유와 해방을 뜻함</Exaplain>
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
