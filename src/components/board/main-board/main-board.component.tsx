import React from 'react';

import styled from 'styled-components';
import { MainCardWrapper } from 'lib/styles/MainCard';

/* eslint-disable @typescript-eslint/typedef */

const Wrapper = styled(MainCardWrapper)``;

/* eslint-enable @typescript-eslint/typedef */

const MainBoardComponent: React.FC = () => {
  return (
    <Wrapper>
      <h1 className='title'>대나무숲</h1>
    </Wrapper>
  );
};

export default MainBoardComponent;
