import * as React from 'react';

import { Device } from 'lib/styles';
import styled from 'styled-components';

interface ItemProps {
  today: boolean;
  year: string;
  month: string;
  day: string;
  contents: string;
}

const Wrapper = styled.div<{ today: boolean }>`
  width: 100%;
  max-width: 12.5rem;
  height: 16.575rem;
  border: solid 1px #b9b9b9;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

  &:hover {
    box-shadow: 0 6px 30px 0 rgba(139, 139, 139, 0.16);
    border: none;
  }

  @media ${Device.mobileL} {
    width: 6rem;
    height: 8rem;

    &:hover {
      box-shadow: 0 10px 20px 0 rgba(101, 101, 101, 0.16);
    }
  }
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-family: 'Spoqa Han Sans';
  font-weight: normal;
  color: #000000;
  font-size: 1rem;
`;

const Content = styled.span`
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  color: #4470ff;
  font-size: 1.5rem;
`;

const Colored = styled.span`
  color: #4470ff;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailCalendarItem: React.FC<ItemProps> = ({
  today,
  year,
  month,
  day,
  contents,
}) => {
  return (
    <Wrapper today={today}>
      <ContentsWrapper>
        <DateWrapper>
          <Title>{today ? '오늘은' : '다가오는'}</Title>
          <Title>
            {year}년<Colored> {month}</Colored>월<Colored> {day}</Colored>일
          </Title>
        </DateWrapper>
        {contents.split(/,|\s/g).map((content, i) => (
          <Content key={i}>{content}</Content>
        ))}
      </ContentsWrapper>
    </Wrapper>
  );
};

export default DetailCalendarItem;
