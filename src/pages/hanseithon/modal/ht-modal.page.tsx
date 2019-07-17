import * as React from 'react';

import ModalContainer from 'container/hanseithon/modal';
import styled from 'styled-components';

const Template = styled.div`
  position: absolute;

  width: 100%;
  height: 92.6%;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 15;
`;

const HTModalPage: React.FC = () => {
  return (
    <Template>
      <ModalContainer />
    </Template>
  );
};

export default HTModalPage;
