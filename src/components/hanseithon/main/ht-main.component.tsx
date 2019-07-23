import * as React from 'react';

import logos from 'lib/sponsor/logos.svg';
import { Device } from 'lib/styles';
import BackgroundImg from 'lib/svg/ht-background.svg';
import styled from 'styled-components';
import HTMentoringListComponent from './mentorList';
import HTTimerComponent from './timer';

const { useState } = React;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const Background = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: -1;

  object-fit: cover;
`;

const TitleWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  padding-top: 16.75rem;
  margin-bottom: 1.125rem;

  @media ${Device.laptop} {
    padding-top: 8.375rem;
  }

  span {
    font-size: 3.5rem;
    color: #ffffff;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  left: 24%;

  display: flex;
  flex-direction: column;

  width: 44.725rem;

  margin-bottom: 11.275rem;
`;

const UserWrapper = styled.div`
  font-size: 2.25rem;

  margin-bottom: 11rem;

  @media ${Device.laptop} {
    margin-bottom: 5.5rem;
  }

  p {
    margin: 0;
    margin-bottom: 1.125rem;
  }

  span {
    color: #4470ff;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  font-size: 2.25rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 0;
      margin-bottom: 2.4rem;
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
  }
`;

const SponsorWrapper = styled.div`
  width: 100%;
  background-color: #000000;
  color: #ffffff;
  font-family: 'Opne Sans';
  padding-bottom: 2rem;
`;

const SponsorSeparator = styled.div`
  margin-left: 5%;
`;

const Sponsors = styled.div`
  width: 100%;
  display: flex;

  img {
    width: 100%;
    max-width: fit-content;
  }
`;

const SponsorTitle = styled.div`
  font-family: inherit;
  font-size: 1.875rem;
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

const TimetableTitle = styled.p`
  font-size: 2.25rem;
  font-family: 'yg-jalnan';
  margin: 0;
  margin-bottom: 2.275rem;

  display: flex;
  justify-content: center;

  @media ${Device.tabletL} {
    margin-left: 5%;
  }
  @media ${Device.mobileL} {
    font-size: 1.25rem;
    margin-left: 5%;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const TimetableWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 16.425rem;
`;

const TimetableBtnWrapper = styled.div`
  width: 51.46%;
  height: 3.73rem;

  @media ${Device.tabletL} {
    height: 2.71rem;
  }
  @media ${Device.mobileL} {
    height: 2.25rem;
  }
`;

const TimetableBtn = styled.button<{ clicked: boolean }>`
  width: 50%;
  height: 100%;
  border: solid 1px #e8e8e8;
  background-color: ${({ clicked }) => (clicked ? '#000000' : '#ffffff')};
  font-size: 1.18rem;
  font-family: 'Open Sans';
  font-weight: bold;
  color: ${({ clicked }) => (clicked ? '#ffffff' : '#000000')};
  cursor: pointer;

  @media ${Device.mobileL} {
    font-size: 0.8125rem;
  }
`;

const Timetable = styled.table`
  width: 51.46%;
  font-size: 1.18rem;
  font-weight: bold;
  border-collapse: collapse;
  border-spacing: 0;

  tr {
    width: 100%;
    height: 3.96rem;
    border: solid 1px #e8e8e8;
    font-family: 'Open Sans';
    text-align: center;

    @media ${Device.tabletL} {
      height: 3.1rem;
    }
    @media ${Device.mobileL} {
      height: 2.25rem;
    }

    td {
      border: solid 1px #e8e8e8;
    }
  }

  @media ${Device.tabletL} {
    font-size: 1.06rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.69rem;
  }
`;

const DateCol = styled.col`
  width: 35%;
`;

const ContentCol = styled.col`
  width: 65%;
`;

const HTMainComponent: React.FC = () => {
  const [rightTableToggle, setRightTableToggle] = useState<boolean>(
    false,
  );

  return (
    <>
      <Background src={BackgroundImg} alt="Background" />
      <Wrapper>
        <TitleWrapper>
          <span>한세톤 마감까지</span>
        </TitleWrapper>
        <HTTimerComponent />
        <ContentWrapper>
          <UserWrapper>
            {/* <p>{user.name}님의 팀은</p>
          <p>{user.team} 입니다</p> */}
            <p>최민규님의 팀은</p>
            <p>
              <span>노예들</span> 입니다
            </p>
          </UserWrapper>
          <ButtonWrapper>
            <div>
              <p>멘토링을 신청하세요!</p>
              <button>눌러보게</button>
            </div>
            <div>
              <p>제출 할래요?</p>
              <button>눌러보게</button>
            </div>
          </ButtonWrapper>
        </ContentWrapper>
        <HTMentoringListComponent />
        <TimetableWrapper>
          <TimetableTitle>타임 테이블</TimetableTitle>
          <TimetableBtnWrapper>
            <TimetableBtn
              clicked={!rightTableToggle}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setRightTableToggle(false);
              }}
            >
              7월 25일 (목)
            </TimetableBtn>
            <TimetableBtn
              clicked={rightTableToggle}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setRightTableToggle(true);
              }}
            >
              7월 26일 (금)
            </TimetableBtn>
          </TimetableBtnWrapper>
          <Timetable>
            <colgroup>
              <DateCol />
              <ContentCol />
            </colgroup>
            {!rightTableToggle ? (
              <>
                <tr>
                  <td>16:30 ~ 17:00</td>
                  <td>참가자 입장 및 등록</td>
                </tr>
                <tr>
                  <td>17:00 ~ 17:30</td>
                  <td>키노트</td>
                </tr>
                <tr>
                  <td>17:30 ~ 18:00</td>
                  <td>자율 개발</td>
                </tr>
                <tr>
                  <td>18:00 ~ 19:00</td>
                  <td>저녁 식사</td>
                </tr>
                <tr>
                  <td>19:00 ~ 19:30</td>
                  <td>이벤트 타임</td>
                </tr>
                <tr>
                  <td>19:30 ~ 20:30</td>
                  <td>자율 개발</td>
                </tr>
                <tr>
                  <td>20:30 ~ 21:00</td>
                  <td>멘토단 오리엔테이션</td>
                </tr>
                <tr>
                  <td>21:00 ~ 23:00</td>
                  <td>순차 멘토링</td>
                </tr>
                <tr>
                  <td>23:00 ~ 24:00</td>
                  <td>야식</td>
                </tr>
                <tr>
                  <td>24:00 ~</td>
                  <td>자율 개발</td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>07:30 ~ 08:00</td>
                  <td>아침 식사</td>
                </tr>
                <tr>
                  <td>08:00 ~ 10:00</td>
                  <td>자율 개발</td>
                </tr>
                <tr>
                  <td>10:00 ~ 10:30</td>
                  <td>이벤트 타임</td>
                </tr>
                <tr>
                  <td>10:30 ~ 12:00</td>
                  <td>자율 개발</td>
                </tr>
                <tr>
                  <td>12:00 ~ 13:00</td>
                  <td>점심 식사</td>
                </tr>
                <tr>
                  <td>13:00 ~ 13:30</td>
                  <td>이벤트 타임</td>
                </tr>
                <tr>
                  <td>13:30 ~ 14:30</td>
                  <td>자율 개발</td>
                </tr>
                <tr>
                  <td>14:30 ~ 15:00</td>
                  <td>파일 제출 및 발표 준비</td>
                </tr>
                <tr>
                  <td>15:00 ~ 18:00</td>
                  <td>발표 및 심사</td>
                </tr>
                <tr>
                  <td>18:00 ~ 18:30</td>
                  <td>시상</td>
                </tr>
              </>
            )}
          </Timetable>
        </TimetableWrapper>

        <SponsorWrapper>
          <SponsorSeparator>
            <SponsorTitle>쉬어가는 스폰서</SponsorTitle>
            <Sponsors>
              <img src={logos} alt="" />
            </Sponsors>
          </SponsorSeparator>
        </SponsorWrapper>
      </Wrapper>
    </>
  );
};

export default HTMainComponent;
