import * as React from 'react';

import {
  BoardCommentMethod,
  BoardCommentOwnProps,
  BoardCommentProps,
} from 'container/board/comment';
import CommentFormContainer from 'container/board/comment/commentForm';
import { usePrevious } from 'lib/hooks';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';
import CommentItem from './commentItem';

const FeedCommentWrapper = styled.div`
  width: 100%;
`;

const FeedCommentTittle = styled.p`
  font-size: 0.875rem;
  color: #1d2129;
`;

const CommentAllBtn = styled.button`
  font-size: 0.875rem;
  font-family: 'Spoqa Han Sans';
  color: #4470ff;
  background-color: #ffffff;
  margin-bottom: 0.5rem;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const BoardCommentComponent: React.FC<
  BoardCommentProps & BoardCommentMethod & BoardCommentOwnProps
> = props => {
  const SelectedBoardPk = React.useRef<number>(0);
  const prevProps = usePrevious(props);

  const {
    deleteBoardCommemnt,
    patchBoardCommemnt,
    accessToken,
    boardApiStatus,
    board_pk,
  } = props;

  const {
    getBoardCommentStatus,
    postBoardCommentStatus,
    patchBoardCommentStatus,
    deleteBoardCommentStatus,
  } = boardApiStatus;

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
    }
  };

  React.useEffect(() => {
    if (prevProps && board_pk === SelectedBoardPk.current) {
      if (
        prevProps.boardApiStatus.deleteBoardCommentStatus === 'pending' &&
        deleteBoardCommentStatus === 'success'
      ) {
        alert('성공적으로 삭제되었습니다.');
      }
    }
  }, [props.boardApiStatus.deleteBoardCommentStatus]);

  const CommentList = props.comment
    .slice()
    .reverse()
    .map((item, i) => {
      return (
        <CommentItem
          key={i}
          comment={item}
          comment_pk={item.pk}
          date={moment(item.createdAt).format('lll')}
          board_pk={props.board_pk}
          handleOption={handleOption}
          userType={props.userType}
          accessToken={props.accessToken}
          like={props.like}
          likeStatus={props.likeStatus}
          deemBoard={props.deemBoard}
          setReportToggle={props.setReportToggle}
          activeReport={props.activeReport}
          boardApiStatus={boardApiStatus}
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
      {props.commentCount > 3 &&
        (props.page === 1 ||
          Math.ceil(props.commentCount / 10) >= props.page) && (
          <CommentAllBtn onClick={props.GetBoardComments}>
            이전 댓글 보기
          </CommentAllBtn>
        )}
      {CommentList}
    </FeedCommentWrapper>
  );
};

export default BoardCommentComponent;
