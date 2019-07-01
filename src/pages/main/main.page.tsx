import * as React from 'react';

import MainContainer from 'container/main';
import styled from 'styled-components';

const Template = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const MainPage: React.FC = () => {
  return (
      <MainContainer />
  );
};

export default MainPage;
