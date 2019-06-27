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
    }
  };

  React.useEffect(() => {
    const { board_pk, deleteBoardCommentStatus } = props;
    if (prevProps && board_pk === SelectedBoardPk.current) {
      if (
        prevProps.deleteBoardCommentStatus === 'pending' &&
        deleteBoardCommentStatus === 'success'
      ) {
        alert('성공적으로 삭제되었습니다.');
      }
    }
  }, [props.deleteBoardCommentStatus]);

  const CommentList = props.comment
    .slice()
    .reverse()
    .map((item, i) => {
      return (
        <CommentItem
          key={i}
          user_name={item.user_name}
          content={item.content}
          date={moment(item.createdAt).format('lll')}
          likeCount={item.likeCount}
          board_pk={props.board_pk}
          comment_pk={item.pk}
          handleOption={handleOption}
          userType={props.userType}
          write={item.write}
          accessToken={props.accessToken}
          like={props.like}
          likeStatus={props.likeStatus}
          edited={item.edited}
          isLiked={item.isLiked}
          deemBoard={props.deemBoard}
          setReportToggle={props.setReportToggle}
          activeReport={props.activeReport}
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
