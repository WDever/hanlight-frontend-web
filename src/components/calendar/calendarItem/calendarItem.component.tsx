import * as React from 'react';
import styled from 'styled-components';

interface BoxProps {
  today: boolean;
}

interface TextProps {
  content?: boolean;
}

interface ItemProps extends BoxProps {
  year: string;
  month: string;
  day: string;
  contents: string;
}

const Box = styled.div<BoxProps>`
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
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Texts = styled.span<TextProps>`
  font-family: 'Spoqa Han Sans';
  font-weight: ${props => (props.content ? 'bold' : 'normal')};
  color: ${props => (props.content ? '#4470ff' : 'black')};
  font-size: ${props => (props.content ? '2rem' : '1rem')};
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

const CalendarItem: React.FC<ItemProps> = ({
  year,
  month,
  day,
  contents,
  today,
}) => (
  <Box today={today}>
    <ContentsWrapper>
      <DateWrapper>
        <Texts>{today ? '오늘은' : '다가오는'}</Texts>
        <Texts>
          {year}년<Colored> {month}</Colored>월<Colored> {day}</Colored>일
        </Texts>
      </DateWrapper>
      {contents.split(',').map(content => (
        <Texts content={true}>{content}</Texts>
      ))}
    </ContentsWrapper>
  </Box>
);

export default CalendarItem;
