import * as React from 'react';

import { BoardMethod, BoardProps } from 'container/board/board.container';
import BoardFeedContainer from 'container/board/feed';
import BoardFormContainer from 'container/board/form';
import BoardRolePage from 'pages/board/role';
import styled from 'styled-components';

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

  display: flex;
  justify-content: center;
`;

const BoardWrapper = styled.div`
  width: 100%;
  max-width: 1220px;
  height: 100%;
  padding-top: 1.5rem;

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
  width: 55%;
  min-width: 475px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin-right: 1.25rem;
`;

const BoardComponent: React.FC<BoardProps & BoardMethod> = ({
  deemBoard,
  deemBoardStatus,
}) => {
  return (
    <Templete>
      <Wrapper>
        {deemBoardStatus && <Deem />}
        <BoardWrapper>
          <Feeds>
            <BoardFormContainer />
            <BoardFeedContainer />
          </Feeds>
          {window.innerWidth > 1024 && <BoardRolePage />}
        </BoardWrapper>
      </Wrapper>
    </Templete>
  );
};

export default BoardComponent;
