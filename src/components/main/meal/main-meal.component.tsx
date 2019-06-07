import { MealMethod, MealProps } from 'container/main/meal';
import ErrorPng from 'lib/png/hugo-fatal-error.png';
import { ErrorImg } from 'lib/styles';
import moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { MealItem } from 'store';
import styled from 'styled-components';
import MealListItem from './mealItem';

const { useEffect, useState } = React;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 28rem;
`;

const NoBox = styled.div<{ colored: boolean }>`
  font-size: 2.25rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 15.875rem;
  height: 21rem;
  box-shadow: 0 40px 60px 0 rgba(101, 101, 101, 0.16);
  background-color: ${props => (props.colored ? '#ff476c' : '#ffffff')};
  border-radius: 16px;
  color: ${props => (props.colored ? 'white' : 'black')};
`;

const Text = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.125rem;
  margin-right: 1.5rem;
  width: fill-available;
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
  height: 21rem;
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

const MealComponent: React.FC<MealProps & MealMethod> = ({
  getMeal,
  mealList,
  getMealStatus,
  accessToken,
}) => {
  const MealList =
    getMealStatus === 'success'
      ? Array(3)
          .fill(null)
          .map((val, index) => {
            const meal = mealList[index];
            const date = `${moment().format('YYYY')}년 ${moment().format(
              'M',
            )}월 ${meal.date}일`;
            if (meal.detail === '주말') {
              return (
                <NoBox key={index} colored={index === 0}>
                  <Text>주말이다</Text>
                  <DateWrapper>{date}</DateWrapper>
                </NoBox>
              );
            } else if (meal.detail === 'X') {
              return (
                <NoBox key={index} colored={index === 0}>
                  <Text>밥이 없다</Text>
                  <DateWrapper>{date}</DateWrapper>
                </NoBox>
              );
            } else {
              return (
                <MealListItem
                  mealList={meal.detail.split(',')}
                  date={`${moment().format('YYYY')}년 ${moment().format(
                    'M',
                  )}월 ${meal.date}일`}
                  key={index}
                />
              );
            }
          })
      : [];

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

export default MealComponent;
