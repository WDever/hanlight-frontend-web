import * as React from 'react';

import styled from 'styled-components';

export const MealItemWrapper = styled.div<{
  today: boolean;
  item: boolean;
  type: 'main' | 'detail';
}>`
  width: ${props => (props.type === 'main' ? '15.225rem' : '18%')};
  max-width: ${props => (props.type === 'main' ? 'none' : '13.54375rem')}
  height: ${props => (props.type === 'main' ? '20.1875rem' : '17.91875rem')};
  font-family: 'Spoqa Han Sans';
  border-radius: 32px;
  box-shadow: ${props =>
    props.today
      ? '0 30px 80px 0 rgba(255, 0, 0, 0.25)'
      : '0 40px 60px 0 rgba(101, 101, 101, 0.16)'};
  background-color: ${props => (props.today ? '#ff476c' : '#ffffff')};
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.item ? 'space-between' : 'flex-end')};
  font-style: normal;
  font-stretch: normal;
  color: ${props => (props.today ? '#ffffff' : '#000000')};
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
}> = ({ item, date, day, today, type }) => {
  return item instanceof Array ? (
    <MealItemWrapper item={true} type={type} today={today}>
      <MealItemDay type={type}>{day}</MealItemDay>
      <MealItems type={type}>
        {item.map((meal, i) => (
          <span key={i}>{meal}</span>
        ))}
      </MealItems>
      <MealDate type={type}>{date}</MealDate>
    </MealItemWrapper>
  ) : (
    <MealItemWrapper item={false} today={today} type={type}>
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
