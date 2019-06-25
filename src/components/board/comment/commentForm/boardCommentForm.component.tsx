import * as React from 'react';

import {
  CommentFormMethod,
  CommentFormOwnProps,
  CommentFormProps,
} from 'container/board/comment/commentForm/boardCommentForm.container';
import { useInput } from 'lib/hooks';
import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 2.5rem;
  margin-right: 0.75rem;
  vertical-align: middle;
`;

const Form = styled.form`
  width: calc(100% - 3rem);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: calc(100% - 4.5rem);
    min-height: 2rem;
    border-radius: 8px;
    border: solid 1px #d3d3d3;
    background-color: #f2f3f5;
    margin-bottom: 0.5rem;
    font-size: 0.8125rem;
    text-indent: 0.5rem;
  }

  button {
    width: 3.5rem;
    height: 2rem;
    border-radius: 0.5rem;
    background-color: #4470ff;
    font-family: 'spoqa han sans';
    font-weight: bold;
    font-size: 0.75rem;
    color: #e9ebee;
    margin-bottom: 0.5rem;
    cursor: pointer;
    outline: none;
    border: none;
  }
`;

const CommentFormComponent: React.FC<
  CommentFormProps & CommentFormOwnProps & CommentFormMethod
> = ({ board_pk, postBoardComment, postBoardCommentStatus, accessToken }) => {
  const [content, setContent] = useInput('');

  const PostComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (content && postBoardCommentStatus !== 'pending') {
      postBoardComment({ accessToken, board_pk, content });
      setContent('');
    }
  };

  return (
    <Wrapper>
      <ProfileImg src={DefaultProfileImage} alt="Profile" />
      <Form>
        <input
          value={content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.currentTarget.value.length <= 300) {
              setContent(e);
            }
          }}
          type="text"
        />
        <button onClick={PostComment}>입력</button>
      </Form>
    </Wrapper>
  );
};

export default CommentFormComponent;
