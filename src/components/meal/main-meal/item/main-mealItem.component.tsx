import * as React from 'react';

import { Device } from 'lib/styles';
import styled, { css } from 'styled-components';

interface MealItemProps {
  today: boolean;
  item: boolean;
}

const ItemWrapper = styled.div<MealItemProps>`
  position: relative;
  width: 15.225rem;
  height: 100%;
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
  
  @media ${Device.laptopS} {
    width: 13.225rem;
  }
  @media ${Device.tabletL} {
    width: 11rem;
    border-radius: 1rem;
    box-shadow: none;
    ${({ today }) =>
      !today &&
      css`
        border: solid 1px #e6e6e6;
      `}
    margin-right: 1.35rem;
  }
  @media ${Device.mobileL} {
    width: 8rem;
  }
`;

const Day = styled.div`
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1.75rem;

  @media ${Device.tabletL} {
    margin-left: 1.13rem;
    margin-top: 1rem;
    font-size: 1.125rem;
  }
  @media ${Device.mobileL} {
    margin-left: 0.95rem;
    margin-top: 0.61rem;
    font-size: 0.875rem;
  }
`;

const Items = styled.div`
  height: 13rem;
  font-size: 1.125rem;
  line-height: 1.5;
  margin-left: 1.75rem;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;

  @media ${Device.tabletL} {
    line-height: 1.11;
    margin-left: 1.13rem;
    margin-top: 0.81rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.75rem;
    margin-left: 0.95rem;
    margin-top: 0.7rem;
    line-height: 1.33;
  }
`;

const Date = styled.span`
  position: absolute;
  right: 1.75rem;
  bottom: 1.125rem;
  font-size: 1rem;

  @media ${Device.tabletL} {
    display: none;
  }
`;

const NoItemWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoItem = styled.div`
  font-size: 2.1875rem;
  font-weight: bold;
  text-align: center;
  display: grid;

  @media ${Device.tabletL} {
    font-size: 1.75rem;
  }
  @media ${Device.mobileL} {
    font-size: 1.1rem;
  }
`;

const NoItemContent = styled.span`
  display: block;
`;

const MainMealItem: React.FC<{
  item: string[] | string;
  date: string;
  day: string;
  today: boolean;
  style: React.CSSProperties;
}> = ({ today, item, date, day, style }) => {
  return item instanceof Array ? (
    <ItemWrapper style={style} item today={today}>
      <Day>{day}</Day>
      <Items>
        {item.map((meal, i) => (
          <span key={i}>{meal}</span>
        ))}
      </Items>
      <Date>{date}</Date>
    </ItemWrapper>
  ) : (
    <ItemWrapper style={style} item={false} today={today}>
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
