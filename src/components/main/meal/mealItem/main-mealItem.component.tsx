import WeatherLogoSvg from 'lib/svg/weather-sun-cloud.svg';
import * as React from 'react';
import styled from 'styled-components';

interface MealItemProps {
  mealList: string[];
  date: string;
}

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #ff476c;
  width: 15.875rem;
  height: 21rem;
  border-radius: 16px;
  font-family: 'Spoqa Han Sans';
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 30px 80px 0 rgba(255, 0, 0, 0.25);
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
  font-size: 1.125rem;
  color: white;
`;

const Weather = styled.img`
  margin: 2rem 1rem 0 1rem;
  width: 3.4375rem;
  height: 3.4375rem;
`;

const Lunch = styled.div`
  font-weight: bold;
  font-size: 1.3125rem;
`;

const ListBox = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.125rem;
  margin-right: 1.5rem;
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
      <Weather src={WeatherLogoSvg} alt="weather" />
    </ContentWrapper>
    <DateWrapper>{date}</DateWrapper>
  </ItemBox>
);

export default MealItemComponent;
