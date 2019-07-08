import * as React from 'react';

import styled, { css } from 'styled-components';

interface MealItemProps {
  today: boolean;
  item: boolean;
  visibility: boolean;
}

const ItemWrapper = styled.div<MealItemProps>`
  width: 18%;
  height: 17.9187rem;
  max-width: 13.5437rem;
  font-family: 'Spoqa Han Sans';
  font-style: normal;
  font-stretch: normal;
  border-radius: 2rem;

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
  visibility: ${props => (props.visibility ? 'visible' : 'hidden')};
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
  visibility?: boolean
}> = ({ item, date, day, today, listLength = 5, visibility = true }) => {
  return item instanceof Array ? (
    <ItemWrapper item={true} today={today} visibility={visibility}>
      <Day>{day}</Day>
      <Items>
        {item.map((meal, i) => (
          <span key={i}>{meal}</span>
        ))}
      </Items>
      <Date>{date}</Date>
    </ItemWrapper>
  ) : (
    <ItemWrapper item={false} today={today} visibility={visibility}>
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
