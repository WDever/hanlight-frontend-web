import * as React from 'react';

import { Device } from 'lib/styles';
import JoinTeamImg from 'lib/svg/join-team.svg';
import MatchTeamImg from 'lib/svg/match-team.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 54%;

  display: flex;
  align-items: center;
  justify-content: center;

  @media ${Device.tabletL} {
    width: 88%;
    flex-direction: column;
    justify-content: unset;
  }
`;

const CreateBtn = styled.button`
  color: #ffffff;
  background-color: #bdbdbd;

  @media ${Device.tabletL} {
    margin-top: 1.5rem;
  }
`;

const CommonBtn = styled.button<{ last: boolean }>`
  background-color: #ffffff;

  @media ${Device.tabletL} {
    margin-top: 2rem;
    margin-bottom: ${props => (props.last ? '3.125rem' : '')};
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

  @media ${Device.tabletL} {
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
    margin: 0 1.5rem;

    font-family: 'yg-jalnan';
    font-size: 1.75rem;

    @media ${Device.tabletL} {
      width: 10.625rem;
      height: 13.625rem;
      font-size: 0.875rem;
      margin: 10rem;
    }
  }
`;

const JoinTeam = styled.img`
  margin-top: 4rem;
  width: 14.5rem;

  @media ${Device.tabletL} {
    width: 8rem;
    height: 7.25rem;

    margin-top: 1.5rem;
  }
`;

const MatchTeam = styled.img`
  margin-top: 5.25rem;
  width: 15.5rem;

  @media ${Device.tabletL} {
    width: 7.2rem;
    height: 7rem;

    margin-top: 2.5rem;
  }
`;

const JoinComponent: React.FC = () => {
  return (
    <Wrapper>
      <Form>
        <CreateBtn>팀 생성</CreateBtn>
        <CommonBtn last={false}>
          팀 참가
          <JoinTeam src={JoinTeamImg} alt="join team" />
        </CommonBtn>
        <CommonBtn last={true}>
          팀 매칭
          <MatchTeam src={MatchTeamImg} alt="match team" />
        </CommonBtn>
      </Form>
    </Wrapper>
  );
};

export default JoinComponent;
