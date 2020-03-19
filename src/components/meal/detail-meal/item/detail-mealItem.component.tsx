import React, { ReactNodeArray } from 'react';

import { Device } from 'lib/styles';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

/* eslint-disable @typescript-eslint/typedef */

const ItemWrapper = styled.div<{ today: boolean }>`
  width: 13.75rem;
  height: 17.5rem;

  display: flex;
  flex-direction: column;

  padding: 2rem 1.5rem 3rem 1.5rem;

  box-sizing: border-box;

  border-radius: 1rem;

  ${({ theme, today }): FlattenSimpleInterpolation => {
    if (today) {
      return css`
        background-image: ${theme.detail.meal.activeItem};
        transform: translateY(-1rem);
        box-shadow: ${theme.detail.meal.activeItemShadow};
      `;
    }

    return css`
      background-color: ${theme.detail.meal.inActiveItem};
    `;
  }}

  font-family: 'Noto Sans KR';
  color: ${({ today, theme }): string =>
    today ? theme.detail.meal.activeFont : theme.detail.defaultFont};

  div {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    margin-bottom: 1.25rem;

    h1 {
      margin: 0;
      font-size: 1.25rem;
    }

    h2 {
      margin: 0;

      font-weight: normal;
      font-size: 17px;
    }
  }

  p {
    margin: 0;
    margin-bottom: 0.25rem;

    font-size: 15px;
  }

  h3 {
    align-self: center;
  }

  @media ${Device.tabletL} {
    width: 11.625rem;
    height: 15.625rem;
    margin-right: 1.75rem;
    box-shadow: none;
    border-radius: 1rem;
  }
  @media ${Device.mobileL} {
    width: 7.3rem;
    height: 9.43rem;
    margin-right: 1.1rem;
  }
`;

/* eslint-enable @typescript-eslint/typedef */
// const DetailMealItem: React.FC<{
//   item: string[] | string;
//   date: string;
//   day: string;
//   today: boolean;
//   // _ref?(ref: HTMLDivElement | null): void;
// }> = ({ _ref, item, date, day, today }) => {
//   return item instanceof Array ? (
//     <ItemWrapper ref={_ref} item today={today}>
//       <Day>{day}</Day>
//       <Items>
//         {item.map((meal, i) => (
//           <span key={i}>{meal}</span>
//         ))}
//       </Items>
//       <Date>{date}</Date>
//     </ItemWrapper>
//   ) : (
//     <ItemWrapper ref={_ref} item={false} today={today}>
//       <NoItemWrapper>
//         <NoItems today={today}>
//           {item.split('\n').map((line, i) => (
//             <NoItem key={i}>{line}</NoItem>
//           ))}
//         </NoItems>
//         <Date>{date}</Date>
//       </NoItemWrapper>
//     </ItemWrapper>
//   );
// };

interface Props {
  item: string[] | string;
  date: string;
  day: string;
  today: boolean;
  _ref?(ref: HTMLDivElement | null): void;
}

const DetailMealItem: React.FC<Props> = ({
  item,
  date,
  day,
  today,
  _ref,
}: Props) => {
  if (item instanceof Array) {
    const itemList: ReactNodeArray = item.map((item: string, i: number) => (
      <p key={i}>{item}</p>
    ));

    return (
      <ItemWrapper ref={_ref} today={today}>
        <div>
          <h1>{day}</h1>
          <h2>{date}</h2>
        </div>
        {itemList}
      </ItemWrapper>
    );
  }

  return (
    <ItemWrapper ref={_ref} today={today}>
      <div>
        <h1>{day}</h1>
        <h2>{date}</h2>
      </div>
      <h3>{item}</h3>
    </ItemWrapper>
  );
};

export default DetailMealItem;
