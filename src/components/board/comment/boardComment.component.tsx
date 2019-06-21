import * as React from 'react';

import {
  BoardCommentMethod,
  BoardCommentOwnProps,
  BoardCommentProps,
} from 'container/board/comment';
import CommentFormContainer from 'container/board/comment/commentForm';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';
import CommentsItem from './commentItem';

const FeedCommentWrapper = styled.div`
  width: 100%;
`;

const FeedCommentTittle = styled.p`
  font-size: 0.875rem;
  color: #1d2129;
`;

const BoardCommentComponent: React.FC<
  BoardCommentProps & BoardCommentMethod & BoardCommentOwnProps
> = props => {
  const CommentsList = props.comments
    .slice()
    .reverse()
    .map((item, i) => {
      return (
        <CommentsItem
          key={i}
          user_name={item.user_name}
          content={item.content}
          date={moment(item.createdAt).format('YYYY년 M월 D일 A H:mm')}
          likeCount={item.likeCount}
        />
      );
    });

  return (
    <FeedCommentWrapper>
      <FeedCommentTittle>댓글({props.commentCount})</FeedCommentTittle>
      <CommentFormContainer
        accessToken={props.accessToken}
        board_pk={props.board_pk}
      />
      {CommentsList}
    </FeedCommentWrapper>
  );
};

export default BoardCommentComponent;
