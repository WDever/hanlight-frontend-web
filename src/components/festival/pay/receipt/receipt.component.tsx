import * as React from 'react';

import { numberWithComma } from 'lib/functions';
import { useDispatch, useSelector } from 'react-redux';
import { PayItemType } from 'store';
import styled from 'styled-components';
import ReceiptItemComponent from './receiptItem';

const Wrapper = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MoneyWrapper = styled.section`
  width: 82.5%;

  margin-top: 7.25rem;

  display: flex;
  flex-direction: column;
`;

const Money = styled.article`
  width: 100%;

  display: flex;
  justify-content: space-between;

  color: #e5e5e5;
  font-family: 'yg-jalnan';
  font-size: 0.875rem;

  p {
    margin: 0;
  }
`;

const Red = styled.p`
  color: #ff4755;
`;

const Blue = styled.p`
  color: #6488ff;
`;

const ListWrapper = styled.section`
  width: 91.1%;

  display: flex;
  flex-direction: column;

  margin-top: 1rem;

  overflow: scroll;
`;

export type ReceiptType = 'payment' | 'charge';

export interface ExDataBoothType {
  name: string;
  type: ReceiptType;
  items: PayItemType[];
  chargedMoney?: number;
  used: 'use' | 'refund' | '';
}

export interface ExDataType {
  data: ExDataBoothType[];
}

export const ExData: ExDataBoothType[] = [
  {
    name: 'G 101 - PUBA',
    type: 'payment',
    used: 'use',
    items: [
      { name: '프렌치 토스트', price: 1000, item_pk: 0, amount: 1 },
      { name: '프렌치 토스트', price: 2000, item_pk: 1, amount: 2 },
      { name: '프렌치 토스트', price: 3000, item_pk: 2, amount: 3 },
      { name: '프렌치 토스트', price: 4000, item_pk: 3, amount: 4 },
      { name: '프렌치 토스트', price: 5000, item_pk: 4, amount: 5 },
    ],
  },
  {
    name: '충전',
    type: 'charge',
    items: [],
    used: '',
  },
  {
    name: 'G 101 - PUBA',
    type: 'payment',
    used: '',
    items: [
      { name: '프렌치 토스트', price: 1000, item_pk: 0, amount: 1 },
      { name: '프렌치 토스트', price: 2000, item_pk: 1, amount: 2 },
      { name: '프렌치 토스트', price: 3000, item_pk: 2, amount: 3 },
      { name: '프렌치 토스트', price: 4000, item_pk: 3, amount: 4 },
      { name: '프렌치 토스트', price: 5000, item_pk: 4, amount: 5 },
    ],
  },
  {
    name: '충전',
    type: 'charge',
    items: [],
    used: '',
  },
  {
    name: 'G 101 - PUBA',
    type: 'payment',
    used: '',
    items: [
      { name: '프렌치 토스트', price: 1000, item_pk: 0, amount: 1 },
      { name: '프렌치 토스트', price: 2000, item_pk: 1, amount: 2 },
      { name: '프렌치 토스트', price: 3000, item_pk: 2, amount: 3 },
      { name: '프렌치 토스트', price: 4000, item_pk: 3, amount: 4 },
      { name: '프렌치 토스트', price: 5000, item_pk: 4, amount: 5 },
    ],
  },
  {
    name: '충전',
    type: 'charge',
    items: [],
    used: '',
  },
  {
    name: 'G 101 - PUBA',
    type: 'payment',
    used: '',
    items: [
      { name: '프렌치 토스트', price: 1000, item_pk: 0, amount: 1 },
      { name: '프렌치 토스트', price: 2000, item_pk: 1, amount: 2 },
      { name: '프렌치 토스트', price: 3000, item_pk: 2, amount: 3 },
      { name: '프렌치 토스트', price: 4000, item_pk: 3, amount: 4 },
      { name: '프렌치 토스트', price: 5000, item_pk: 4, amount: 5 },
    ],
  },
  {
    name: '충전',
    type: 'charge',
    items: [],
    used: '',
  },
  {
    name: 'G 101 - PUBA',
    type: 'payment',
    used: '',
    items: [
      { name: '프렌치 토스트', price: 1000, item_pk: 0, amount: 1 },
      { name: '프렌치 토스트', price: 2000, item_pk: 1, amount: 2 },
      { name: '프렌치 토스트', price: 3000, item_pk: 2, amount: 3 },
      { name: '프렌치 토스트', price: 4000, item_pk: 3, amount: 4 },
      { name: '프렌치 토스트', price: 5000, item_pk: 4, amount: 5 },
    ],
  },
  {
    name: '충전',
    type: 'charge',
    items: [],
    used: '',
  },
];

const ReceiptComponent: React.FC = () => {
  const receiptList = ExData.map((item, i) => (
    <ReceiptItemComponent
      name={item.name}
      type={item.type}
      items={item.items}
      userMoney={60000}
      chargedMoney={60000}
      used={item.used}
      key={i}
    />
  ));

  return (
    <Wrapper>
      <MoneyWrapper>
        <Money>
          구매 총액<Red>{numberWithComma(36000)}원</Red>
        </Money>
        <Money>
          충전 총액<Blue>{numberWithComma(36000)}원</Blue>
        </Money>
      </MoneyWrapper>
      <ListWrapper>{receiptList}</ListWrapper>
    </Wrapper>
  );
};

export default ReceiptComponent;
