import * as React from 'react';
import styled from 'styled-components';
import MealContainer from 'container/main/meal';

const Template = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 33.375rem;
`;

const Title = styled.div`
  width: 95%;
  font-family: 'yg-jalnan';
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const MealPage: React.FC = () => {
  return (
    <Template>
      <Title>
        급식 정보
      </Title>
      <MealContainer />
    </Template>
  );
};

export default MealPage;
