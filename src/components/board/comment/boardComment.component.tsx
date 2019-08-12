import * as React from 'react';

import {
  BoardCommentMethod,
  BoardCommentOwnProps,
  BoardCommentProps,
} from 'container/board/comment';
import CommentFormContainer from 'container/board/comment/commentForm';
import { usePrevious } from 'lib/hooks';
import { Device } from 'lib/styles';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';
import CommentItem from './commentItem';

const FeedCommentWrapper = styled.div`
  width: 100%;

  @media ${Device.tabletL} {
    width: 91.5%;
  }
`;

const FeedCommentTittle = styled.p`
  font-size: 0.875rem;
  color: #1d2129;

  @media ${Device.tabletL} {
    font-size: 1rem;
  }

  @media ${Device.mobileL} {
    font-size: 0.6875rem;
  }
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

  @media ${Device.tabletL} {
    font-size: 1rem;
  }

  @media ${Device.mobileL} {
    font-size: 0.6875rem;
  }
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
    optionToggle,
  } = props;

  const {
    getBoardCommentStatus,
    postBoardCommentStatus,
    patchBoardCommentStatus,
    deleteBoardCommentStatus,
    getLikeListStatus,
  } = boardApiStatus;

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
          userType={props.userType}
          userImage={item.user_image}
          accessToken={props.accessToken}
          like={props.like}
          likeStatus={props.likeStatus}
          deemBoard={props.deemBoard}
          activeReport={props.activeReport}
          boardApiStatus={boardApiStatus}
          optionToggle={optionToggle}
          editCommentToggleStatus={props.editCommentToggleStatus}
          editCommentToggle={props.editCommentToggle}
          optionData={props.optionData}
          patchBoardComment={props.patchBoardCommemnt}
        />
      );
    });

  return (
    <FeedCommentWrapper>
      <FeedCommentTittle>댓글({props.commentCount})</FeedCommentTittle>
      {(props.userType === 'student' || props.userType === 'graduate') && (
        <CommentFormContainer
          accessToken={props.accessToken}
          board_pk={props.board_pk}
          board_write={props.board_write}
          board_userName={props.board_userName}
          userImage={props.userImage}
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
