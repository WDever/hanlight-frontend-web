import * as React from 'react';
import styled from 'styled-components';

interface BoxProps {
  active?: boolean;
}

interface TextProps {
  contents?: boolean;
}

interface Props extends BoxProps, TextProps {
  index: number;
  sub: string;
}

const ItemBox = styled.div<BoxProps>`
  width: 12rem;
  height: 14.375rem;
  border-radius: 32px;
  border: ${props => (props.active ? 'none' : 'solid 1px #b1b1b1;')};
  background-color: ${props => (props.active ? '#4470ff' : 'ffffff')};
  box-shadow: ${props => (props.active ? '0 6px 30px 0 rgba(68, 112, 255, 0.4)' : 'none')};
  color: ${props => (props.active ? 'black' : 'white')};
  font-family: 'Spoqa Han Sans';
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Texts = styled.span<TextProps & BoxProps>`
  font-family: inherit;
  font-weight: ${props => (props.contents ? 'bold' : 'normal')};
  color: ${props => (props.active ? 'white' : 'black')};
  font-size: ${props => (props.contents ? '1.75rem' : '2.25rem')};
`;

const TimeTableItem: React.FC<Props> = ({ active, index, sub }) => (
  <ItemBox active={active}>
    <Texts active={active}>
      {index}
교시
    </Texts>
    <Texts contents active={active}>
      {sub}
    </Texts>
  </ItemBox>
);

export default TimeTableItem;
