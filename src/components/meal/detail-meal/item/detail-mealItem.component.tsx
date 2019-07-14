import * as React from 'react';

import { Device } from 'lib/styles';
import styled, { css } from 'styled-components';

interface MealItemProps {
  today: boolean;
  item: boolean;
}

const ItemWrapper = styled.div<MealItemProps>`
  width: 18%;
  height: 17.9187rem;
  max-width: 13.5437rem;
  font-family: 'Spoqa Han Sans';
  font-style: normal;
  font-stretch: normal;
  border-radius: 2rem;
  position: relative;

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

  @media ${Device.tabletL} {
    width: 11.625rem;
    height: 15.625rem;
    margin-right: 1.75rem;
    box-shadow: none;
    border-radius: 1rem;
    border: ${({ today }) => !today && 'solid 1px #aaaaaa'};
  }
  @media ${Device.mobileL} {
    width: 7.3rem;
    height: 9.43rem;
    margin-right: 1.1rem;
  }
`;

const Day = styled.div`
  height: 3rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1.75rem;

  @media ${Device.tabletL} {
    margin-left: 1.4rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.875rem;
    margin-left: 0.875rem;
    margin-top: 0.8rem;
  }
`;

const Items = styled.div`
  height: 11rem;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-left: 1.75rem;
  display: flex;
  flex-direction: column;

  @media ${Device.tabletL} {
    line-height: 1.2;
    margin-left: 1.4rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.625rem;
    margin-left: 0.875rem;
  }
`;

const Date = styled.span`
  display: flex;
  justify-content: flex-end;
  margin-right: 1.75rem;
  margin-bottom: 1.125rem;
  font-size: 1rem;
  font-weight: bold;

  @media ${Device.mobileL} {
    font-size: 0.625rem;
    margin-right: 0.93rem;
    margin-bottom: 0.71rem;
  }
`;

const NoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(50% + 2.1875rem);

  @media ${Device.mobileL} {
    height: calc(50% + 1.375rem);
  }
`;

const NoItems = styled.div<{ today: boolean }>`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: ${({ today }) => (today ? '#ffffff' : '#414141')};
  display: grid;

  @media ${Device.mobileL} {
    font-size: 0.9rem;
  }
`;

const NoItem = styled.span`
  display: block;
`;

const DetailMealItem: React.FC<{
  item: string[] | string;
  date: string;
  day: string;
  today: boolean;
  _ref?(ref: HTMLDivElement | null): void;
}> = ({ _ref, item, date, day, today }) => {
  return item instanceof Array ? (
    <ItemWrapper ref={_ref} item={true} today={today}>
      <Day>{day}</Day>
      <Items>
        {item.map((meal, i) => (
          <span key={i}>{meal}</span>
        ))}
      </Items>
      <Date>{date}</Date>
    </ItemWrapper>
  ) : (
    <ItemWrapper ref={_ref} item={false} today={today}>
      <NoItemWrapper>
        <NoItems today={today}>
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
