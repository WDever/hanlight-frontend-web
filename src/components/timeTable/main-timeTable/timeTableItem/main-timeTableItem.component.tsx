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
`;

const Subject = styled.h1`
  font-family: inherit;
  font-weight: 900;
  font-size: 1.25rem;

  margin: 0;
`;

const Teacher = styled.h2`
  font-family: inherit;
  font-weight: 500;
  font-size: 15px;

  margin: 0;
`;

/* eslint-enable @typescript-eslint/typedef */

const TimeTableItem: React.FC<Props> = ({ active, sub }: Props) => (
  <ItemWrapper active={active}>
    <Subject>{sub}</Subject>
    <Teacher>{sub}</Teacher>
  </ItemWrapper>
);

export default TimeTableItem;
