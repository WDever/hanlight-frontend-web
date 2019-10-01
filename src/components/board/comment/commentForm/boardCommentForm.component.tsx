import * as React from 'react';

import {
  CommentFormMethod,
  CommentFormOwnProps,
  CommentFormProps,
} from 'container/board/comment/commentForm/boardCommentForm.container';
import { useInput } from 'lib/hooks';
import { Device } from 'lib/styles';
import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${Device.tabletL} {
    height: 3.5rem;
    margin: 1rem 0;
  }

  @media ${Device.mobileL} {
    height: 2rem;
    min-height: 2rem;
    margin: 0.625rem 0;
  }
`;
const ProfileImg = styled.img<{ image: boolean }>`
  width: 2.5rem;
  margin-right: 0.75rem;

  ${({ image }) =>
    image &&
    css`
      height: 2.5rem;
      margin-bottom: 0.4rem;
      border-radius: 100%;

      @media ${Device.tabletL} {
        height: 3.6rem;
        margin-bottom: 0.75rem;
      }

      @media ${Device.mobileL} {
        height: 2rem;
        margin-bottom: 0.43rem;
      }
    `}

    @media ${Device.tabletL} {
      width: 3.6rem;
    }

    @media ${Device.mobileL} {
      width: 2rem;
    }
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

    @media ${Device.tabletL} {
      height: 100%;
      flex: 1;
    }
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

    @media ${Device.tabletL} {
      margin-left: 1.25rem;
    }

    @media ${Device.mobileL} {
      width: 3rem;
      height: 1.75rem;
      margin-left: 0.5rem;
    }
  }
`;

const CommentFormComponent: React.FC<
  CommentFormProps & CommentFormOwnProps & CommentFormMethod
> = ({
  board_pk,
  board_userName,
  board_write,
  postBoardComment,
  postBoardCommentStatus,
  accessToken,
  userImage,
}) => {
  const [content, setContent] = useInput('');
  const anonymous = !board_userName && board_write;

  const PostComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (content.trim().length && postBoardCommentStatus !== 'pending') {
      postBoardComment({ accessToken, board_pk, content: content.trim() });
      setContent('');
    }
  };

  return (
    <Wrapper>
      <ProfileImg
        image={!!userImage && !anonymous}
        src={anonymous ? DefaultProfileImage : userImage || DefaultProfileImage}
        alt="Profile"
      />
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
