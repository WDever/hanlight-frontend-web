import MealContainer from 'container/main/meal';
import * as React from 'react';
import styled from 'styled-components';

const Template = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 75%;
`;

const Title = styled.div`
  width: 81rem;
  font-family: 'yg-jalnan';
  font-size: 1.875rem;
`;

const ListWrapper = styled.div`
  width: 81rem;
  height: 100%;
  display: flex;
  align-items: center;
`;

const MealPage: React.FC = () => {
  console.log(window.innerHeight);
  return (
    <Template>
      <Title>
        급식 정보
      </Title>
      <ListWrapper>
        <MealContainer />
      </ListWrapper>
    </Template>
  );
};

export default MealPage;
