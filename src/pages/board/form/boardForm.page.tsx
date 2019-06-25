import * as React from 'react';

import BoardFormContainer from 'container/board/form';
import styled from 'styled-components';

const FormWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  border: solid 1px #d1d1d1;
  background-color: #ffffff;
  font-family: 'Spoqa Han Sans';
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardFormPage: React.FC = () => (
  <FormWrapper>
    <BoardFormContainer />
  </FormWrapper>
);

export default BoardFormPage;
