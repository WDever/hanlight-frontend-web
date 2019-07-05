import * as React from 'react';

import styled, { css } from 'styled-components';

interface MealItemProps {
  today: boolean;
  item: boolean;
  listLength: number;
}

const ItemWrapper = styled.div<MealItemProps>`
  width: ${({ listLength }) =>
    (233.28 / (window.innerWidth * (90 / 100) * ((listLength * 20) / 100))) *
    100}%;
  height: 17.91875rem;
  max-width: 13.54375rem;

  font-family: 'Spoqa Han Sans';
  font-style: normal;
  font-stretch: normal;

  border-radius: 32px;
  ${({ today }) =>
    today
      ? css`
          box-shadow: 0 30px 80px 0 rgba(255, 0, 0, 0.25);
          background-color: #ff476c;
          color: #ffffff;
        `
      : css`
          box-shadow: 0 40px 60px 0 rgba(101, 101, 101, 0.16);
          background-color: #ffffff;
          color: #000000;
        `}

  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.item ? 'space-between' : 'flex-end')};
`;

const Day = styled.div`
  height: 3rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1.75rem;
`;

const Items = styled.div`
  font-size: 1.1rem;
  height: 11rem;
  margin-left: 1.75rem;
  display: flex;
  flex-direction: column;
`;

const Date = styled.span`
  display: flex;
  justify-content: flex-end;
  margin-right: 1.75rem;
  margin-bottom: 1.125rem;
  font-size: 1rem;
  font-weight: bold;
`;

const NoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(50% + 2.1875rem);
`;

const NoItems = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #414141;
  display: grid;
`;

const NoItem = styled.span`
  display: block;
`;

const DetailMealItem: React.FC<{
  item: string[] | string;
  date: string;
  day: string;
  today: boolean;
  listLength?: number;
}> = ({ item, date, day, today, listLength = 5 }) => {
  return item instanceof Array ? (
    <ItemWrapper item={true} today={today} listLength={listLength}>
      <Day>{day}</Day>
      <Items>
        {item.map((meal, i) => (
          <span key={i}>{meal}</span>
        ))}
      </Items>
      <Date>{date}</Date>
    </ItemWrapper>
  ) : (
    <ItemWrapper item={false} today={today} listLength={listLength}>
      <NoItemWrapper>
        <NoItems>
          {item.split('\n').map((line, i) => (
            <NoItem key={i}>{line}</NoItem>
          ))}
        </NoItems>
        <Date>{date}</Date>
      </NoItemWrapper>
    </ItemWrapper>
  );
};

export default DetailMealItem;
