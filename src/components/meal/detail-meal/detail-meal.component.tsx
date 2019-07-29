import * as React from 'react';

import { DetailMealMethod, DetailMealProps } from 'container/meal/detail-meal';
import { Device } from 'lib/styles';
import moment from 'moment';
import { MealItem } from 'store';
import styled from 'styled-components';
import DetailMealItem from './item';

const Meal = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'yg-jalnan';
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  max-width: 81rem;
  width: 90%;
  font-size: 2.5rem;
  margin-bottom: 3.7rem;
  margin-top: 2.5rem;

  @media ${Device.tabletL} {
    font-size: 1.81rem;
    margin-top: 2.6rem;
    margin-bottom: 1.8rem;
  }
  @media ${Device.mobileL} {
    font-size: 1.25rem;
    margin-top: 1.71rem;
    margin-bottom: 1.14rem;
  }
`;

const MealWeekWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MealWeekItemsWrapper = styled.div`
  width: 90%;
  max-width: 81rem;
  height: 100%;
  margin-bottom: 5rem;

  @media ${Device.tabletL} {
    width: 95%;
    max-width: unset;
    margin-left: 5%;
    margin-bottom: 2.5rem;
    position: relative;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;

    flex: 1;
    display: flex;
    align-items: flex-start;
  }

  &::-webkit-scrollbar {
    display: none !important;
  }
  &::-webkit-overflow-scrolling {
    display: none;
  }
`;

const MealWeekString = styled.div`
  width: 90%;
  max-width: 81rem;
  font-size: 1.5rem;
  margin-bottom: 1.275rem;

  @media ${Device.tabletL} {
    font-size: 1.19rem;
    margin-bottom: 1.125rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.875rem;
    margin-bottom: 0.7rem;
  }
`;

const MealWeekItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media ${Device.tabletL} {
    width: unset;
    height: 100%;
  }
`;

const days = ['일', '월', '화', '수', '목', '금', '토'];
const weeksString = ['첫', '두', '세', '네', '다섯'];

export default class DetailMealComponent extends React.Component<
  DetailMealProps & DetailMealMethod
> {
  public state: { meals: MealItem[] } = {
    meals: [],
  };
  public itemScroll: HTMLDivElement | null = null;
  public listScroll: HTMLDivElement | null = null;

  public componentDidMount() {
    const { getMeal } = this.props;

    getMeal({
      accessToken: this.props.accessToken,
      sort: 'month',
      month: moment().get('month') + 1,
    });
  }

  public componentDidUpdate(prevProps: DetailMealProps & DetailMealMethod) {
    const { getMealMonthStatus, mealMonthList } = this.props;

    if (
      prevProps.getMealMonthStatus === 'pending' &&
      getMealMonthStatus === 'success'
    ) {
      this.setState((state: { meals: MealItem[] }) => ({
        meals: state.meals.concat(mealMonthList),
      }));
    }
  }

  public render() {
    const { meals } = this.state;
    const { getMealMonthStatus } = this.props;

    const MealList: [
      JSX.Element[],
      JSX.Element[],
      JSX.Element[],
      JSX.Element[],
      JSX.Element[]
    ] = [[], [], [], [], []];

    if (getMealMonthStatus === 'success') {
      const dates = moment()
        .endOf('month')
        .get('date');

      new Array(dates)
        .fill(null)
        .map((_, i) => i + 1)
        .filter(
          date =>
            moment({ date }).get('day') !== 0 &&
            moment({ date }).get('day') !== 6,
        )
        .forEach(date => {
          const mealMoment = moment({
            date,
          });
          const mealIndex = meals.findIndex(meal => meal.date === date);
          const dateString = mealMoment.format('MM월 DD일');
          const todayBool = moment().get('date') === mealMoment.get('date');
          const day = days[mealMoment.get('d')];
          const week = Math.ceil(date / 7) - 1;
          if (mealIndex >= 0) {
            MealList[week].push(
              <DetailMealItem
                key={date}
                item={meals[mealIndex].detail.split(',')}
                date={dateString}
                today={todayBool}
                day={day}
                _ref={ref => (todayBool ? (this.itemScroll = ref) : undefined)}
              />,
            );
          } else {
            MealList[week].push(
              <DetailMealItem
                key={date}
                item={'급식정보가\n없습니다'}
                date={dateString}
                today={todayBool}
                day={day}
                _ref={ref => (todayBool ? (this.itemScroll = ref) : undefined)}
              />,
            );
          }
        });

      MealList.forEach((list, i, arr) => {
        if (list.length < 5) {
          const items = Array(5 - list.length)
            .fill(null)
            .map((_, i) => (
              <DetailMealItem
                key={
                  moment()
                    .endOf('month')
                    .get('date') +
                  i +
                  1
                }
                item={''}
                date={''}
                today={false}
                day={''}
              />
            ));

          arr[i] = list.concat(items);
        }
      });

      if (this.listScroll && this.itemScroll) {
        window.scrollTo(0, this.listScroll.offsetTop / 2);
        this.listScroll.scrollTo(this.itemScroll.offsetLeft - 160, 0);
      }
    }

    return (
      <>
        {getMealMonthStatus === 'success' ? (
          <Meal>
            <Wrapper>
              <Title>급식 정보</Title>
              {MealList.map((_, i) => {
                if (MealList[i].length) {
                  return (
                    <MealWeekWrapper key={i}>
                      <MealWeekString>
                        {moment().get('month') + 1}월 {weeksString[i]} 번째 주
                      </MealWeekString>
                      <MealWeekItemsWrapper
                        ref={ref =>
                          Math.ceil(moment().get('date') / 7) === i + 1
                            ? (this.listScroll = ref)
                            : null
                        }
                      >
                        <MealWeekItems>{MealList[i]}</MealWeekItems>
                      </MealWeekItemsWrapper>
                    </MealWeekWrapper>
                  );
                }
                return <></>;
              })}
            </Wrapper>
          </Meal>
        ) : (
          <Meal style={{ height: '100%' }} />
        )}
      </>
    );
  }
}
