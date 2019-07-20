import * as React from 'react';

import { Deem } from 'components/hanseithon';
import { HTJoinMethod, HTJoinProps } from 'container/hanseithon/join';
import { Device } from 'lib/styles';
import CreateBackImg from 'lib/svg/create-team-back.svg';
import CreateTeamBtnImg from 'lib/svg/create-team-btn.svg';
import JoinTeamImg from 'lib/svg/join-team.svg';
import MatchTeamImg from 'lib/svg/match-team.svg';
import moment from 'moment';
import 'moment/locale/ko';
import HTModalPage from 'pages/hanseithon/modal';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 54%;

  display: flex;
  align-items: center;
  justify-content: center;

  @media ${Device.mobileL} {
    flex-direction: column;
    justify-content: unset;
  }
`;

const CreateBtn = styled.button`
  position: relative;
  color: #ffffff;

  background-color: #bdbdbd;
  background-image: url(${CreateBackImg});
  background-size: cover;

  span {
    position: absolute;
    top: 1.625rem;
  }

  @media ${Device.mobileL} {
    margin-top: 2.25rem;
  }
`;

const CreateBtnImg = styled.img`
  margin-top: 8rem;
  margin-bottom: 5.825rem;

  @media ${Device.tabletL} {
    margin: auto;

    width: 1.5rem;
    height: 1.5rem;
  }
`;

const CommonBtn = styled.button<{ last: boolean }>`
  position: relative;
  background-color: #ffffff;

  @media ${Device.mobileL} {
    margin-top: 2rem;
    margin-bottom: ${props => (props.last ? '3.125rem' : '')};
  }

  span {
    position: absolute;
    top: 1.625rem;
  }
`;

const Form = styled.div`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${Device.desktop} {
    top: 16.75rem;
  }

  @media ${Device.laptop} {
    top: 9.5rem;
  }

  @media ${Device.mobileL} {
    position: initial;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  button {
    width: 19.5rem;
    height: 26.625rem;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.08);
    border-radius: 0.25rem;
    outline: none;
    border: none;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-right: 1.5rem;
    margin-left: 1.5rem;

    font-family: 'yg-jalnan';
    font-size: 1.75rem;

    @media ${Device.tabletL} {
      font-size: 14px;
      width: 12.5rem;
      height: 16rem;
    }

    @media ${Device.mobileL} {
      width: 10.625rem;
      height: 13.625rem;
      font-size: 0.875rem;

      margin-right: unset;
      margin-left: unset;
    }
  }
`;

const JoinTeam = styled.img`
  margin-top: 4rem;
  width: 14.5rem;

  @media ${Device.tabletL} {
    height: 53%;
    width: unset;

    margin-top: 1.5rem;
  }
`;

const MatchTeam = styled.img`
  margin-top: 5.25rem;
  width: 15.5rem;

  @media ${Device.tabletL} {
    width: unset;
    height: 49%;

    margin-top: 2.5rem;
  }
`;

const JoinComponent: React.FC<
  HTJoinProps & HTJoinMethod & RouteComponentProps
> = ({ modal, modalType, deem, deemStatus, agreeStatus, history }) => {
  React.useEffect(() => {
    if (!agreeStatus) {
      history.push('/hanseithon');
    }
  }, []);

  return (
    <>
      {modalType !== 'none' && <HTModalPage />}
      <Wrapper>
        <Form>
          <CreateBtn
            onClick={() => {
              modal('create');
              deem(true);
            }}
          >
            <span>팀 생성</span>
            <CreateBtnImg src={CreateTeamBtnImg} alt="create button" />
          </CreateBtn>
          <CommonBtn
            last={false}
            onClick={() => {
              modal('current');
              deem(true);
            }}
          >
            <span>팀 참가</span>
            <JoinTeam src={JoinTeamImg} alt="join team" />
          </CommonBtn>
          <CommonBtn
            last={true}
            onClick={() => {
              modal('match');
              deem(true);
            }}
          >
            <span>팀 매칭</span>
            <MatchTeam src={MatchTeamImg} alt="match team" />
          </CommonBtn>
        </Form>
      </Wrapper>
    </>
  );
};

export default JoinComponent;
