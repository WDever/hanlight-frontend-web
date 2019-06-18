import MealContainer from 'container/meal/main-meal';
import * as React from 'react';
import styled from 'styled-components';

const Template = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  max-width: 81rem;
  width: 90%;
  font-family: 'yg-jalnan';
  font-size: 1.875rem;
  margin-bottom: 2.5rem;
`;

const ListWrapper = styled.div`
  max-width: 81rem;
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const MainMealPage: React.FC = () => {
  return (
    <Template>
      <Title>급식 정보</Title>
      <ListWrapper>
        <MealContainer />
      </ListWrapper>
    </Template>
  );
};

export default MainMealPage;
