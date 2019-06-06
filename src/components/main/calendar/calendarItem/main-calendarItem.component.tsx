import * as React from 'react';
import styled from 'styled-components';

interface BoxProps {
  active?: boolean;
}

interface TextProps {
  date?: boolean;
  contents?: boolean;
}

interface ItemProps extends BoxProps {
  year: string;
  month: string;
  day: string;
  contents: string;
  today?: boolean;
}

const Box = styled.div<BoxProps>`
  width: 15.875rem;
  height: 15.875rem;
  box-shadow: ${props =>
    props.active
      ? ' 0 30px 80px 0 rgba(139, 139, 139, 0.25)'
      : '0 6px 30px 0 rgba(139, 139, 139, 0.16)'};
  /* border: ${props => (props.active ? 'none' : 'solid 1px #b9b9b9')}; */
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

const Texts = styled.span<TextProps & BoxProps>`
  font-family: ${props => (props.contents ? 'Spoqa Han Sans' : 'Noto Sans')};
  font-weight: ${props => (props.contents ? 'bold' : 'normal')};
  color: ${props => (props.contents ? '#4470ff' : 'black')};
  font-size: ${props => (props.contents ? '2rem' : '1rem')};
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
  active = false,
  year,
  month,
  day,
  contents,
  today,
}) => (
  <Box active={active}>
    <ContentsWrapper>
      <DateWrapper>
        <Texts>{today ? '오늘은' : '다가오는'}</Texts>
        <Texts>
          {year}년
          <Colored> {month}</Colored>월
          <Colored> {day}</Colored>일
        </Texts>
      </DateWrapper>
      <Texts contents={true} active={active}>
        {contents}
      </Texts>
    </ContentsWrapper>
  </Box>
);

export default CalendarItem;
