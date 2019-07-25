import * as React from 'react';

import { Device } from 'lib/styles';
import { MentorRequestType, PatchMentorRequestParams } from 'store';
import styled from 'styled-components';
import {
  ContentWrapper,
  Form,
  ModalBox,
  ModalProps,
  TitleWrapper,
  XButton,
} from '../ht-modal.component';

const { useEffect, useState } = React;

const ButtonWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

const PointButton = styled.div`
  background-color: #ff476c;

  width: 7.5rem;
  height: 2rem;

  border-radius: 1rem;

  margin-top: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

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
`;

const Content = styled.div`
  width: 100%;
  height: 8.125rem;
  border-radius: 0.5rem;
  border: solid 1px #e9e9e9;
  background-color: #ffffff;

  @media ${Device.mobileL} {
    height: 10rem;
  }

  div {
    height: calc(100% - 0.5rem);

    line-height: 1.38;
    letter-spacing: -0.39px;
    word-break: keep-all;

    overflow: scroll;

    margin: 0.5rem;
  }
`;

interface OwnProps {
  mentorRequestList: MentorRequestType[];
  reqPk: number;

  patchMentorRequestStatus: 'none' | 'pending' | 'success' | 'failure';
  patchMentorRequest(payload: PatchMentorRequestParams): void;
}

const HTDetailViewModalComponent: React.FC<ModalProps & OwnProps> = ({
  deem,
  modal,
  mentorRequestList,
  accessToken,
  teamPk,
  reqPk,
  patchMentorRequest,
  patchMentorRequestStatus,
  errMessage,
}) => {
  const [item, setItem] = useState<MentorRequestType>({
    pk: 0,
    done: false,
    content: '',
    mentor_pk: 0,

    team: {
      pk: 0,
      name: '',
      leader_name: '',
      category: 'l',
      createdAt: '',
      updatedAt: '',
      code: 0,
    },
    team_pk: 0,
  });

  const close = () => {
    deem(false);
    modal('none');
  };

  const done = () => {
    patchMentorRequest({ accessToken, requestPk: item.pk });
  };

  useEffect(() => {
    const requestItem = mentorRequestList.find(item => item.pk === reqPk);

    if (requestItem) {
      setItem(requestItem);
    }
  }, []);

  useEffect(() => {
    if (patchMentorRequestStatus === 'failure') {
      alert(errMessage);
      deem(false);
      modal('none');
    } else if (patchMentorRequestStatus === 'success') {
      alert('멘토링을 완료하였습니다.');
      deem(false);
      modal('none');
    }
  });

  return (
    <ModalBox>
      <XButton onClick={close} />
      <ContentWrapper>
        <TitleWrapper>
          <div>쉬어가는 한세톤 : 休</div>
          <span>멘티 체크</span>
        </TitleWrapper>
        <Form>
          <p>{item.team.name}</p>
          <Content>
            <div>{item.content}</div>
          </Content>
          <ButtonWrapper>
            <button
              onClick={close}
              disabled={patchMentorRequestStatus === 'pending'}
            >
              닫기
            </button>
            <PointButton onClick={done}>완료</PointButton>
          </ButtonWrapper>
        </Form>
      </ContentWrapper>
    </ModalBox>
  );
};

export default HTDetailViewModalComponent;
