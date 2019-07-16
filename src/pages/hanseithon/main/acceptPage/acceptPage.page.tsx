import * as React from 'react';

import AcceptPageComponent from 'components/hanseithon/main/acceptPage';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  /* height: 100%; */
  /* background-color: #000000;
  opacity: 0.5; */
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
`;

const AcceptPage: React.FC = () => {
  return (
    <Template>
      <AcceptPageComponent />
    </Template>
  );
};

export default AcceptPage;
