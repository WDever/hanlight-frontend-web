import * as React from 'react';

import styled from 'styled-components';
import {
  ContentWrapper,
  Form,
  ModalBox,
  ModalProps,
  TitleWrapper,
  XButton,
} from '../ht-modal.component';

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
`;

const Content = styled.div`
  width: 24.875rem;
  height: 8.125rem;
  border-radius: 0.5rem;
  border: solid 1px #e9e9e9;
  background-color: #ffffff;

  word-break: keep-all;
`;

const HTDetailViewModalComponent: React.FC<ModalProps> = ({ deem, modal }) => {
  return (
    <ModalBox>
      <XButton
        onClick={() => {
          deem(false);
          modal('none');
        }}
      />
      <ContentWrapper>
        <TitleWrapper>
          <div>쉬어가는 한세톤 : 休</div>
          <span>멘티 체크</span>
        </TitleWrapper>
        <Form>
          <p>Team Name</p>
          <Content>
            나는 노예입니다. 한세사이버보안고등학교라는 곳의 스포실이라는 곳에
            매일같이 갇혀서 일을 하고 있지요. 저를 살려주세요. 곧 한세톤이
            마감입니다. 저는 죽을 것 같습니다. 살려주세요.
          </Content>
          <ButtonWrapper>
            <button>닫기</button>
            <PointButton>완료</PointButton>
          </ButtonWrapper>
        </Form>
      </ContentWrapper>
    </ModalBox>
  );
};

export default HTDetailViewModalComponent;
