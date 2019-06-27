import * as React from 'react';

import {
  BoardFeedMethod,
  BoardFeedOwnProps,
  BoardFeedProps,
} from 'container/board/feed/boardFeed.container';
import FeedItemComponent from './feedItem';

interface BoardFeedState {
  page: number;
}

export default class BoardFeedComponent extends React.Component<
  BoardFeedProps & BoardFeedMethod & BoardFeedOwnProps
> {
  public state: BoardFeedState = {
    page: 1,
  };

  public infiniteScroll = () => {
    if (
      this.props.getBoardStatus !== 'none' &&
      this.props.getBoardStatus !== 'pending' &&
      document.documentElement.scrollTop +
        document.documentElement.clientHeight ===
        document.documentElement.scrollHeight &&
      Math.ceil(this.props.boardCount / 10) !== this.state.page
    ) {
      this.setState({
        page: this.state.page + 1,
      });
    }
  };

  public componentDidMount() {
    this.props.getBoard({ accessToken: this.props.accessToken, page: 1 });
    window.addEventListener('scroll', this.infiniteScroll, true);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll);
    this.props.resetBoard();
  }

  public componentDidUpdate(
    prevProps: BoardFeedProps & BoardFeedMethod,
    prevState: BoardFeedState,
  ) {
    if (prevProps !== this.props) {
      if (prevProps.deleteBoardStatus === 'pending') {
        if (this.props.deleteBoardStatus === 'success') {
          alert('성공적으로 삭제되었습니다.');
        }
      }
    } else if (prevState.page !== this.state.page) {
      this.props.getBoard({
        accessToken: this.props.accessToken,
        page: this.state.page,
      });
    }
  }

  public handleOption = ({
    action,
    board_pk,
    content,
  }: {
    action: 'delete' | 'edit' | 'report';
    board_pk: number;
    comment_pk?: number;
    content?: string;
  }) => {
    if (action === 'delete' && this.props.deleteBoardStatus !== 'pending') {
      window.confirm('정말로 삭제하시겠습니까?') &&
        this.props.deleteBoard({
          board_pk,
          accessToken: this.props.accessToken,
        });
    } else if (action === 'edit') {
      if (content) {
        this.props.patchBoard({
          accessToken: this.props.accessToken,
          board_pk,
          content,
        });
      }
    }
  };

  public getBoardComments = ({
    board_pk,
    page,
  }: {
    board_pk: number;
    page: number;
  }) =>
    this.props.getBoardComment({
      accessToken: this.props.accessToken,
      board_pk,
      page,
    });

  public render() {
    const {
      accessToken,
      board,
      getBoardCommentStatus,
      like,
      likeStatus,
      deemBoard,
      deemBoardStatus,
      patchBoardStatus,
      activeReport,
    } = this.props;
    const { handleOption, getBoardComments } = this;

    return board.map((val, i) => (
      <FeedItemComponent
        accessToken={accessToken}
        key={i}
        board={val}
        handleOption={handleOption}
        getBoardComments={getBoardComments}
        getBoardCommentStatus={getBoardCommentStatus}
        like={like}
        likeStatus={likeStatus}
        deemBoard={deemBoard}
        deemBoardStatus={deemBoardStatus}
        patchBoardStatus={patchBoardStatus}
        activeReport={activeReport}
      />
    ));
  }
}
