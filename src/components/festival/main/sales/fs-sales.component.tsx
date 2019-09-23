import * as React from 'react';

import { DefaultBoxOpacity } from 'lib/styles';
import styled from 'styled-components';

const { useState, useMemo } = React;

const Title = styled.section`
  width: 100%;

  font-family: 'Spoqa Han Sans';
  color: #e4e4e4;
  font-size: 0.875rem;

  display: flex;
  align-items: flex-end;

  margin-bottom: 1rem;

  h1 {
    margin: 0;

    width: 15rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-family: 'Spoqa Han Sans';
    font-weight: bold;
    color: #e4e4e4;
    font-size: 1rem;
  }
`;

const ItemBox = styled.section`
  width: 100%;
  height: 2.5rem;

  border-radius: 0.375rem;

  background-color: ${DefaultBoxOpacity};

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  color: #e4e4e4;

  margin: 0 0 0.5rem 0;

  :last-of-type {
    margin-bottom: 0.625rem;
  }

  h1 {
    margin: 0 0 0 15px;

    width: 5rem;

    font-family: inherit;
    font-size: inherit;
    font-weight: normal;

    span {
      color: #9f69e0;
    }
  }

  h2 {
    margin: 0;

    width: 2rem;

    display: flex;
    justify-content: flex-end;

    color: #b1b1b1;
    font-family: inherit;
    font-size: inherit;
    font-weight: normal;
  }

  h3 {
    margin: 0 1rem 0 0;

    width: 4rem;

    color: #6488ff;
    font-family: inherit;
    font-size: inherit;
    font-weight: normal;
  }
`;

const Separator = styled.hr`
  width: 100%;

  margin: 0;

  border: none;
  border-bottom: 1px solid #ffffff;
`;

const ExData = [
  { name: '고구마', amount: 19, price: 1000 },
  { name: '감자', amount: 12, price: 1000 },
  { name: '탄감자', amount: 4, price: 500 },
];

const ExData2 = { rank: 3, totalAmount: 35 };

const FSSalesComponent: React.FC = () => {
  const [totalSales, setTotalSales] = useState<number>(() => {
    let result: number = 0;
    ExData.map(item => {
      result += item.amount * item.price;
    });
    return result;
  });

  const itemList = ExData.map((item, i) => {
    return (
      <ItemBox key={i}>
        <h1>{item.name}</h1>
        <h2>{item.amount}개</h2>
        <h3>{item.amount * item.price}원</h3>
      </ItemBox>
    );
  });

  return (
    <>
      <Title>
        <h1>하나둘셋넷다섯여섯일곱여럽아홉열열하나열둘열셋열넷</h1>의 실시간
        매출
      </Title>
      {itemList}
      <Separator />
      <ItemBox>
        <h1>
          <span>전체 매출</span> {ExData2.rank}위
        </h1>
        <h2>{ExData2.totalAmount}개</h2>
        <h3>{totalSales}원</h3>
      </ItemBox>
    </>
  );
};

export default FSSalesComponent;
