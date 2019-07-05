import * as React from 'react';

import { Device } from 'lib/styles';
import styled, { css } from 'styled-components';

interface MealItemProps {
  today: boolean;
  item: boolean;
}

const ItemWrapper = styled.div<MealItemProps>`
  width: 15.225rem;
  height: 100%;
  font-family: 'Spoqa Han Sans';
  font-style: normal;
  font-stretch: normal;
  border-radius: 32px;

  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.item ? 'space-between' : 'flex-end')};
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
  

  @media ${Device.laptop} {
    width: 13.225rem;
  }
  @media ${Device.tablet} {
    width: 7.8rem;
    margin-right: 1.35rem;
    box-shadow: none;
  }
`;

const Day = styled.div`
  height: 3rem;
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1.75rem;

  @media ${Device.tablet} {
    margin-left: 0.93rem;
    margin-top: 0.6rem;
    font-size: 0.875rem;
  }
`;

const Items = styled.div`
  font-size: 1.125rem;
  height: 13rem;
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
`;

const NoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(50% + 2.1875rem);
`;

const NoItem = styled.div`
  font-size: 2.1875rem;
  font-weight: bold;
  text-align: center;
  color: #000000;
  display: grid;
`;

const NoItemContent = styled.span`
  display: block;
`;

const MainMealItem: React.FC<{
  item: string[] | string;
  date: string;
  day: string;
  today: boolean;
}> = ({ today, item, date, day }) => {
  return item instanceof Array ? (
    <ItemWrapper item={true} today={today}>
      <Day>{day}</Day>
      <Items>
        {item.map((meal, i) => (
          <span key={i}>{meal}</span>
        ))}
      </Items>
      <Date>{date}</Date>
    </ItemWrapper>
  ) : (
    <ItemWrapper item={false} today={today}>
      <NoItemWrapper>
        <NoItem>
          {item.split('\n').map((line, i) => (
            <NoItemContent key={i}>{line}</NoItemContent>
          ))}
        </NoItem>
        <Date>{date}</Date>
      </NoItemWrapper>
    </ItemWrapper>
  );
};

export default MainMealItem;
