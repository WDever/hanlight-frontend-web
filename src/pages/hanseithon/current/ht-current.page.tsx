import * as React from 'react';

import CurrentContainer from 'container/hanseithon/current';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const HTCurrentPage: React.FC = () => {
  return (
    <Template>
      <CurrentContainer isModal={false} />
    </Template>
  );
};

export default HTCurrentPage;
