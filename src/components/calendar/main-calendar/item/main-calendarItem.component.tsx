import * as React from 'react';

import { Device } from 'lib/styles';
import styled, { css } from 'styled-components';

interface ItemProps {
  today: boolean;
  year: number;
  month: number;
  day: number;
  contents: string;
}

const Wrapper = styled.div<{ today: boolean }>`
  width: 15.875rem;
  height: 15.875rem;

  box-shadow: ${props =>
    props.today ? '0 6px 30px 0 rgba(139, 139, 139, 0.16)' : 'none'};
  border: ${props => (props.today ? 'none' : 'solid 1px #b9b9b9')};
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

  @media ${Device.laptopS} {
    width: 13.85rem;
    height: 13.85rem;
  }
  @media ${Device.tabletL} {
    width: 11.85rem;
    height: 11.85rem;
    margin-right: 1.75rem;
    ${({ today }) =>
      today &&
      css`
        box-shadow: none;
        border: solid 1px #4470ff;
        background-color: #4470ff;
      `}
  }
  @media ${Device.mobileL} {
    width: 8.58rem;
    height: 8.58rem;
    margin-right: 1.29rem;
  }
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
`;

const Title = styled.span`
  font-family: 'Spoqa Han Sans';
  font-weight: normal;
  color: inherit;
  font-size: 1rem;

  @media ${Device.mobileL} {
    font-size: 0.8125rem;
  }
`;

const Content = styled.span<{ today: boolean }>`
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1rem;
  margin-top: 3px;
  color: #4470ff;

  @media ${Device.tabletL} {
    color: ${props => (props.today ? '#ffffff' : '#4470ff')};
    font-size: 1.25rem;
  }
  @media ${Device.mobileL} {
    font-size: 1rem;
  }
`;

const DateWrapper = styled.div<{ today: boolean }>`
  color: #000000;
  margin-bottom: 0.75rem;
  line-height: 1.5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${Device.tabletL} {
    margin-bottom: 0.64rem;
    color: ${props => (props.today ? '#ffffff' : '#000000')};
  }
  @media ${Device.mobileL} {
    margin-bottom: 0.15rem;
  }
`;

const MainCalendarItem: React.FC<ItemProps> = ({
  today,
  year,
  month,
  day,
  contents,
}) => {
  return (
    <Wrapper today={today}>
      <ContentsWrapper>
        <DateWrapper today={today}>
          <Title>{today ? '오늘은' : '다가오는'}</Title>
          <Title>
            {year}년 {month}월 {day}일
          </Title>
        </DateWrapper>
        {contents.split(/,|\s/g).map((content, i) => (
          <Content key={i} today={today}>
            {content}
          </Content>
        ))}
      </ContentsWrapper>
    </Wrapper>
  );
};

export default MainCalendarItem;
