import { MainMealMethod, MainMealProps } from 'container/meal/main-meal';
import { usePrevious } from 'lib/hooks';
import { Device } from 'lib/styles';
import MealOrderIllust from 'lib/svg/meal-order-illust.svg';
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import MainMealItem from './item';

const { useEffect } = React;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20.1875rem;

  @media ${Device.laptop} {
    width: unset;
    padding: 2px;
  }
  @media ${Device.tablet} {
    height: 14.17rem;
  }
  @media ${Device.mobileL} {
    height: 10.25rem;
  }
`;

const MoreBox = styled.div`
  position: relative;
  width: 15.225rem;
  height: 100%;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1.5rem;
  box-shadow: 0 40px 60px 0 rgba(101, 101, 101, 0.16);
  border-radius: 16px;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media ${Device.laptopL} {
    width: 13.225rem;
  }
  @media ${Device.laptop} {
    border: solid 1px #e6e6e6;
    margin-right: 1.35rem;
    box-shadow: none;
  }
  @media ${Device.tablet} {
    width: 11rem;
    border-radius: 1rem;
  }
  @media ${Device.mobileL} {
    width: 8rem;
  }
`;

const OrderWrapper = styled.div`
  order: 0;
  width: 100%;
  text-align: center;
  margin-top: 2.75rem;

  @media ${Device.tablet} {
    font-size: 1rem;
    margin-top: 1rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.75rem;
    margin-top: 1.125rem;
  }
`;

const Order = styled.div`
  margin-top: 0.75rem;
  font-size: 1.125rem;
  font-family: inherit;
  font-weight: normal;

  @media ${Device.tablet} {
    font-size: 0.75rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.625rem;
    margin-top: 0.25rem;
  }
`;

const OrderImg = styled.img`
  width: 75%;
  bottom: 1.125rem;
`;

const days = ['일', '월', '화', '수', '목', '금', '토'];

const MainMealComponent: React.FC<MainMealProps & MainMealMethod> = ({
  getMeal,
  getMealOrder,
  getMealOrderStatus,
  mealWeekList,
  mealOrder,
  getMealWeekStatus,
  accessToken,
}) => {
  useEffect(() => {
    getMeal({ accessToken, sort: 'week' });
    getMealOrder({ accessToken });
  }, [accessToken]);

  const MealList =
    getMealWeekStatus === 'success'
      ? mealWeekList.slice(0, 3).map((val, index) => {
          const meal = mealWeekList[index];
          const year = moment().get('year');
          const m = moment().set({
            year,
            month: val.month - 1,
            date: val.date,
          });
          const dayIndex = m.get('d');
          const dateString = `${val.month}월 ${val.date}일`;
          const todayBool = index === 0;
          if (meal.detail === '주말' || meal.detail === 'X') {
            return (
              <MainMealItem
                style={{ order: index }}
                item={meal.detail === '주말' ? '주말이다' : '밥이 없다'}
                date={dateString}
                key={index}
                day={days[dayIndex]}
                today={todayBool}
              />
            );
          } else {
            return (
              <MainMealItem
                style={{ order: index }}
                item={meal.detail.split(',')}
                date={dateString}
                key={index}
                day={days[dayIndex]}
                today={todayBool}
              />
            );
          }
        })
      : [
          <MoreBox style={{ order: 0 }} key={1} />,
          <MoreBox style={{ order: 1 }} key={2} />,
          <MoreBox style={{ order: 2 }} key={3} />,
        ];

  return (
    <ListWrapper>
      {MealList}
      <MoreBox>
        <>
          <OrderWrapper>
            {getMealOrderStatus === 'success' && (
              <>
                <span>급식 순서</span>
                <Order>
                  {mealOrder.split('-').map((order, i) => {
                    if (i === 0) {
                      return (
                        <>
                          <span
                            key={i}
                            style={{ color: '#4470ff', fontWeight: 'bold' }}
                          >
                            {order}
                          </span>
                          &nbsp;-> &nbsp;
                        </>
                      );
                    } else if (i === 1) {
                      return (
                        <>
                          <span key={i}>{order}</span>&nbsp;->&nbsp;
                        </>
                      );
                    } else {
                      return <span key={i}>{order}</span>;
                    }
                  })}
                </Order>
              </>
            )}
          </OrderWrapper>
          <OrderImg src={MealOrderIllust} alt="" />
        </>
      </MoreBox>
    </ListWrapper>
  );
};

export default MainMealComponent;
