import { BoardCommentMethod, BoardCommentProps } from 'container/board/comment';
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
} & BoardCommentMethod & BoardCommentProps> = ({ user_name, content, likeCount, date, deleteBoardCommemnt, deleteBoardCommentStatus, patchBoardCommemnt, patchBoardCommentStatus, report, reportStatus, accessToken }) => {
  const [optionToggle, setOptionToggle] = React.useState<boolean>(false);

  const handleOption = ({
    action,
    board_pk,
    comment_pk,
  }: {
    action: 'delete' | 'edit' | 'report';
    board_pk: number;
    comment_pk?: number;
  }) => {
    if (action === 'delete' && deleteBoardCommentStatus !== 'pending') {
      deleteBoardCommemnt({ accessToken, board_pk, comment_pk });
    } else if (action === 'edit') {
      //
    } else if (action === 'report' && reportStatus !== 'pending') {
      report({
        accessToken,
        type: 'board',
        board_pk,
        comment_pk,
      });
    }
  };

  return (
    <CommentWrapper>
      <Comment>
        <CommentLeftWrapper>
          <ProfileImg src={DefaultProfileImage} alt="" />
          <CommentContentWrapper>
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
          // <div style={{ zIndex: 10 }}>
          // <div>
          <FeedOptionWrapper>
            <FeedOption
              onClick={() => {
                // handleOption({ action: 'edit', board_pk: board.pk });
                setOptionToggle(false);
              }}
            >
              <FeedOptionImg src={EditIcon} alt="" />
              <span>게시글 수정</span>
            </FeedOption>
            <FeedOption
              onClick={() => {
                // handleOption({ action: 'delete', board_pk: board.pk });
                setOptionToggle(false);
              }}
            >
              <FeedOptionImg src={DeleteIcon} alt="" />
              <span>게시글 삭제</span>
            </FeedOption>
            <FeedOption
              onClick={() => {
                // handleOption({ action: 'report', board_pk: board.pk });
                setOptionToggle(false);
              }}
            >
              <FeedOptionImg src={ReportIcon} alt="" />
              <span>신고하기</span>
            </FeedOption>
          </FeedOptionWrapper>
          // </div>
        )}
      </Comment>
    </CommentWrapper>
  );
};

export default CommentsItem;
