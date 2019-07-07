import { Device } from 'lib/styles';
import * as React from 'react';
import styled from 'styled-components';

interface BoxProps {
  active: boolean;
}

interface TextProps {
  contents?: boolean;
}

interface Props extends BoxProps, TextProps {
  index: number;
  sub: string;
}

const ItemBox = styled.div<BoxProps>`
  width: 8.8rem;
  max-width: 8.8rem;
  height: 10.55rem;
  border-radius: 2rem;
  background-color: ${props => (props.active ? '#4470ff' : '#ffffff')};
  border: ${props => !props.active && 'solid 1px #b1b1b1'};
  box-shadow: ${props =>
    props.active && '0 6px 25px 0 rgba(68, 112, 255, 0.4)'};
  color: ${props => (props.active ? 'black' : 'white')};
  font-family: 'Spoqa Han Sans';
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${Device.laptop} {
    width: 13%;
    height: 10rem;
  }
  @media ${Device.tablet} {
    width: 7.05rem;
    height: 8.45rem;
    margin-right: 1.07rem;
    box-shadow: none;
    border-radius: 1rem;
  }
  @media ${Device.mobileL} {
    width: 5.1rem;
    height: 6.12rem;
  }
`;

const Title = styled.span<{ active: boolean }>`
  color: ${props => (props.active ? '#ffffff' : '#000000')};
  font-family: inherit;
  font-weight: normal;
  font-size: 1.125rem;

  @media ${Device.tablet} {
    font-size: 0.875rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.68rem;
  }
`;
const Content = styled.span<{ active: boolean }>`
  color: ${props => (props.active ? '#ffffff' : '#000000')};
  font-family: inherit;
  font-weight: bold;
  font-size: 1.75rem;

  @media ${Device.tablet} {
    font-size: 1.25rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.875rem;
  }
`;

const TimeTableItem: React.FC<Props> = ({ active, index, sub }) => (
  <ItemBox active={active}>
    <Title active={active}>{index}교시</Title>
    <Content active={active}>{sub}</Content>
  </ItemBox>
);

export default TimeTableItem;
