import * as React from 'react';

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
import HTDetailViewModalComponent from './detailView';
import HTRequestModalComponent from './request';

const { useState, useEffect } = React;

export const ModalBox = styled.div`
  width: 27.5rem;
  max-width: 27.5rem;
  min-height: 19.2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: fixed;

  background-color: #ffffff;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.2);

  border-radius: 0.5rem;

  @media ${Device.mobileL} {
    width: 18.875rem;
    height: 17.75rem;
  }
`;

export const ContentWrapper = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
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

export const Form = styled.div`
  width: 100%;

  font-family: 'Open Sans';

  margin-top: 1.125rem;

  p {
    font-family: inherit;
    font-weight: bold;
    font-size: 1rem;

    margin: 0;
    margin-bottom: 0.5rem;

    white-space: nowrap;
    text-overflow: ellipsis;

    @media ${Device.mobileL} {
      font-size: 13px;
    }
  }

  button {
    width: 7.5rem;
    height: 2rem;

    border-radius: 1rem;

    background-color: #000000;

    margin-top: 25px;

    cursor: pointer;

    color: #ffffff;
    font-family: 'Open Sans';
    font-weight: bold;
    font-size: 13px;

    @media ${Device.mobileL} {
      width: 5rem;
      height: 1.75rem;

      margin-top: 0.625rem;
    }
  }

  textarea {
    resize: none;

    width: 100%;
    height: 8.125rem;
    border-radius: 0.5rem;
    border: solid 1px #e9e9e9;
    background-color: #ffffff;

    font-family: 'Open Sans';
    font-size: 13px;

    @media ${Device.mobileL} {
      height: 10rem;
    }
  }
`;

export interface ModalProps {
  accessToken: string;
  teamPk: number;
  errMessage: string;

  deem(payload: boolean): void;
  modal(payload: ModalTypes): void;
  resetStatus(): void;
}

const HTModalComponent: React.FC<HTModalProps & HTModalMethod> = ({
  modalType,
  accessToken,
  deem,
  modal,
  teamPk,
  resetStatus,
  errMessage,
  postMentorRequest,
  postMentorRequestStatus,
  mentorPk,
  mentorRequestList,
  patchMentorRequest,
  patchMentorRequestStatus,
  teams,
  team,
  reqPk,
}) => {
  if (modalType === 'request') {
    return (
      <HTRequestModalComponent
        accessToken={accessToken}
        teamPk={teamPk}
        errMessage={errMessage}
        deem={deem}
        modal={modal}
        resetStatus={resetStatus}
        postMentorRequest={postMentorRequest}
        mentorPk={mentorPk}
        postMentorRequestStatus={postMentorRequestStatus}
      />
    );
  } else if (modalType === 'detail-view') {
    return (
      <HTDetailViewModalComponent
        patchMentorRequest={patchMentorRequest}
        patchMentorRequestStatus={patchMentorRequestStatus}
        accessToken={accessToken}
        teamPk={teamPk}
        errMessage={errMessage}
        deem={deem}
        modal={modal}
        reqPk={reqPk}
        resetStatus={resetStatus}
        mentorRequestList={mentorRequestList}
      />
    );
  } else {
    return <></>;
  }
};

export default HTModalComponent;
