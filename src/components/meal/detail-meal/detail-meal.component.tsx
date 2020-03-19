import React, {
  useEffect,
  useState,
  ReactNodeArray,
  useRef,
  RefObject,
} from 'react';

import { DetailMealMethod, DetailMealProps } from 'container/meal/detail-meal';
import { Device } from 'lib/styles';
import moment, { Moment } from 'moment';
import { MealItem } from 'store';
import styled from 'styled-components';
import { usePrevious } from 'lib/hooks';
import DetailMealItem from './item';

/* eslint-disable @typescript-eslint/typedef */

const MealWrapper = styled.section`
  width: 100%;

  padding-top: 7.375rem;
  padding-left: 26.5625rem;
  padding-bottom: 10rem;

  background-color: ${({ theme }): string => theme.common.detailBg};

  .title {
    font-family: 'Noto Sans KR';
    font-size: 1.75rem;

    margin: 0;
    margin-bottom: 1.75rem;
  }
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 13.75rem);
  grid-column-gap: 3.75rem;
  grid-row-gap: 3.5rem;
`;

const EmptyItem = styled.div`
  width: 13.75rem;
  height: 17.5rem;

  display: flex;
  flex-direction: column;

  padding: 2rem 1.5rem 3rem 1.5rem;

  box-sizing: border-box;

  border-radius: 1rem;
`;

/* eslint-enable @typescript-eslint/typedef */

const DAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];

const DetailMealComponent: React.FC<DetailMealProps & DetailMealMethod> = ({
  getMeal,
  accessToken,
  getMealMonthStatus,
  mealMonthList,
}: DetailMealProps & DetailMealMethod) => {
  const [meals, setMeals]: [
    MealItem[],
    React.Dispatch<React.SetStateAction<MealItem[]>>,
  ] = useState<MealItem[]>([]);
  const prevProps:
    | {
        getMealMonthStatus: 'none' | 'pending' | 'success' | 'failure';
      }
    | undefined = usePrevious({
    getMealMonthStatus,
  });

  const itemScroll: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const listScroll: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const weekOfMonth: (date: Moment) => number = (date: Moment): number => {
    const weekInYearIndex: number =
      date.year() !== date.weekYear()
        ? date
            .clone()
            .subtract(1, 'week')
            .week() + 1
        : date.week();

    return (
      weekInYearIndex -
      moment(date)
        .startOf('month')
        .week() +
      1
    );
  };

  // 토요일과 일요일을 제외한 moment 배열을 리턴하는 콜백 함수.
  const getWeekDayMoments: (
    start: Moment,
    end: Moment,
    arr?: Moment[],
  ) => Moment[] = (
    start: Moment,
    end: Moment,
    arr: Moment[] = [],
  ): moment.Moment[] => {
    if (start.isAfter(end)) {
      return arr;
    }
    if (start.day() === 0 || start.day() === 6) {
      return getWeekDayMoments(moment(start).add(1, 'day'), end, arr);
    }
    const array: Moment[] = arr.concat(start);
    return getWeekDayMoments(moment(start).add(1, 'day'), end, array);
  };

  const getMealList: () => ReactNodeArray[] = () => {
    const MealList: [
      JSX.Element[],
      JSX.Element[],
      JSX.Element[],
      JSX.Element[],
      JSX.Element[],
    ] = [[], [], [], [], []];

    if (getMealMonthStatus === 'success') {
      // 토요일과 일요일을 제외한 momnet 배열.
      const moments: Moment[] = getWeekDayMoments(
        moment().date(1),
        moment().endOf('month'),
      );

      moments.forEach((mealMoment: Moment) => {
        // meals에서 순서에 맞는 급식 정보를 찾기 위한 인덱스 변수.
        const mealIndex: number = meals.findIndex(
          (meal: MealItem) =>
            meal.date === mealMoment.date() &&
            meal.month === mealMoment.month() + 1,
        );
        const date: string = mealMoment.format('MM월 DD일');
        const isToday: boolean =
          moment().get('month') === mealMoment.get('month') &&
          moment().get('date') === mealMoment.get('date');
        // 요일
        const day: string = `${DAYS[mealMoment.get('d')]}요일`;
        // get week number as index of MealList
        // 지금이 몇번째 주인지 얻고, MealList의 인덱스로 활용하는 변수.
        const week: number = weekOfMonth(mealMoment) - 1;

        if (mealIndex >= 0) {
          MealList[week].push(
            <DetailMealItem
              key={mealMoment.date()}
              item={meals[mealIndex].detail.split(',')}
              date={date}
              today={isToday}
              day={day}
              // _ref={ref => (isToday ? (this.itemScroll = ref) : undefined)}
            />,
          );
        } else {
          MealList[week].push(
            <DetailMealItem
              key={mealMoment.date()}
              item={'급식 정보가\n없습니다'}
              date={date}
              today={isToday}
              day={day}
              // _ref={ref => (isToday ? (this.itemScroll = ref) : undefined)}
            />,
          );
        }
      });

      // 5개의 아이템이 차지 않은 MealList 요소를 빈 아이템으로 채움.
      MealList.forEach(
        (list: JSX.Element[], i: number, arr: JSX.Element[][]) => {
          if (list.length < 5) {
            const items: JSX.Element[] = [...Array(5 - list.length)].map(
              (_: null, i: number) => (
                <DetailMealItem
                  key={
                    moment()
                      .endOf('month')
                      .get('date') +
                    i +
                    1
                  }
                  item=''
                  date=''
                  today={false}
                  day=''
                />
              ),
            );

            if (i === 0) {
              arr[i] = list.concat(items).reverse();
            } else {
              arr[i] = list.concat(items);
            }
          }
        },
      );

      if (listScroll.current !== null && itemScroll.current !== null) {
        window.scrollTo(0, listScroll.current.offsetTop / 2);
        listScroll.current.scrollTo(itemScroll.current.offsetLeft - 160, 0);
      }

      return MealList;
    }

    return [[undefined]];
  };

  const mealList: ReactNodeArray[] = getMealList();

  useEffect(() => {
    getMeal({ accessToken, sort: 'month', month: moment().get('month') + 1 });
  }, []);

  useEffect(() => {
    if (
      prevProps?.getMealMonthStatus === 'pending' &&
      getMealMonthStatus === 'success'
    ) {
      setMeals(mealMonthList);
    }
  }, [getMealMonthStatus]);

  return (
    <MealWrapper>
      <h1 className='title'>{moment().month() + 1}월 급식표</h1>
      <ListWrapper>{mealList}</ListWrapper>
    </MealWrapper>
  );
};

export default DetailMealComponent;

// export default class DetailMealComponent extends React.Component<
//   DetailMealProps & DetailMealMethod
// > {
//   public state: { meals: MealItem[] } = {
//     meals: [],
//   };

//   public itemScroll: HTMLDivElement | null = null;

//   public listScroll: HTMLDivElement | null = null;

//   public componentDidMount() {
//     const { getMeal } = this.props;

//     getMeal({
//       accessToken: this.props.accessToken,
//       sort: 'month',
//       month: moment().get('month') + 1,
//     });
//   }

//   public componentDidUpdate(prevProps: DetailMealProps & DetailMealMethod) {
//     const { getMealMonthStatus, mealMonthList } = this.props;

//     if (
//       prevProps.getMealMonthStatus === 'pending' &&
//       getMealMonthStatus === 'success'
//     ) {
//       this.setState((state: { meals: MealItem[] }) => ({
//         meals: state.meals.concat(mealMonthList),
//       }));
//     }
//   }

//   public weekOfMonth(date: moment.Moment): number {
//     const weekInYearIndex =
//       date.year() !== date.weekYear()
//         ? date
//             .clone()
//             .subtract(1, 'week')
//             .week() + 1
//         : date.week();

//     return (
//       weekInYearIndex -
//       moment(date)
//         .startOf('month')
//         .week() +
//       1
//     );
//   }

//   // 토요일과 일요일을 제외한 moment 배열을 리턴하는 콜백 함수.
//   public getWeekDayMoments = (
//     start: moment.Moment,
//     end: moment.Moment,
//     arr: moment.Moment[] = [],
//   ): moment.Moment[] => {
//     if (start.isAfter(end)) {
//       return arr;
//     }
//     if (start.day() === 0 || start.day() === 6) {
//       return this.getWeekDayMoments(moment(start).add(1, 'day'), end, arr);
//     }
//     const array = arr.concat(start);
//     return this.getWeekDayMoments(moment(start).add(1, 'day'), end, array);
//   };

//   public render() {
//     const { meals } = this.state; // 리덕스의 mealList와 같음. cdu 참고.
//     const { getMealMonthStatus } = this.props;

//     // mealList(meals)를 렌더링 하기 위한 배열. 한달의 주 수와 같은 5줄을 렌더링 한다.
//     const MealList: [
//       JSX.Element[],
//       JSX.Element[],
//       JSX.Element[],
//       JSX.Element[],
//       JSX.Element[],
//     ] = [[], [], [], [], []];

//     if (getMealMonthStatus === 'success') {
//       // 토요일과 일요일을 제외한 momnet 배열.
//       const moments: moment.Moment[] = this.getWeekDayMoments(
//         moment().date(1),
//         moment().endOf('month'),
//       );

//       moments.forEach((mealMoment: moment.Moment) => {
//         // meals에서 순서에 맞는 급식 정보를 찾기 위한 인덱스 변수.
//         const mealIndex: number = meals.findIndex(
//           (meal: MealItem) =>
//             meal.date === mealMoment.date() &&
//             meal.month === mealMoment.month() + 1,
//         );
//         const dateString: string = mealMoment.format('MM월 DD일');
//         const todayBool: boolean =
//           moment().get('month') === mealMoment.get('month') &&
//           moment().get('date') === mealMoment.get('date');
//         // 요일
//         const day: string = days[mealMoment.get('d')];
//         // get week number as index of MealList
//         // 지금이 몇번째 주인지 얻고, MealList의 인덱스로 활용하는 변수.
//         const week: number = this.weekOfMonth(mealMoment) - 1;

//         if (mealIndex >= 0) {
//           MealList[week].push(
//             <DetailMealItem
//               key={mealMoment.date()}
//               item={meals[mealIndex].detail.split(',')}
//               date={dateString}
//               today={todayBool}
//               day={day}
//               _ref={ref => (todayBool ? (this.itemScroll = ref) : undefined)}
//             />,
//           );
//         } else {
//           MealList[week].push(
//             <DetailMealItem
//               key={mealMoment.date()}
//               item={'급식정보가\n없습니다'}
//               date={dateString}
//               today={todayBool}
//               day={day}
//               _ref={ref => (todayBool ? (this.itemScroll = ref) : undefined)}
//             />,
//           );
//         }
//       });

//       // 5개의 아이템이 차지 않은 MealList 요소를 빈 아이템으로 채움.
//       MealList.forEach((list: JSX.Element[], i: number, arr) => {
//         if (list.length < 5) {
//           const items = Array(5 - list.length)
//             .fill(null)
//             .map((_, i) => (
//               <DetailMealItem
//                 key={
//                   moment()
//                     .endOf('month')
//                     .get('date') +
//                   i +
//                   1
//                 }
//                 item=''
//                 date=''
//                 today={false}
//                 day=''
//               />
//             ));

//           if (i === 0) {
//             arr[i] = list.concat(items).reverse();
//           } else {
//             arr[i] = list.concat(items);
//           }
//         }
//       });

//       if (this.listScroll && this.itemScroll) {
//         window.scrollTo(0, this.listScroll.offsetTop / 2);
//         this.listScroll.scrollTo(this.itemScroll.offsetLeft - 160, 0);
//       }
//     }

//     return (
//       <>
//         {getMealMonthStatus === 'success' ? (
//           <MealWrapper>
//             <Wrapper>
//               <Title>급식 정보</Title>
//               {MealList.map((_, i) => {
//                 if (MealList[i].length) {
//                   return (
//                     <MealWeekWrapper key={i}>
//                       <MealWeekString>
//                         {moment().get('month') + 1}월 {weeksString[i]} 번째 주
//                       </MealWeekString>
//                       <MealWeekItemsWrapper
//                         ref={ref =>
//                           Math.ceil(moment().get('date') / 7) === i + 1
//                             ? (this.listScroll = ref)
//                             : null
//                         }
//                       >
//                         <MealWeekItems>{MealList[i]}</MealWeekItems>
//                       </MealWeekItemsWrapper>
//                     </MealWeekWrapper>
//                   );
//                 }
//                 return <></>;
//               })}
//             </Wrapper>
//           </MealWrapper>
//         ) : (
//           <MealWrapper style={{ height: '100%' }} />
//         )}
//       </>
//     );
//   }
// }
