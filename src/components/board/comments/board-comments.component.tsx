import * as React from 'react';

import { Props } from 'container/board/comments';
import styled from 'styled-components';
import CommentsItem from './commentsItem';

const FeedCommentWrapper = styled.div`
  width: 100%;
`;

const FeedCommentTittle = styled.p`
  font-size: 0.875rem;
  color: #1d2129;
`;

const BoardCommentsComponent: React.FC<Props> = ({
  comments,
  commentCount,
  board_pk,
  getBoardCommentStatus,
}) => {
  const CommentsList =
    getBoardCommentStatus === 'success'
      ? comments.map((item, idx) => {
          return (
            <CommentsItem
              key={idx}
              user={item.user_name}
              content={item.content}
              date={item.createdAt}
              likeCount={item.likeCount}
            />
          );
        })
      : [];

  return (
    <FeedCommentWrapper>
      <FeedCommentTittle>댓글({commentCount})</FeedCommentTittle>
      <CommentsItem
        user="이예준"
        content="팩트) 김우혁 병신"
        date="2019년 6월 18일 오후 7:04"
        likeCount={1}
      />
      {CommentsList}
    </FeedCommentWrapper>
  );
};

export default BoardCommentsComponent;
