import * as React from 'react';

import { useInput } from 'lib/hooks';
import { PostMentorRequestParams } from 'store';
import styled from 'styled-components';
import {
  ContentWrapper,
  Form,
  ModalBox,
  ModalProps,
  TitleWrapper,
  XButton,
} from '../ht-modal.component';

const { useEffect } = React;

const ButtonWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
`;

interface OwnProps {
  mentorPk: number;
  postMentorRequestStatus: 'none' | 'pending' | 'success' | 'failure';
  errMessage: string;
  postMentorRequest(payload: PostMentorRequestParams): void;
}

const HTRequestModalComponent: React.FC<ModalProps & OwnProps> = ({
  deem,
  modal,
  postMentorRequest,
  postMentorRequestStatus,
  mentorPk,
  accessToken,
  resetStatus,
  errMessage,
}) => {
  const [content, setContent] = useInput('');

  useEffect(() => () => resetStatus(), []);

  useEffect(() => {
    if (postMentorRequestStatus === 'success') {
      alert('멘토링을 요청했습니다');
      deem(false);
      modal('none');
    } else if (postMentorRequestStatus === 'failure') {
      alert(errMessage);
      deem(false);
      modal('none');
    }
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (postMentorRequestStatus !== 'pending') {
      postMentorRequest({ accessToken, content, mentor_pk: mentorPk });
    }
  };

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
            maxLength={200}
            placeholder="저희팀은 개발 및 디자인 쪽이 많이 부실한 상황이라 이런 저런
쪽에서 많이 도움을 주셨으면 좋겠습니다!"
            onChange={setContent}
          />
          <ButtonWrapper>
            <button
              onClick={handleSubmit}
              disabled={postMentorRequestStatus === 'pending'}
            >
              멘토링 신청
            </button>
          </ButtonWrapper>
        </Form>
      </ContentWrapper>
    </ModalBox>
  );
};

export default HTRequestModalComponent;
