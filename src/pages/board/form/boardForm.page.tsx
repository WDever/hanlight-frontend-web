import * as React from 'react';

import BoardFormContainer from 'container/board/form';
import styled from 'styled-components';

const FormWrapper = styled.div`
  min-width: 475px;
  max-width: 800px;
  border-radius: 4px;
  border: solid 1px #d1d1d1;
  background-color: #ffffff;
  font-family: 'Spoqa Han Sans';
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormTitle = styled.div`
  width: 100%;
  font-size: 0.875rem;
  border-bottom: solid 1px #d1d1d1;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1.5rem;
`;

const BoardFormPage: React.FC = () => (
  <FormWrapper>
    <FormTitle>대나무숲에 글 올리기</FormTitle>
    <BoardFormContainer />
  </FormWrapper>
);

export default BoardFormPage;
