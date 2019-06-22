import { BoardCommentMethod, BoardCommentProps } from 'container/board/comment';
import { useInput } from 'lib/hooks';
import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
import DeleteIcon from 'lib/svg/delete-icon.svg';
import Dotdotdot from 'lib/svg/dotdotdot.svg';
import EditIcon from 'lib/svg/edit-icon.svg';
import LikeIcon from 'lib/svg/like.svg';
import ReportIcon from 'lib/svg/report-icon.svg';
import * as React from 'react';
import styled from 'styled-components';

const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.3125rem;
`;

const Comment = styled.div`
  width: 100%;
  display: flex;
  min-height: 3.5rem;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

const CommentLeftWrapper = styled.div`
  width: 95%;
  min-height: 3.5rem;
  height: 3.5rem;
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

// const DotImg = styled.img`width: '20px', height: '30px', cursor: 'pointer'
const OptionBtn = styled.img`
  width: 1.25rem;
  height: 1.875rem;
  cursor: pointer;
`;

const CommentBody = styled.div`
  display: flex;
  align-items: center;
`;

const CommentName = styled.span`
  font-size: 0.81rem;
  color: #443898;
  margin: 0.5rem;
`;

const CommentContent = styled.span`
  font-size: 0.81rem;
  color: #1d2129;
  margin-right: 0.75rem;
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
    min-height: 1.875rem;
    border-radius: 8px;
    border: solid 1px #d3d3d3;
    background-color: #f2f3f5;
    margin-bottom: 0.5rem;
    text-indent: 0.5rem;
    font-size: 0.81rem;
    color: #1d2129;
    margin: 0 0.75rem 0 0;
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

const FeedOptionWrapper = styled.div`
  width: 6.875rem;
  background-color: #ffffff;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 0;
  top: 25px;
  cursor: pointer;
  z-index: 1;
`;

const FeedOption = styled.div`
  width: 100%;
  height: 2.125rem;
  border: solid 0.5px #707070;
  font-size: 0.75rem;

  display: flex;
  align-items: center;
`;

const FeedOptionImg = styled.img`
  margin-left: 0.68rem;
  margin-right: 0.7rem;
`;

const CommentTooltip = styled.div`
  height: 2rem;
  border-radius: 8px;
  background-color: #f2f3f5;

  display: flex;
  align-items: center;
`;

const CommentLikeBtnWrapper = styled.div`
  height: 1.125rem;
  display: flex;
  align-items: center;
`;

const CommentLikeBtn = styled.span`
  font-size: 0.75rem;
  color: #0055ff;
  margin-left: 0.5rem;
  cursor: pointer;
`;

const CommentDate = styled.span`
  font-size: 0.75rem;
  color: #616770;
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

const CommentsItem: React.FC<{
  user_name: string;
  content: string;
  date: string;
  likeCount: number;
  board_pk: number;
  comment_pk: number;
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
}> = ({
  user_name,
  content,
  likeCount,
  date,
  handleOption,
  board_pk,
  comment_pk,
}) => {
  const [optionToggle, setOptionToggle] = React.useState<boolean>(false);
  const [editToggle, setEditToggle] = React.useState<boolean>(false);
  const [editedContent, setEditedContent] = useInput(content);

  return (
    <CommentWrapper>
      <Comment>
        <CommentLeftWrapper>
          <ProfileImg src={DefaultProfileImage} alt="" />
          <CommentContentWrapper>
            {editToggle ? (
              <Form>
                <input
                  type="text"
                  value={editedContent}
                  onChange={setEditedContent}
                />
                <button
                  onClick={() => {
                    setEditToggle(!setEditToggle);
                    handleOption({
                      action: 'edit',
                      board_pk,
                      comment_pk,
                      content: editedContent,
                    });
                  }}
                >
                  등록
                </button>
              </Form>
            ) : (
              <CommentBody>
                <CommentTooltip>
                  <CommentName>{user_name}</CommentName>
                  <CommentContent>{content}</CommentContent>
                </CommentTooltip>
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
            <CommentLikeBtnWrapper>
              <CommentLikeBtn>좋아요</CommentLikeBtn>
              &ensp;
              <CommentDate>{date}</CommentDate>
            </CommentLikeBtnWrapper>
          </CommentContentWrapper>
        </CommentLeftWrapper>
        <OptionBtn
          src={Dotdotdot}
          style={{ width: '20px', height: '30px', cursor: 'pointer' }}
          alt="comment option"
          onClick={() => setOptionToggle(!optionToggle)}
        />
        {optionToggle && (
          <FeedOptionWrapper>
            <FeedOption
              onClick={() => {
                handleOption({ action: 'edit', board_pk, comment_pk });
                setOptionToggle(false);
                setEditToggle(!editToggle);
              }}
            >
              <FeedOptionImg src={EditIcon} alt="" />
              <span>댓글 수정</span>
            </FeedOption>
            <FeedOption
              onClick={() => {
                handleOption({
                  action: 'delete',
                  board_pk,
                  comment_pk,
                });
                setOptionToggle(false);
              }}
            >
              <FeedOptionImg src={DeleteIcon} alt="" />
              <span>댓글 삭제</span>
            </FeedOption>
            <FeedOption
              onClick={() => {
                handleOption({
                  action: 'report',
                  board_pk,
                  comment_pk,
                });
                setOptionToggle(false);
              }}
            >
              <FeedOptionImg src={ReportIcon} alt="" />
              <span>신고하기</span>
            </FeedOption>
          </FeedOptionWrapper>
        )}
      </Comment>
    </CommentWrapper>
  );
};

export default CommentsItem;
