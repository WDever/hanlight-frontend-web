import * as React from 'react';
import styled from 'styled-components';
import { MealProps, MealMethod } from 'container/main/meal';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import MealItem from './mealItem';

const { useEffect } = React;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 28rem;
  z-index: 1;
`;

const NoBox = styled.div`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 20.75rem;
  height: 27.5rem;
  box-shadow: 0 40px 60px 0 rgba(101, 101, 101, 0.16);
  border-radius: 16px;
`;

const MoreBox = styled.div`
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 20.75rem;
  height: 27.5rem;
  box-shadow: 0 40px 60px 0 rgba(101, 101, 101, 0.16);
  border-radius: 16px;
  background-color: #ffffff;
  z-index: 1;
`;

const MoreBtn = styled.div`
  width: 11.875rem;
  height: 3.625rem;
  border-radius: 35px;
  border: solid 6px #f03d5c;
  color: #f03d5c;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: pointer;
`;

const MealComponent: React.FC<MealProps & MealMethod & RouteComponentProps> = ({
  meal,
  mealList,
  history,
  mealStatus,
}) => {
  const access_token = localStorage.getItem('accessToken');
  const MealList = mealStatus === 'success' && mealList.map((item, idx) => {
    if (idx <= 2) {
      const mealArr = item.detail.split(',');
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
    meal({ access_token, sort: 'week' });
  }, [access_token, meal]);

  return (
    <ListWrapper>
      {MealList}
      <MoreBox>
        <span>급식 정보가</span>
        <span>더 궁금하신가요?</span>
        <MoreBtn>더보기</MoreBtn>
      </MoreBox>
    </ListWrapper>
  );
};

export default MealComponent;
