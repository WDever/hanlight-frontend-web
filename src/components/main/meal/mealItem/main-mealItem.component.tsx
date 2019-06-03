import * as React from 'react';
import styled from 'styled-components';
import WeatherLogo from 'lib/svg/weather-sun-cloud.svg';

interface MealItemProps {
  mealList: Array<string>;
  date: string;
}

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #ff476c;
  width: 20.75rem;
  height: 27.5rem;
  border-radius: 16px;
  font-family: 'Spoqa Han Sans';
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 30px 80px 0 rgba(255, 0, 0, 0.25);
  z-index: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80%;
`;

const MealWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  height: 100%;
  font-family: 'Spoqa Han Sans';
  font-size: 1.5rem;
  color: white;
`;

const Weather = styled.img`
  margin: 2rem 1rem 0 1rem;
  width: 4.5rem;
  height: 4.5rem;
`;

const Lunch = styled.div`
  font-weight: bold;
  font-size: 1.75rem;
`;

const ListBox = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const DateWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
`;

const MealItemComponent: React.FC<MealItemProps> = ({ mealList, date }) => (
  <ItemBox>
    <ContentWrapper>
      <MealWrapper>
        <Lunch>점심</Lunch>
        <ListBox>
          <span>{mealList[0]}</span>
          <span>{mealList[1]}</span>
          <span>{mealList[2]}</span>
          <span>{mealList[3]}</span>
          <span>{mealList[4]}</span>
          <span>{mealList[5]}</span>
        </ListBox>
      </MealWrapper>
      <Weather src={WeatherLogo} alt="weather" />
    </ContentWrapper>
    <DateWrapper>
      {date}
    </DateWrapper>
  </ItemBox>
);

export default MealItemComponent;
