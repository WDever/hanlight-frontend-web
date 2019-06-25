import { BoardCommentMethod, BoardCommentProps } from 'container/board/comment';
import { useInput } from 'lib/hooks';
import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
import DeleteIcon from 'lib/svg/delete-icon.svg';
import Dotdotdot from 'lib/svg/dotdotdot.svg';
import EditIcon from 'lib/svg/edit-icon.svg';
import LikeIcon from 'lib/svg/like.svg';
import ReportIcon from 'lib/svg/report-icon.svg';
import * as React from 'react';
import { LikeParams } from 'store';
import styled from 'styled-components';

const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.3125rem;
`;

// const DotImg = styled.img`width: '20px', height: '30px', cursor: 'pointer'
const OptionBtn = styled.img`
  display: none;
  width: 1.25rem;
  height: 1.875rem;
  cursor: pointer;
`;

const Comment = styled.div`
  width: 100%;
  display: flex;
  min-height: 3.5rem;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &:hover {
    ${OptionBtn} {
      display: initial;
    }
  }
`;

const CommentLeftWrapper = styled.div`
  width: 95%;
  min-height: 3.5rem;
  display: flex;
  align-items: flex-start;
`;

const CommentContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ProfileImg = styled.img`
  width: 2.5rem;
  margin-right: 0.75rem;
`;

const CommentBody = styled.div`
  display: flex;
  align-items: center;
`;

const CommentName = styled.span`
  font-size: 0.81rem;
  margin-right: 0.3rem;
  color: #443898;
  /* margin: 0.5rem; */
`;

const CommentContent = styled.span`
  font-size: 0.81rem;
  color: #1d2129;
  padding: 0.375rem;

  border-radius: 8px;
  background-color: #f2f3f5;
`;

const Form = styled.form`
  /* width: calc(100% - 3rem); */
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
    /* margin: 0 0.75rem 0 0; */
    /* border: 0; */
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

const OptionWrapper = styled.div`
  width: 6.875rem;
  background-color: #ffffff;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 0;
  top: 25px;
  cursor: pointer;
  z-index: 1;
`;

const Option = styled.div`
  width: 100%;
  height: 2.125rem;
  border: solid 0.5px #707070;
  font-size: 0.75rem;

  display: flex;
  align-items: center;
`;

const OptionImg = styled.img`
  margin-left: 0.68rem;
  margin-right: 0.7rem;
`;

const CommentTooltip = styled.div`
  /* min-height: 2rem; */
  padding: 0.5rem;

  border-radius: 8px;
  background-color: #f2f3f5;

  display: flex;
  align-items: center;
  justify-content: center;
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
  }

  ${CommentLikeBtn} {
    color: ${props => (props.isLiked ? '#0055ff' : '#616770')};
  }
`;

const CommentLikeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.25rem;
`;
const CommetLikeCount = styled.span`
  font-size: 0.75rem;
  color: #000000;
  margin-left: 0.25rem;
`;

interface CommentItemProps {
  user_name: string;
  content: string;
  date: string;
  likeCount: number;
  board_pk: number;
  comment_pk: number;
  userType: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
  write: boolean;
  accessToken: string;
  edited: boolean;
  isLiked: boolean;
  like(params: LikeParams): void;
  handleOption({
    action,
    board_pk,
    comment_pk,
    content,
  }: {
    action: 'delete' | 'edit' | 'report';
    board_pk: number;
    comment_pk: number;
    content?: string;
  }): void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  user_name,
  content,
  likeCount,
  date,
  handleOption,
  board_pk,
  comment_pk,
  userType,
  write,
  edited,
  like,
  accessToken,
  isLiked,
}) => {
  const [optionToggle, setOptionToggle] = React.useState<boolean>(false);
  const [editToggle, setEditToggle] = React.useState<boolean>(false);
  const [editedContent, setEditedContent] = useInput(content);

  const submitEdit = () => {
    setEditToggle(!setEditToggle);
    if (editedContent !== content || editedContent !== '') {
      handleOption({
        action: 'edit',
        board_pk,
        comment_pk,
        content: editedContent,
      });
    }
  };

  return (
    <CommentWrapper>
      <Comment>
        <CommentLeftWrapper>
          <ProfileImg src={DefaultProfileImage} alt="" />
          <CommentContentWrapper>
            {editToggle ? (
              <Form onSubmit={submitEdit}>
                <input
                  type="text"
                  value={editedContent}
                  onChange={setEditedContent}
                />
              </Form>
            ) : (
              <CommentBody>
                <CommentContent>
                  <CommentName>{user_name}</CommentName>
                  {content}
                </CommentContent>
                <CommentLikeWrapper>
                  <img
                    src={LikeIcon}
                    style={{ width: '12.9px', height: '12.5px' }}
                    alt=""
                  />
                  <CommetLikeCount>{likeCount}</CommetLikeCount>
                </CommentLikeWrapper>
              </CommentBody>
            )}
            <CommentLikeBtnWrapper isLiked={isLiked}>
              {userType === 'student' && (
                <CommentLikeBtn
                  onClick={() =>
                    like({
                      accessToken,
                      type: 'comment',
                      board_pk,
                      comment_pk,
                    })
                  }
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
          style={{
            width: '20px',
            height: '30px',
            cursor: 'pointer',
            marginBottom: '1rem',
          }}
          alt="comment option"
          onClick={() => setOptionToggle(!optionToggle)}
        />
        {optionToggle && (
          <OptionWrapper>
            {write && (
              <>
                <Option
                  onClick={() => {
                    handleOption({ action: 'edit', board_pk, comment_pk });
                    setOptionToggle(false);
                    setEditToggle(!editToggle);
                  }}
                >
                  <OptionImg src={EditIcon} alt="" />
                  <span>댓글 수정</span>
                </Option>
                <Option
                  onClick={() => {
                    handleOption({
                      action: 'delete',
                      board_pk,
                      comment_pk,
                    });
                    setOptionToggle(false);
                  }}
                >
                  <OptionImg src={DeleteIcon} alt="" />
                  <span>댓글 삭제</span>
                </Option>
              </>
            )}
            <Option
              onClick={() => {
                handleOption({
                  action: 'report',
                  board_pk,
                  comment_pk,
                });
                setOptionToggle(false);
              }}
            >
              <OptionImg src={ReportIcon} alt="" />
              <span>신고하기</span>
            </Option>
          </OptionWrapper>
        )}
      </Comment>
    </CommentWrapper>
  );
};

export default CommentItem;
