import { MealMethod, MealProps } from 'container/meal/meal.container';
import ErrorPng from 'lib/png/hugo-fatal-error.png';
import { ErrorImg } from 'lib/styles';
import moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { MealItem } from 'store';
import styled from 'styled-components';
import MealListItem from './mealItem';
import { MealDate, MealItemWrapper } from './mealItem/mealItem.component';

const { useEffect } = React;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20.1875rem;
`;

const MoreBox = styled.div`
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1.3125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 15.875rem;
  height: 20.1875rem;
  box-shadow: 0 40px 60px 0 rgba(101, 101, 101, 0.16);
  border-radius: 16px;
  background-color: #ffffff;
`;

const MoreBtn = styled(Link)`
  text-decoration: none;
  width: 9.7rem;
  height: 2.775rem;
  border-radius: 35px;
  border: solid 6px #f03d5c;
  color: #f03d5c;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9375rem;
  cursor: pointer;
`;

const days = ['일', '월', '화', '수', '목', '금', '토'];

const MainMealComponent: React.FC<MealProps & MealMethod> = ({
  getMeal,
  mealList,
  getMealStatus,
  accessToken,
}) => {
  const MealList =
    getMealStatus === 'success'
      ? mealList.slice(0, 3).map((val, index) => {
          const meal = mealList[index];
          const year = moment().get('year');
          const m = moment().set({
            year,
            month: val.month - 1,
            date: val.date,
          });
          const dayIndex = m.get('d');
          const dateString = `${year}년 ${val.month}월 ${val.date}일`;
          const todayBool = index === 0;
          if (meal.detail === '주말' || meal.detail === 'X') {
            return (
              <MealListItem
                item={meal.detail === '주말' ? '주말이다' : '밥이 없다'}
                date={dateString}
                key={index}
                day={days[dayIndex]}
                today={todayBool}
                type={'main'}
              />
            );
          } else {
            return (
              <MealListItem
                item={meal.detail.split(',')}
                date={dateString}
                key={index}
                day={days[dayIndex]}
                today={todayBool}
                type={'main'}
              />
            );
          }
        })
      : [<MoreBox />, <MoreBox />, <MoreBox />];

  useEffect(() => {
    getMeal({ accessToken, sort: 'week' });
  }, [accessToken]);

  return (
    <ListWrapper>
      {MealList}
      {getMealStatus === 'failure' && <ErrorImg src={ErrorPng} alt="Error" />}
      <MoreBox>
        <span>급식 정보가</span>
        <span>더 궁금하신가요?</span>
        <MoreBtn to="/meal">더보기</MoreBtn>
      </MoreBox>
    </ListWrapper>
  );
};

export default MainMealComponent;
