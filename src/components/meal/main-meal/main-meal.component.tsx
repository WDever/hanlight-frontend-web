import { MainMealMethod, MainMealProps } from 'container/meal/main-meal';
import { usePrevious } from 'lib/hooks';
import { Device } from 'lib/styles';
import DefaultHMBtnNote from 'lib/svg/hm-note-default.svg';
import ColoredHMBtnNote from 'lib/svg/hm-note.svg';
import MealOrderIllust from 'lib/svg/meal-order-illust.svg';
import moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MainMealItem from './item';

const { useEffect, useState } = React;

const TitleWrapper = styled.div`
  max-width: 81rem;
  width: 90%;
  margin-bottom: 2.5rem;

  display: flex;
  justify-content: space-between;

  @media ${Device.tabletL} {
    margin-bottom: 1.39rem;
  }
  @media ${Device.mobileL} {
    margin-bottom: 1rem;
  }
`;

const Title = styled.div`
  font-family: 'yg-jalnan';
  font-size: 1.875rem;

  @media ${Device.tabletL} {
    font-size: 1.5rem;
  }
  @media ${Device.mobileL} {
    font-size: 1rem;
  }
`;

const AllViewBtn = styled(Link)`
  display: none;

  @media ${Device.tabletL} {
    display: unset;
    color: #6787ec;
    text-decoration: none;
    font-size: 1rem;
    font-family: 'Spoqa Han Sans';
    margin-right: 1.5%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media ${Device.mobileL} {
    font-size: 0.69rem;
  }
`;

const HMBtn = styled.button`
  font-family: 'yg-jalnan';
  font-size: 1.875rem;

  background-color: #ffffff;
  outline: none;
  border: none;

  cursor: pointer;

  :hover {
    color: #4470ff;
  }

  @media ${Device.tabletL} {
    display: none;
  }
`;

const ComponentWrapper = styled.div`
  max-width: 81rem;
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;

  @media ${Device.tabletL} {
    width: 95%;
    max-width: unset;
    margin-left: 5%;
    position: relative;
    flex: 1;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }

  &::-webkit-scrollbar {
    display: none !important;
  }
  &::-webkit-overflow-scrolling {
    display: none;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20.1875rem;

  @media ${Device.tabletL} {
    width: unset;
    padding: 2px;
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

  @media ${Device.laptopS} {
    width: 13.225rem;
  }
  @media ${Device.tabletL} {
    width: 11rem;
    border-radius: 1rem;
    border: solid 1px #e6e6e6;
    margin-right: 1.35rem;
    box-shadow: none;
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

  @media ${Device.tabletL} {
    font-size: 1.25rem;
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

  @media ${Device.tabletL} {
    font-size: 1rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.625rem;
    margin-top: 0.25rem;
  }
`;

const OrderImg = styled.img`
  width: 77%;
  bottom: 1.48rem;
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
  toggleHM,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

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
    <>
      <TitleWrapper>
        <Title>급식 정보</Title>
        <AllViewBtn to="/meal">전체보기</AllViewBtn>
        <HMBtn
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={() => toggleHM(true)}
        >
          한빛 뮤직
          <img
            src={isHover ? ColoredHMBtnNote : DefaultHMBtnNote}
            alt="hanlight music button"
          />
        </HMBtn>
      </TitleWrapper>
      <ComponentWrapper>
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
      </ComponentWrapper>
    </>
  );
};

export default MainMealComponent;
