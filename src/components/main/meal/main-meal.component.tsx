import { MealMethod, MealProps } from 'container/main/meal';
import ErrorPng from 'lib/png/hugo-fatal-error.png';
import { ErrorImg } from 'lib/styles';
import moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MealItem from './mealItem';

const { useEffect } = React;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 28rem;
  z-index: 1;
`;

const NoBox = styled.div`
  font-size: 2.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 15.875rem;
  height: 21rem;
  box-shadow: 0 40px 60px 0 rgba(101, 101, 101, 0.16);
  background-color: #ffffff;
  border-radius: 16px;
  z-index: 1;
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
  z-index: 1;
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
  z-index: 1;
  font-size: 0.9375rem;
  cursor: pointer;
`;

const MealComponent: React.FC<MealProps & MealMethod> = ({
  meal,
  mealList,
  mealStatus,
  accessToken,
}) => {
  const MealList =
    mealStatus === 'success' &&
    mealList.map((item, idx) => {
      if (idx <= 2) {
        const mealArr = item.detail.split(',');
        if (item.detail === '주말') {
          return <NoBox>주말이다</NoBox>;
        }
        if (item.detail === 'X') {
          return <NoBox>밥이 없다</NoBox>;
        }
        return (
          <MealItem
            mealList={mealArr}
            date={`${moment().format('YYYY')}년 ${moment().format('M')}월 ${
              item.date
            }일`}
            key={item.date}
          />
        );
      }
    });

  useEffect(() => {
    meal({ accessToken, sort: 'week' });
  }, [accessToken, meal]);

  return (
    <ListWrapper>
      {MealList}
      {mealStatus === 'failure' && <ErrorImg src={ErrorPng} alt="Error" />}
      <MoreBox>
        <span>급식 정보가</span>
        <span>더 궁금하신가요?</span>
        <MoreBtn to="/meal">더보기</MoreBtn>
      </MoreBox>
    </ListWrapper>
  );
};

export default MealComponent;
