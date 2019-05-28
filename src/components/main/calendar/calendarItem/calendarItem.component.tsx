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
  date: string;
  contents: string;
  today?: boolean;
}

const Box = styled.div<BoxProps>`
  width: 27.5rem;
  height: 27.5rem;
  box-shadow: ${props => (props.active ? '0 30px 80px 0 rgba(139, 139, 139, 0.25)' : 'none')};
  border: ${props => (props.active ? 'none' : 'solid 1px #b9b9b9')};
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
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
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  color: ${props => (props.active ? '#4470ff' : 'black')};
  font-size: ${props => (props.contents ? '3rem' : '1.5rem')};
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CalendarItem: React.FC<ItemProps> = ({
  active = false,
  date,
  contents,
  today,
}) => (
  <Box active={active}>
    <ContentsWrapper>
      <DateWrapper>
        <Texts>{today ? '오늘은' : '다가오는'}</Texts>
        <Texts>{date}</Texts>
      </DateWrapper>
      <Texts contents active={active}>
        {contents}
      </Texts>
    </ContentsWrapper>
  </Box>
);

export default CalendarItem;
