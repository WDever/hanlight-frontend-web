import MainNoticeContainer from 'container/notice/main-notice';
import * as React from 'react';

import { Device } from 'lib/styles';
import styled from 'styled-components';

// const MainNoticeTemplate = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   margin-bottom: 3rem;

//   @media ${Device.tabletL} {
//     margin-bottom: 4rem;
//   }
// `;

const MainNoticePage: React.FC = () => {
  return (
    <>
      <MainNoticeContainer />
    </>
  );
};

export default MainNoticePage;
