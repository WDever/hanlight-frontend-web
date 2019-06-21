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
  const SelectedBoardPk = React.useRef<number>(0);
  const handleOption = ({
    action,
    board_pk,
    comment_pk,
  }: {
    action: 'delete' | 'edit' | 'report';
    board_pk: number;
    comment_pk: number;
  }) => {
    if (action === 'delete' && props.deleteBoardCommentStatus !== 'pending') {
      window.confirm('정말로 삭제하시겠습니까?') &&
        props.deleteBoardCommemnt({
          accessToken: props.accessToken,
          board_pk,
          comment_pk,
        });
      SelectedBoardPk.current = board_pk;
    } else if (action === 'edit') {
      //
    } else if (action === 'report' && props.reportStatus !== 'pending') {
      window.confirm('정말로 신고하시겠습니까?') &&
        props.report({
          accessToken: props.accessToken,
          type: 'board',
          board_pk,
          comment_pk,
        });
      SelectedBoardPk.current = board_pk;
    }
  };

  React.useEffect(() => {
    if (props.board_pk === SelectedBoardPk.current) {
      if (props.deleteBoardCommentStatus === 'success') {
        alert('성공');
      } else if (props.deleteBoardCommentStatus === 'failure') {
        alert('실패');
      }
      if (props.patchBoardCommentStatus === 'success') {
        alert('성공');
      } else if (props.patchBoardCommentStatus === 'failure') {
        alert('실패');
      }
      if (props.likeStatus === 'success') {
        alert('성공');
      } else if (props.likeStatus === 'failure') {
        alert('실패');
      }
      if (props.reportStatus === 'success') {
        alert('성공');
      } else if (props.reportStatus === 'failure') {
        alert('실패');
      }
    }
  }, [
    props.deleteBoardCommentStatus,
    props.patchBoardCommemnt,
    props.likeStatus,
    props.reportStatus,
    props.patchBoardCommentStatus,
  ]);

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
          board_pk={props.board_pk}
          comment_pk={item.pk}
          handleOption={handleOption}
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
