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
      this.props.boardApiStatus.getBoardStatus !== 'none' &&
      this.props.boardApiStatus.getBoardStatus !== 'pending' &&
      document.body.scrollHeight -
        window.innerHeight -
        (document.documentElement.scrollTop || document.body.scrollTop) <
        100 &&
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
    prevProps: BoardFeedProps & BoardFeedMethod & BoardFeedOwnProps,
    prevState: BoardFeedState,
  ) {
    if (prevProps !== this.props) {
      if (prevProps.boardApiStatus.deleteBoardStatus === 'pending') {
        if (this.props.boardApiStatus.deleteBoardStatus === 'success') {
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
      like,
      likeStatus,
      deemBoard,
      deemBoardStatus,
      activeReport,
      boardApiStatus,
      optionToggle,
      likeListToggle,
      getLikeList,
    } = this.props;
    const { getBoardComments } = this;

    return board.map((val, i) => (
      <FeedItemComponent
        accessToken={accessToken}
        key={i}
        board={val}
        getBoardComments={getBoardComments}
        like={like}
        likeStatus={likeStatus}
        deemBoard={deemBoard}
        deemBoardStatus={deemBoardStatus}
        activeReport={activeReport}
        boardApiStatus={boardApiStatus}
        optionToggle={optionToggle}
        likeListToggle={likeListToggle}
        getLikeList={getLikeList}
      />
    ));
  }
}
