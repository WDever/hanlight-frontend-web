import * as React from 'react';

import styled from 'styled-components';
import BoardFeedsPage from './feed';
import BoardFormPage from './form';
import BoardRolePage from './role';

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
  max-width: 1220px;
  height: 100%;
  margin-top: 1.5rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Feeds = styled.div`
  width: 55%;
  min-width: 475px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin-right: 1.25rem;
`;

const BoardPage: React.FC = () => (
  <>
    <Templete>
      <Wrapper>
        <Feeds>
          <BoardFormPage />
          <BoardFeedsPage />
        </Feeds>
        {window.innerWidth > 1024 && <BoardRolePage />}
      </Wrapper>
    </Templete>
  </>
);

export default BoardPage;
