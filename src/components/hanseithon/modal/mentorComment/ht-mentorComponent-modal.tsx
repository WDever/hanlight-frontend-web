import * as React from 'react';

import { useInput } from 'lib/hooks';
import { PostMentorCommentParams, PostMentorRequestParams } from 'store';
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
  postMentorCommentStatus: 'none' | 'pending' | 'success' | 'failure';
  errMessage: string;
  postMentorComment(payload: PostMentorCommentParams): void;
}

const HTCommentModalComponent: React.FC<ModalProps & OwnProps> = ({
  deem,
  modal,
  postMentorComment,
  postMentorCommentStatus,
  mentorPk,
  accessToken,
  resetStatus,
  errMessage,
  teamPk,
}) => {
  const [content, setContent] = useInput('');

  useEffect(() => () => resetStatus(), []);

  useEffect(() => {
    if (postMentorCommentStatus === 'success') {
      alert('코멘트 작성을 완료했습니다.');
      deem(false);
      modal('none');
      resetStatus();
    } else if (postMentorCommentStatus === 'failure') {
      alert(errMessage);
      deem(false);
      modal('none');
      resetStatus();
    }
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    postMentorComment({ accessToken, content, team_pk: teamPk });
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
          <span>코멘트 남기기</span>
        </TitleWrapper>
        <Form>
          <p />
          <textarea
            minLength={1}
            maxLength={200}
            onChange={setContent}
          />
          <ButtonWrapper>
            <button
              onClick={handleSubmit}
              disabled={postMentorCommentStatus === 'pending'}
            >
              코멘트 완료
            </button>
          </ButtonWrapper>
        </Form>
      </ContentWrapper>
    </ModalBox>
  );
};

export default HTCommentModalComponent;
