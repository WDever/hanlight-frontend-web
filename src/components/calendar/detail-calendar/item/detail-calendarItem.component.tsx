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

  @media ${Device.tablet} {
    width: 11.125rem;
    height: 14.825rem;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-family: 'Spoqa Han Sans';
  font-weight: normal;
  color: #000000;
  font-size: 1rem;
  line-height: 1.5;

  @media ${Device.mobileL} {
    font-size: 0.69rem;
  }
`;

const Content = styled.span`
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1.5rem;
  color: #4470ff;

  @media ${Device.mobileL} {
    font-size: 0.69rem;
  }
`;

const DateWrapper = styled.div`
  margin-bottom: 0.75rem;
  line-height: 1.5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${Device.tablet} {
    margin-bottom: 0.925rem;
  }
  @media ${Device.mobileL} {
    margin-bottom: 0.33rem;
  }
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
            {year}년 {month}월 {day}일
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
