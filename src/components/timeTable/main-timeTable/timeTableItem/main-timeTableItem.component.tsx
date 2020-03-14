import { Device } from 'lib/styles';
import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface BoxProps {
  active: boolean;
}

interface TextProps {
  contents?: boolean;
}

interface Props extends BoxProps, TextProps {
  sub: string;
}

/* eslint-disable @typescript-eslint/typedef */

const ItemWrapper = styled.article<BoxProps>`
  width: 8.125rem;
  height: 8.125rem;

  border-radius: 1rem;

${({ theme, active }): FlattenSimpleInterpolation =>
  active
    ? css`
        background-image: ${theme.mainCard.timetable.activeItemColor};
      `
    : css`
        background-color: ${theme.mainCard.timetable.inactiveItemColor};
      `}

  box-shadow: ${({ theme, active }): string | undefined =>
    active ? theme.mainCard.timetable.activeItemShadow : undefined};

  color: ${({ theme, active }): string =>
    active
      ? theme.mainCard.timetable.activeItemFontColor
      : theme.mainCard.timetable.inactiveItemFontColor};

  font-family: 'Noto Sans KR';

  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${Device.laptopS} {
    width: 13%;
    height: 10rem;
  }
  @media ${Device.tabletL} {
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

const Subject = styled.h1`
  font-family: inherit;
  font-weight: 900;
  font-size: 1.25rem;

  margin: 0;

  @media ${Device.tabletL} {
    font-size: 0.875rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.68rem;
  }
`;

const Teacher = styled.h2`
  font-family: inherit;
  font-weight: 500;
  font-size: 15px;

  margin: 0;

  @media ${Device.tabletL} {
    font-size: 1.25rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.875rem;
  }
`;

/* eslint-enable @typescript-eslint/typedef */

const TimeTableItem: React.FC<Props> = ({ active, sub }: Props) => (
  <ItemWrapper active={active}>
    <Subject>{sub}</Subject>
    <Teacher>{sub}</Teacher>
  </ItemWrapper>
);

export default TimeTableItem;
