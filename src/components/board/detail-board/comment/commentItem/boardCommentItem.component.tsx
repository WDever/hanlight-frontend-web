import { useInput, usePrevious } from 'lib/hooks';
import { Device } from 'lib/styles';
import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
import Dotdotdot from 'lib/svg/dotdotdot.svg';
import LikeIcon from 'lib/svg/like.svg';
import * as React from 'react';
import {
  BoardApiModel,
  Comment,
  LikeParams,
  OptionData,
  PatchBoardCommentParams,
} from 'store';
import styled, { css } from 'styled-components';

const { useMemo } = React;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.3125rem;

  :last-of-type {
    margin-bottom: 0.5rem;
  }
`;

const OptionBtn = styled.img`
  display: none;
  width: 1.25rem;
  cursor: pointer;
  margin-bottom: 1rem;
  outline: none;
`;

const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 3.5rem;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &:hover {
    ${OptionBtn} {
      display: initial;

      @media ${Device.mobileL} {
        display: none;
      }
    }
  }
`;

const CommentLeftWrapper = styled.div`
  width: 95%;
  min-height: 3.5rem;
  display: flex;
  align-items: flex-start;

  @media ${Device.mobileL} {
    width: 100%;
  }
`;

const CommentContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
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
        height: 3.3rem;
        margin-bottom: 0.625rem;
      }

      @media ${Device.mobileL} {
        height: 2rem;
        margin-bottom: 0.43rem;
      }
    `}

    @media ${Device.tabletL} {
      width: 3.3rem;
    }

    @media ${Device.mobileL} {
      width: 2rem;
    }
`;

const CommentBody = styled.div`
  display: flex;
  align-items: center;
`;

const CommentName = styled.span`
  font-size: 0.81rem;
  margin-right: 0.3rem;
  color: #443898;

  @media ${Device.tabletL} {
    font-size: 1rem;
  }

  @media ${Device.mobileL} {
    font-size: 0.6875rem;
  }
`;

const CommentContent = styled.div<{ isMobile: boolean }>`
  font-size: 0.81rem;
  color: #1d2129;
  padding: 0.375rem;
  display: block;
  word-break: break-all;

  border-radius: 8px;
  background-color: #f2f3f5;

  ${({ isMobile }) => (isMobile ? 'cursor: pointer' : '')};

  @media ${Device.tabletL} {
    vertical-align: middle;
    padding: 0.375rem 12px;
    font-size: 1rem;
  }

  @media ${Device.mobileL} {
    padding: 0.375rem 8px;
    font-size: 0.625rem;
  }
`;

const Form = styled.form`
  width: 95%;
  min-height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: calc(100% - 4.5rem);
    width: 100%;
    min-height: 1.875rem;
    border-radius: 8px;
    border: solid 1px #d3d3d3;
    background-color: #f2f3f5;
    margin-bottom: 0.5rem;
    text-indent: 0.5rem;
    font-size: 0.81rem;
    color: #1d2129;
    padding: 0;
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
    cursor: pointer;
    outline: none;
    border: none;
  }
`;

const CommentLikeBtn = styled.span`
  font-size: 0.75rem;
  margin-left: 0.4rem;
  cursor: pointer;
`;

const CommentLikeBtnWrapper = styled.div<{ isLiked: boolean }>`
  height: 1.125rem;
  display: flex;
  align-items: center;

  span {
    font-size: 0.75rem;
    color: #616770;

    @media ${Device.tabletL} {
      font-size: 0.875rem;
    }

    @media ${Device.mobileL} {
      font-size: 0.625rem;
    }
  }

  ${CommentLikeBtn} {
    color: #0055ff;
    font-weight: ${props => (props.isLiked ? 'bold' : '300')};
  }
`;

const CommentLikeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.25rem;

  cursor: pointer;

  img {
    width: 12px;
    height: 12.5px;

    @media ${Device.tabletL} {
      width: 1rem;
      height: 1rem;
    }

    @media ${Device.mobileL} {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
`;

const CommetLikeCount = styled.span`
  font-size: 0.75rem;
  color: #000000;
  margin-left: 0.25rem;

  @media ${Device.tabletL} {
    font-size: 0.875rem;
  }

  @media ${Device.mobileL} {
    font-size: 0.5625rem;
  }
`;

interface CommentItemProps {
  comment: Comment;
  date: string;
  board_pk: number;
  comment_pk: number;
  userType: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
  userImage: string | null;
  accessToken: string;
  boardApiStatus: BoardApiModel;
  likeStatus: 'none' | 'pending' | 'success' | 'failure';
  editCommentToggleStatus: boolean;
  optionData: OptionData;
}

interface CommentItemMethod {
  deemBoard: (payload: boolean) => void;
  like(params: LikeParams): void;
  activeReport(data: boolean): void;
  optionToggle(payload: OptionData): void;
  editCommentToggle(data: boolean): void;
  patchBoardComment(data: PatchBoardCommentParams): void;
  likeListToggle(payload: boolean): void;
  getLikeList(payload: LikeParams): void;
}

const mobileFilter = 'win16|win32|win64|macintel';

const CommentItem: React.FC<CommentItemProps & CommentItemMethod> = ({
  comment,
  date,
  board_pk,
  comment_pk,
  userType,
  userImage,
  like,
  likeStatus,
  accessToken,
  boardApiStatus,
  optionToggle,
  editCommentToggleStatus,
  editCommentToggle,
  optionData,
  patchBoardComment,
  likeListToggle,
  getLikeList,
}) => {
  const {
    getBoardStatus,
    postBoardStatus,
    patchBoardStatus,
    deleteBoardStatus,
    getBoardCommentStatus,
    postBoardCommentStatus,
    patchBoardCommentStatus,
    deleteBoardCommentStatus,
    getLikeListStatus,
  } = boardApiStatus;
  const statusProps: {
    [key: string]: 'none' | 'pending' | 'success' | 'failure';
  } = {
    getBoardStatus,
    postBoardStatus,
    patchBoardStatus,
    deleteBoardStatus,
    getBoardCommentStatus,
    postBoardCommentStatus,
    patchBoardCommentStatus,
    deleteBoardCommentStatus,
    getLikeListStatus,
  };
  const prevStatusProps:
    | { [key: string]: 'none' | 'pending' | 'success' | 'failure' }
    | undefined = usePrevious(statusProps);

  const { user_name, content, likeCount, edited, isLiked, write } = comment;

  const [editedContent, setEditedContent] = useInput(content);

  const mobileCheck = useMemo(
    () => mobileFilter.indexOf(navigator.platform.toLowerCase()),
    [],
  );

  React.useEffect(() => {
    if (prevStatusProps) {
      if (
        Object.keys(prevStatusProps).some(
          status =>
            prevStatusProps[status] === 'pending' &&
            statusProps[status] !== 'pending',
        )
      ) {
        optionToggle({ type: 'none', board_pk: 0, content: '', write });
      }
    }
  }, [statusProps]);

  const submitEdit = () => {
    editCommentToggle(false);
    if (editedContent !== content && editedContent !== '') {
      patchBoardComment({
        accessToken,
        content: editedContent,
        board_pk,
        comment_pk,
      });
    }
  };

  return (
    <Wrapper>
      <CommentWrapper>
        <CommentLeftWrapper>
          <ProfileImg
            image={!!userImage}
            src={userImage || DefaultProfileImage}
            alt=''
          />
          <CommentContentWrapper>
            {editCommentToggleStatus && optionData.comment_pk === comment_pk ? (
              <Form onSubmit={submitEdit}>
                <input
                  type='text'
                  value={editedContent}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.currentTarget.value.length <= 300) {
                      setEditedContent(e);
                    }
                  }}
                  autoFocus
                />
              </Form>
            ) : (
              <CommentBody>
                <CommentContent
                  isMobile={mobileCheck === -1}
                  onClick={() => {
                    if (mobileCheck === -1) {
                      optionToggle({
                        type: 'comment',
                        board_pk,
                        comment_pk,
                        content,
                        write,
                      });
                    }
                  }}
                >
                  <CommentName>{user_name || '글 작성자'}</CommentName>
                  {content}
                </CommentContent>
                <CommentLikeWrapper
                  onClick={() => {
                    if (likeCount) {
                      getLikeList({
                        accessToken,
                        type: 'comment',
                        board_pk,
                        comment_pk,
                      });
                      likeListToggle(true);
                    }
                  }}
                >
                  <img src={LikeIcon} alt='' />
                  <CommetLikeCount>{likeCount}</CommetLikeCount>
                </CommentLikeWrapper>
              </CommentBody>
            )}
            <CommentLikeBtnWrapper isLiked={isLiked}>
              {(userType === 'student' || userType === 'graduate') && (
                <CommentLikeBtn
                  onClick={() => {
                    if (likeStatus !== 'pending') {
                      like({
                        type: 'comment',
                        accessToken,
                        board_pk,
                        comment_pk,
                      });
                    }
                  }}
                >
                  좋아요
                </CommentLikeBtn>
              )}
              &ensp;
              <span>{date}</span>
              {edited && <span>&nbsp;(수정됨)</span>}
            </CommentLikeBtnWrapper>
          </CommentContentWrapper>
        </CommentLeftWrapper>
        <OptionBtn
          src={Dotdotdot}
          alt='comment option'
          onClick={() =>
            optionToggle({
              type: 'comment',
              board_pk,
              comment_pk,
              content,
              write,
            })
          }
        />
      </CommentWrapper>
    </Wrapper>
  );
};

export default CommentItem;
