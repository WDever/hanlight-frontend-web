import * as React from 'react';

import MealItemComponent from 'components/main/meal/mealItem';
import { MealMethod, MealProps } from 'container/meal/meal.container';
import moment from 'moment';
import { MealItem } from 'store';
import styled from 'styled-components';

const Meal = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'yg-jalnan';
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 81rem;
  width: 90%;
`;

const Title = styled.div`
  max-width: 81rem;
  width: 90%;
  font-size: 2.5rem;
  margin-bottom: 3.7rem;
  margin-top: 2.5rem;
`;

const MealWeekWrapper = styled.div`
  height: 22rem;
  margin-bottom: 5rem;
`;

const MealWeekString = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.275rem;
`;

const MealWeekItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const days = ['일', '월', '화', '수', '목', '금', '토'];
const weeksString = ['첫', '두', '세', '네', '다섯'];

export default class MealComponent extends React.Component<
  MealProps & MealMethod
> {
  public state: { meals: MealItem[] } = {
    meals: [],
  };

  public componentDidMount() {
    this.props.getMeal({
      accessToken: this.props.accessToken,
      sort: 'month',
      month: moment().get('month') + 1,
    });
  }

  public componentDidUpdate(prevProps: MealProps & MealMethod) {
    if (
      prevProps.getMealStatus === 'pending' &&
      this.props.getMealStatus === 'success'
    ) {
      this.setState({
        meals: this.state.meals.concat(this.props.mealList),
      });
    }
  }

  public render() {
    const { meals } = this.state;
    const { getMealStatus } = this.props;

    const MealList: [
      JSX.Element[],
      JSX.Element[],
      JSX.Element[],
      JSX.Element[],
      JSX.Element[]
    ] = [[], [], [], [], []];

    if (this.props.getMealStatus === 'success') {
      Array(
        moment()
          .endOf('month')
          .get('date'),
      )
        .fill(null)
        .forEach((_, i) => {
          const date = i + 1;

          const mealMoment = moment({
            date,
          });
          const weekend =
            mealMoment.get('day') === 0 || mealMoment.get('day') === 6;
          if (!weekend) {
            const mealIndex = this.state.meals.findIndex(
              meal => meal.date === date,
            );
            const dateString = mealMoment.format('MM월 DD일');
            const todayBool = moment().get('date') === mealMoment.get('date');
            const day = days[mealMoment.get('d')];
            const week = Math.ceil(date / 7) - 1;
            if (mealIndex > 0) {
              MealList[week].push(
                <MealItemComponent
                  key={date}
                  type="detail"
                  item={this.state.meals[mealIndex].detail.split(',')}
                  date={dateString}
                  today={todayBool}
                  day={day}
                />,
              );
            } else {
              MealList[week].push(
                <MealItemComponent
                  key={date}
                  type="detail"
                  item={'급식정보가\n없습니다'}
                  date={dateString}
                  today={todayBool}
                  day={day}
                />,
              );
            }
          }
        });
    }

    return (
      <Meal>
        <Wrapper>
          <Title>급식 정보</Title>
          {getMealStatus === 'success' &&
            MealList.map((_, i) => {
              if (MealList[i].length) {
                return (
                  <MealWeekWrapper key={i}>
                    <MealWeekString>
                      {moment().get('month') + 1}월 {weeksString[i]} 번째 주
                    </MealWeekString>
                    <MealWeekItems>{MealList[i]}</MealWeekItems>
                  </MealWeekWrapper>
                );
              }
            })}
        </Wrapper>
      </Meal>
    );
  }
}
