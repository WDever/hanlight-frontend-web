import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
import Dotdotdot from 'lib/svg/dotdotdot.svg';
import LikeIcon from 'lib/svg/like.svg';
import * as React from 'react';
import styled from 'styled-components';

interface CommentsItemProps {
  user: string;
  content: string;
  date: string;
  profileImg?: string;
  likeCount: number;
}

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
const DotImg = styled.img`
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

const CommentsItem: React.FC<CommentsItemProps> = ({
  user,
  content,
  profileImg,
  likeCount,
  date,
}) => {
  const a = 0;
  return (
    <CommentWrapper>
      <Comment>
        <CommentLeftWrapper>
          <ProfileImg
            src={profileImg ? profileImg : DefaultProfileImage}
            alt=""
          />
          <CommentContentWrapper>
            <CommentBody>
              <CommentTooltip>
                <CommentName>{user}</CommentName>
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
        <DotImg
          src={Dotdotdot}
          style={{ width: '20px', height: '30px', cursor: 'pointer' }}
          alt=""
        />
      </Comment>
    </CommentWrapper>
  );
};

export default CommentsItem;
