import * as React from 'react';

import HTCurrentContainer from 'container/hanseithon/current';
import { HTModalMethod, HTModalProps } from 'container/hanseithon/modal';
import { Device } from 'lib/styles';
import {
  CategoryType,
  JobType,
  ModalTypes,
  PostTeamMatchParams,
  PostTeamParams,
  PutTeamParams,
} from 'store';
import styled from 'styled-components';
import CreateTeamModal from './create';
import CreateSuccessModal from './create/create-success';
import JoinTeamModal from './join';
import JoinSuccessModal from './join/join-success';
import MatchTeamModal from './match';

const { useState, useEffect } = React;

export const TeamForm = styled.form`
  width: 100%;

  font-family: 'Noto Sans KR';

  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;

    font-family: inherit;
    font-size: 1rem;
    font-weight: bold;

    margin-top: 1.25rem;

    @media ${Device.tabletL} {
      margin-top: 1.575rem;
    }

    select {
      width: 5.375rem;
      height: 1.9375rem;

      background-color: #ffffff;
      border-radius: 0;
      border-radius: 4px;
      border: solid 1px #707070;

      font-family: inherit;
      font-size: 0.875rem;

      @media ${Device.tabletL} {
        height: 1.6875rem;
      }
    }
  }

  input {
    border: none;
    border-top: solid 1px #e9e9e9;
    border-bottom: solid 1px #e9e9e9;

    height: 1.9375rem;

    font-family: inherit;
    font-size: 0.875rem;

    background-color: #ffffff;

    @media ${Device.tabletL} {
      height: 1.6875rem;
    }
  }

  textarea {
    border: none;
    border-top: solid 1px #e9e9e9;
    border-bottom: solid 1px #e9e9e9;

    height: 1.9375rem;

    resize: none;

    font-family: inherit;
    font-size: 0.875rem;

    background-color: #ffffff;

    @media ${Device.tabletL} {
      height: 1.6875rem;
    }
  }

  span {
    font-size: 0.8125rem;
    color: #ff0000;
    font-family: 'Open Sans';
  }

  button {
    width: 7.5rem;
    height: 2rem;

    align-self: flex-end;

    font-family: 'Open Sans';
    font-size: 0.8125rem;

    background-color: #000000;

    color: #ffffff;

    border-radius: 1rem;

    margin-top: 3.25rem;

    @media ${Device.tabletL} {
      width: 5rem;
      height: 1.75rem;

      margin-top: 1.25rem;

      font-size: 11px;
      font-weight: bold;
    }
  }
`;

export const TeamBox = styled.div`
  width: 27.5rem;
  height: 21rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  background-color: #ffffff;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.2);

  border-radius: 0.5rem;

  max-width: 27.5rem;

  @media ${Device.mobileL} {
    width: 18.875rem;
    height: 21.125rem;
  }
`;

export const TeamWrapper = styled.div`
  width: 90%;
  height: 90%;

  display: flex;
  flex-direction: column;
`;

const CurrentBox = styled.div`
  width: 85%;
  max-height: 36rem;

  display: flex;
  justify-content: center;

  position: absolute;

  top: 10%;

  background-color: #ffffff;

  overflow-y: scroll;
`;

export const TitleWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  font-family: 'Noto Sans KR';

  div {
    font-family: inherit;
    font-size: 1.25rem;
    font-weight: bold;
  }

  span {
    font-family: inherit;
    font-size: 0.875rem;
  }
`;

export const XButton = styled.span<{ current?: boolean }>`
  position: absolute;
  right: -0.5rem;
  top: ${props => (props.current ? '0.5rem' : '-2.5rem')};
  width: 32px;
  height: 32px;
  cursor: pointer;

  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }

  &::before,
  &::after {
    position: absolute;
    content: ' ';
    height: 32px;
    width: 2px;
    border-radius: 1.25rem;
    background-color: ${props => (props.current ? '#000000' : '#ffffff')};

    @media ${Device.tabletS} {
      height: 26px;
    }
  }

  z-index: 20;
`;

export interface DataType {
  job: JobType;
  category: CategoryType;
}

export interface ModalProps {
  data: DataType;
  accessToken: string;
  teamPk: number;
  errMessage: string;

  putTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  postTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  postMatchTeamStatus: 'none' | 'pending' | 'success' | 'failure';

  changeSelect(e: React.ChangeEvent<HTMLSelectElement>): void;
  postTeam(payload: PostTeamParams): void;
  putTeam(payload: PutTeamParams): void;
  postTeamMatch(payload: PostTeamMatchParams): void;
  deem(payload: boolean): void;
  modal(payload: ModalTypes): void;
  resetStatus(): void;
}

const HTModalComponent: React.FC<HTModalProps & HTModalMethod> = ({
  modalType,
  postTeam,
  putTeam,
  postTeamMatch,
  accessToken,
  deem,
  modal,
  teamPk,
  postTeamMatchStatus,
  postTeamStatus,
  putTeamStatus,
  resetStatus,
  errMessage,
  teams,
  team,
}) => {
  const [data, setData] = useState<DataType>({
    job: '기획',
    category: 'l',
  });

  const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;

    setData({
      ...data,
      [name]: value,
    });
  };

  if (modalType === 'create') {
    return (
      <CreateTeamModal
        modal={modal}
        deem={deem}
        data={data}
        changeSelect={changeSelect}
        postTeam={postTeam}
        putTeam={putTeam}
        postTeamMatch={postTeamMatch}
        accessToken={accessToken}
        teamPk={teamPk}
        resetStatus={resetStatus}
        postMatchTeamStatus={postTeamMatchStatus}
        putTeamStatus={putTeamStatus}
        postTeamStatus={postTeamStatus}
        errMessage={errMessage}
      />
    );
  } else if (modalType === 'join') {
    return (
      <JoinTeamModal
        modal={modal}
        deem={deem}
        data={data}
        changeSelect={changeSelect}
        postTeam={postTeam}
        putTeam={putTeam}
        postTeamMatch={postTeamMatch}
        accessToken={accessToken}
        teamPk={teamPk}
        resetStatus={resetStatus}
        postMatchTeamStatus={postTeamMatchStatus}
        putTeamStatus={putTeamStatus}
        postTeamStatus={postTeamStatus}
        errMessage={errMessage}
      />
    );
  } else if (modalType === 'match') {
    return (
      <MatchTeamModal
        modal={modal}
        deem={deem}
        data={data}
        changeSelect={changeSelect}
        postTeam={postTeam}
        putTeam={putTeam}
        postTeamMatch={postTeamMatch}
        accessToken={accessToken}
        teamPk={teamPk}
        resetStatus={resetStatus}
        postMatchTeamStatus={postTeamMatchStatus}
        putTeamStatus={putTeamStatus}
        postTeamStatus={postTeamStatus}
        errMessage={errMessage}
      />
    );
  } else if (modalType === 'join-success') {
    return (
      <JoinSuccessModal
        teamName={team.name}
        resetStatus={resetStatus}
        deem={deem}
        modal={modal}
      />
    );
  } else if (modalType === 'create-success') {
    return (
      <CreateSuccessModal
        teamName={teams[teams.length - 1].name}
        code={teams[teams.length - 1].code}
        resetStatus={resetStatus}
        deem={deem}
        modal={modal}
      />
    );
  } else if (modalType === 'current') {
    return (
      <CurrentBox>
        <XButton
          onClick={() => {
            deem(false);
            modal('none');
          }}
          current={true}
        />
        <HTCurrentContainer isModal={true} />
      </CurrentBox>
    );
  } else {
    return <></>;
  }
};

export default HTModalComponent;
