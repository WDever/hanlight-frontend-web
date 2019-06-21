import * as React from 'react';

import {
  BoardFeedMethod,
  BoardFeedProps,
} from 'container/board/feed/boardFeed.container';
import FeedItemComponent from './feedItem';

interface BoardFeedState {
  page: number;
}

export default class BoardFeedComponent extends React.Component<
  BoardFeedProps & BoardFeedMethod
> {
  public state: BoardFeedState = {
    page: 1,
  };

  public infiniteScroll = () => {
    if (
      this.props.getBoardStatus !== 'pending' &&
      document.documentElement.scrollTop +
        document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
    ) {
      if (Math.ceil(this.props.boardsCount / 10) === this.state.page) {
        alert('피드의 마지막입니다.');
      } else {
        this.setState({
          page: this.state.page + 1,
        });
      }
    }
  };

  public componentDidMount() {
    this.props.getBoard({ accessToken: this.props.accessToken, page: 1 });
    window.addEventListener('scroll', this.infiniteScroll, true);
  }

  public componentDidUpdate(
    prevProps: BoardFeedProps & BoardFeedMethod,
    prevState: BoardFeedState,
  ) {
    if (prevProps !== this.props) {
      if (prevProps.deleteBoardStatus === 'pending') {
        if (this.props.deleteBoardStatus === 'success') {
          alert('성공');
        } else if (this.props.deleteBoardStatus === 'failure') {
          alert('실패');
        }
      } else if (prevProps.patchBoardStatus === 'pending') {
        if (this.props.patchBoardStatus === 'success') {
          alert('성공');
        } else if (this.props.patchBoardStatus === 'failure') {
          alert('실패');
        }
      } else if (prevProps.likeStatus === 'pending') {
        if (this.props.likeStatus === 'success') {
          alert('성공');
        } else if (this.props.likeStatus === 'failure') {
          alert('실패');
        }
      } else if (prevProps.reportStatus === 'pending') {
        if (this.props.reportStatus === 'success') {
          alert('성공');
        } else if (this.props.reportStatus === 'failure') {
          alert('실패');
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
  }: {
    action: 'delete' | 'edit' | 'report';
    board_pk: number;
  }) => {
    if (action === 'delete' && this.props.deleteBoardStatus !== 'pending') {
      this.props.deleteBoard({ board_pk, accessToken: this.props.accessToken });
    } else if (action === 'edit') {
      //
    } else if (action === 'report' && this.props.reportStatus !== 'pending') {
      this.props.report({
        accessToken: this.props.accessToken,
        type: 'board',
        board_pk,
      });
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
    const { boards, getBoardCommentStatus } = this.props;
    const { handleOption, getBoardComments } = this;

    return boards.map((board, i) => (
      <FeedItemComponent
        key={i}
        board={board}
        handleOption={handleOption}
        getBoardComments={getBoardComments}
        getBoardCommentStatus={getBoardCommentStatus}
      />
    ));
  }
}
