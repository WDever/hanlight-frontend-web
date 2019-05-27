import * as React from 'react';
import styled from 'styled-components';
import LeafImg from 'lib/svg/pink-leaf.svg';
import StoneImg from 'lib/svg/blue.svg';
import MealContainer from 'container/main/meal';

const Template = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  width: 96.5%;
  font-family: 'yg-jalnan';
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Leaf = styled.img`
  width: 40rem;
  height: 30rem;
  z-index: 0;
  position: absolute;
`;

const Stone = styled.img<{ innerHeight: number }>`
  width: 15rem;
  height: 15rem;
  z-index: 0;
  position: absolute;
  top: ${props => (props.innerHeight > 789 ? '140%' : '170%')};
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
        <Stone innerHeight={window.innerHeight} src={StoneImg} alt="Meal Background Img" />
      </ListWrapper>
      <Leaf src={LeafImg} alt="Meal Background Img" />
    </Template>
  );
};

export default MealPage;
