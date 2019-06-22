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
    content,
  }: {
    action: 'delete' | 'edit' | 'report';
    board_pk: number;
    comment_pk: number;
    content?: string;
  }) => {
    const {
      deleteBoardCommemnt,
      deleteBoardCommentStatus,
      patchBoardCommemnt,
      patchBoardCommentStatus,
      report,
      reportStatus,
      accessToken,
    } = props;
    if (action === 'delete' && deleteBoardCommentStatus !== 'pending') {
      window.confirm('정말로 삭제하시겠습니까?') &&
        deleteBoardCommemnt({
          accessToken,
          board_pk,
          comment_pk,
        });
      SelectedBoardPk.current = board_pk;
    } else if (action === 'edit' && patchBoardCommentStatus && content) {
      patchBoardCommemnt({ accessToken, content, board_pk, comment_pk });
      SelectedBoardPk.current = board_pk;
    } else if (action === 'report' && reportStatus !== 'pending') {
      window.confirm('정말로 신고하시겠습니까?') &&
        report({
          accessToken,
          type: 'board',
          board_pk,
          comment_pk,
        });
      SelectedBoardPk.current = board_pk;
    }
  };

  React.useEffect(() => {
    const {
      board_pk,
      deleteBoardCommentStatus,
      likeStatus,
      reportStatus,
    } = props;
    if (board_pk === SelectedBoardPk.current) {
      if (deleteBoardCommentStatus === 'success') {
        alert('성공');
      } else if (deleteBoardCommentStatus === 'failure') {
        alert('실패');
      }
      if (likeStatus === 'success') {
        alert('성공');
      } else if (likeStatus === 'failure') {
        alert('실패');
      }
      if (reportStatus === 'success') {
        alert('성공');
      } else if (reportStatus === 'failure') {
        alert('실패');
      }
    }
  }, [props.deleteBoardCommentStatus, props.likeStatus, props.reportStatus]);

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
          userType={props.userType}
          write={item.write}
        />
      );
    });

  return (
    <FeedCommentWrapper>
      <FeedCommentTittle>댓글({props.commentCount})</FeedCommentTittle>
      {props.userType === 'student' && (
        <CommentFormContainer
          accessToken={props.accessToken}
          board_pk={props.board_pk}
        />
      )}
      {CommentsList}
    </FeedCommentWrapper>
  );
};

export default BoardCommentComponent;
