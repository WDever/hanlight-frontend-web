import * as React from 'react';

import { Device } from 'lib/styles';
import styled, { css } from 'styled-components';

interface MealItemProps {
  today: boolean;
  item: boolean;
  type: 'main' | 'detail';
  listLength: number;
}

export const MealItemWrapper = styled.div<MealItemProps>`
  ${({ type }) =>
    type === 'main'
      ? css`
          @media only screen and ${Device.laptop} {
            width: 13.225rem;
          }
          width: 15.225rem;
          height: 100%;
        `
      : css`
          width: 18%;
          width: calc(18% + ${({ listLength }: MealItemProps) => ((5 - listLength) * 6)}%);
          height: 17.92rem;
          max-width: 13.54rem;
        `}

  font-family: 'Spoqa Han Sans';
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
  font-style: normal;
  font-stretch: normal;
`;

const MealItemDay = styled.div<{ type: 'main' | 'detail' }>`
  height: 3rem;
  margin-top: 1rem;
  font-size: ${props => (props.type === 'main' ? '2rem' : '1.5rem')};
  font-weight: bold;
  margin-left: 1.75rem;
`;

const MealItems = styled.div<{ type: 'main' | 'detail' }>`
  font-size: ${props => (props.type === 'main' ? '1.125rem' : '1.1rem')};
  height: ${props => (props.type === 'main' ? '13rem' : '11rem')};
  margin-left: 1.75rem;
  display: flex;
  flex-direction: column;
`;

export const MealDate = styled.span<{ type: 'main' | 'detail' }>`
  display: flex;
  justify-content: flex-end;
  margin-right: 1.75rem;
  margin-bottom: 1.125rem;
  font-size: 1rem;
  font-weight: ${props => (props.type === 'main' ? 'none' : 'bold')};
`;

const MealNoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(50% + 2.1875rem);
`;

const MealNoItems = styled.div<{ type: 'main' | 'detail' }>`
  font-size: ${props => (props.type === 'main' ? '2.1875rem' : '1.5rem')};
  font-weight: bold;
  text-align: center;
  color: ${props => (props.type === 'main' ? 'initial' : '#414141')};
  display: grid;
`;

const MealNoItem = styled.span`
  display: block;
`;

const MealItemComponent: React.FC<{
  type: 'main' | 'detail';
  item: string[] | string;
  date: string;
  day: string;
  today: boolean;
  listLength?: number;
}> = ({ item, date, day, today, type, listLength = 5 }) => {
  return item instanceof Array ? (
    <MealItemWrapper
      item={true}
      type={type}
      today={today}
      listLength={listLength}
    >
      <MealItemDay type={type}>{day}</MealItemDay>
      <MealItems type={type}>
        {item.map((meal, i) => (
          <span key={i}>{meal}</span>
        ))}
      </MealItems>
      <MealDate type={type}>{date}</MealDate>
    </MealItemWrapper>
  ) : (
    <MealItemWrapper
      item={false}
      today={today}
      type={type}
      listLength={listLength}
    >
      <MealNoItemWrapper>
        <MealNoItems type={type}>
          {item.split('\n').map((line, i) => (
            <MealNoItem key={i}>{line}</MealNoItem>
          ))}
        </MealNoItems>
        {type === 'main' && <MealDate type={type}>{date}</MealDate>}
      </MealNoItemWrapper>
    </MealItemWrapper>
  );
};

export default MealItemComponent;
