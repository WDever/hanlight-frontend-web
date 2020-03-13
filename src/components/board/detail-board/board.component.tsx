import * as React from 'react';

import LikeListComponent from 'components/board/detail-board/likeList';
import BoradOptionComponent from 'components/board/detail-board/option';
import { BoardMethod, BoardProps } from 'container/board';
import BoardFeedContainer from 'container/board/feed';
import BoardFormContainer from 'container/board/form';
import { usePrevious } from 'lib/hooks';
import { Device } from 'lib/styles';
import BoardRolePage from 'pages/board/role';
import styled from 'styled-components';
import PhotoDetailComponent from './photoDetail';

const { useEffect } = React;

const Templete = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #e9ebee;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 3.75rem;

  display: flex;
  justify-content: center;

  @media ${Device.tabletL} {
    max-width: 768px;
  }
`;

const BoardWrapper = styled.div`
  width: 100%;
  max-width: 1220px;
  height: 100%;
  padding-top: 1.5rem;

  @media ${Device.tabletL} {
    padding: 0;
  }

  display: flex;
  justify-content: center;
`;

const Deem = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-color: #171717;
  position: absolute;
  z-index: 2;
`;

const Feeds = styled.div`
  @media ${Device.tabletL} {
    width: 100%;
    margin-right: 0;
  }

  @media ${Device.mobileL} {
    min-width: unset;
  }

  width: 55%;
  display: flex;
  flex-direction: column;
  margin-right: 1.25rem;
  position: relative;
`;

const BoardComponent: React.FC<BoardProps & BoardMethod> = ({
  deemBoardStatus,
  likeStatus,
  reportStatus,
  getBoardStatus,
  postBoardStatus,
  patchBoardStatus,
  deleteBoardStatus,
  getBoardCommentStatus,
  postBoardCommentStatus,
  patchBoardCommentStatus,
  deleteBoardCommentStatus,
  getLikeListStatus,
  errorCode,
  errorMessage,
  optionData,
  likeListToggleStatus,
  photoDetailStatus,
}) => {
  const statusProps: {
    [key: string]: 'none' | 'pending' | 'success' | 'failure';
  } = {
    reportStatus,
    getBoardStatus,
    postBoardStatus,
    patchBoardStatus,
    deleteBoardStatus,
    getBoardCommentStatus,
    postBoardCommentStatus,
    patchBoardCommentStatus,
    deleteBoardCommentStatus,
    getLikeListStatus,
  };

  const prevStatusProps:
    | { [key: string]: 'none' | 'pending' | 'success' | 'failure' }
    | undefined = usePrevious(statusProps);

  useEffect(() => {
    if (prevStatusProps) {
      if (
        Object.keys(prevStatusProps).some(
          status =>
            prevStatusProps[status] === 'pending' &&
            statusProps[status] === 'failure',
        )
      ) {
        if (errorCode === 404 || errorCode === 412) {
          alert(errorMessage);
        }
      }
    }
  }, [errorCode, errorMessage, prevStatusProps, statusProps]);

  return (
    <Templete>
      <Wrapper>
        {deemBoardStatus && <Deem />}
        {optionData.type !== 'none' && <BoradOptionComponent />}
        {likeListToggleStatus && <LikeListComponent />}
        {photoDetailStatus && <PhotoDetailComponent />}
        <BoardWrapper>
          <Feeds>
            <BoardFormContainer />
            <BoardFeedContainer
              boardApiStatus={{
                getBoardStatus,
                postBoardStatus,
                patchBoardStatus,
                deleteBoardStatus,
                getBoardCommentStatus,
                postBoardCommentStatus,
                patchBoardCommentStatus,
                deleteBoardCommentStatus,
                getLikeListStatus,
              }}
              likeStatus={likeStatus}
              errorCode={errorCode}
              errorMessage={errorMessage}
            />
          </Feeds>
          <BoardRolePage />
        </BoardWrapper>
      </Wrapper>
    </Templete>
  );
};

export default BoardComponent;
