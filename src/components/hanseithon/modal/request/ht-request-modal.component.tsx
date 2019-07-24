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
  justify-content: flex-end;
`;

const HTRequestModalComponent: React.FC<ModalProps> = ({ deem, modal }) => {
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
          <span>멘토링 신청</span>
        </TitleWrapper>
        <Form>
          <p>도움이 필요한 부분</p>
          <textarea
            minLength={1}
            maxLength={300}
            placeholder="저희팀은 개발 및 디자인 쪽이 많이 부실한 상황이라 이런 저런
쪽에서 많이 도움을 주셨으면 좋겠습니다!"
          />
          <ButtonWrapper>
            <button>멘토링 신청</button>
          </ButtonWrapper>
        </Form>
      </ContentWrapper>
    </ModalBox>
  );
};

export default HTRequestModalComponent;
