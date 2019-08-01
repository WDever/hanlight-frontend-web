import * as React from 'react';

import { HTMainMethod, HTMainProps } from 'container/hanseithon/main';
import logos from 'lib/sponsor/logos.svg';
import { Device } from 'lib/styles';
import BackgroundImg from 'lib/svg/ht-background.svg';
import TimetableBackgroundImg from 'lib/svg/timetable-background.svg';
import HTModalPage from 'pages/hanseithon/modal';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import HTMentoringListComponent from './mentorList';
import HTRequestList from './requestList';
import HTTimerComponent from './timer';

const { useState, useEffect } = React;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
`;

const Background = styled.img`
  width: 102.5%;

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

const ContentWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  margin-bottom: 7.6rem;

  @media ${Device.mobileL} {
    font-size: 0.875rem;

    margin-bottom: 3.175rem;
  }
`;

const UserWrapper = styled.div`
  font-size: 2.25rem;

  text-align: center;

  margin-bottom: 5.75rem;

  @media ${Device.mobileL} {
    font-size: 0.875rem;

    margin-bottom: 0;
  }

  p {
    margin: 0;
    margin-bottom: 1.125rem;

    @media ${Device.mobileL} {
      margin-bottom: 0.375rem;
    }
  }

  span {
    color: #4470ff;
    font-family: 'yg-jalnan';
  }
`;

const ButtonWrapper = styled.div`
  display: flex;

  font-size: 2.25rem;

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

const MentorWrapper = styled.div`
  display: flex;
`;

const SubmitWrapper = styled.div`
  display: flex;

  margin-left: 8rem;

  @media ${Device.mobileL} {
    display: none;
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

const TimetableBackground = styled.img`
  position: absolute;
  z-index: -1;

  @media ${Device.mobileL} {
    display: none;
  }
`;

const TimetableOverTitle = styled.p`
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
    display: none;
  }
`;

const TimetableUnderTitle = styled.div`
  display: none;
  @media ${Device.mobileL} {
    width: 100%;

    font-size: 1.25rem;
    font-family: 'Open Sans';
    font-weight: bold;

    padding: 1rem 0 1rem 1.25rem;

    display: initial;
  }
`;

const TimetableWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  margin-bottom: 16.425rem;

  @media ${Device.mobileL} {
    margin-bottom: 1.75rem;
  }
`;

const TimetableBtnWrapper = styled.div`
  width: 51.46%;
  height: 3.73rem;

  @media ${Device.tabletL} {
    height: 2.71rem;
  }
  @media ${Device.mobileL} {
    height: 2.25rem;

    width: 100%;
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

  background-color: #ffffff;

  @media ${Device.mobileL} {
    width: 100%;
  }

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

const HTMainComponent: React.FC<
  HTMainMethod & HTMainProps & RouteComponentProps
> = ({
  userName,
  getHtUser,
  htUserType,
  modal,
  deem,
  modalType,
  accessToken,
  userTeam,
  mentorList,
  mentorRequestList,
  getMentor,
  getMentorRequest,
  getMentorRequestStatus,
  getMentorStatus,
  errMessage,
  setMentorPk,
  setTeamPk,
  teamPk,
  patchMentorRequest,
  reqPk,
  setReqPk,
  resetStatus,
  history,
}) => {
  const [rightTableToggle, setRightTableToggle] = useState<boolean>(false);

  const openSubmitModal = () => {
    deem(true);
    modal('submit');
  };

  const submit = () =>
    htUserType === 'attendee'
      ? openSubmitModal()
      : htUserType === 'mentor'
      ? history.push('/hanseithon/comment')
      : alert('참가자만 가능한 기능입니다.');

  return (
    <>
      {modalType !== 'none' && <HTModalPage />}
      <Background src={BackgroundImg} alt="Background" />
      <Wrapper>
        <TitleWrapper>
          <span>한세톤 마감까지</span>
        </TitleWrapper>
        <HTTimerComponent />
        <ContentWrapper>
          <UserWrapper>
            {htUserType === 'attendee' && <p>{userName}님의 팀은</p>}
            {userTeam !== null && (
              <p>
                <span>{userTeam}</span> 입니다
              </p>
            )}
          </UserWrapper>
          <ButtonWrapper>
            <div>
              <p>
                {htUserType === 'mentor' ? '코멘트 달래요?' : '제출 할래요?'}
              </p>
              <button onClick={submit}>눌러보게</button>
            </div>
          </ButtonWrapper>
        </ContentWrapper>
        {htUserType !== 'mentor' ? (
          <HTMentoringListComponent
            htUserType={htUserType}
            deem={deem}
            modal={modal}
            mentorList={mentorList}
            getMentor={getMentor}
            accessToken={accessToken}
            errMessage={errMessage}
            getMentorStatus={getMentorStatus}
            setMentorPk={setMentorPk}
          />
        ) : (
          <HTRequestList
            accessToken={accessToken}
            getMentorRequest={getMentorRequest}
            setReqPk={setReqPk}
            teamPk={teamPk}
            patchMentorRequest={patchMentorRequest}
            modal={modal}
            deem={deem}
            getMentorRequestStatus={getMentorRequestStatus}
            errMessage={errMessage}
            mentorRequestList={mentorRequestList}
          />
        )}
        <TimetableWrapper>
          <TimetableBackground
            src={TimetableBackgroundImg}
            alt="timetable background"
          />
          <TimetableOverTitle>타임 테이블</TimetableOverTitle>
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
          <TimetableUnderTitle>TIME TABLE</TimetableUnderTitle>
          <Timetable>
            <colgroup>
              <DateCol />
              <ContentCol />
            </colgroup>
            {!rightTableToggle ? (
              <>
                <tr>
                  <td>15:00 ~ 15:30</td>
                  <td>참가자 입장 및 등록</td>
                </tr>
                <tr>
                  <td>15:30 ~ 16:00</td>
                  <td>키노트</td>
                </tr>
                <tr>
                  <td>16:00 ~ 18:00</td>
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
