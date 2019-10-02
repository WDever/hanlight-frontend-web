import * as React from 'react';

import { numberWithComma } from 'lib/functions';
import { usePrevious } from 'lib/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  PayItemType,
  UserModel,
} from 'store';
import styled from 'styled-components';
import ReceiptItemComponent from './receiptItem';

const { useEffect, useState } = React;

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
      { name: '프렌치 토스트', price: 1000, item_pk: 0, amount: 1, shop_pk: 0 },
      { name: '프렌치 토스트', price: 2000, item_pk: 1, amount: 2, shop_pk: 0 },
      { name: '프렌치 토스트', price: 3000, item_pk: 2, amount: 3, shop_pk: 0 },
      { name: '프렌치 토스트', price: 4000, item_pk: 3, amount: 4, shop_pk: 0 },
      { name: '프렌치 토스트', price: 5000, item_pk: 4, amount: 5, shop_pk: 0 },
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
      { name: '프렌치 토스트', price: 1000, item_pk: 0, amount: 1, shop_pk: 0 },
      { name: '프렌치 토스트', price: 2000, item_pk: 1, amount: 2, shop_pk: 0 },
      { name: '프렌치 토스트', price: 3000, item_pk: 2, amount: 3, shop_pk: 0 },
      { name: '프렌치 토스트', price: 4000, item_pk: 3, amount: 4, shop_pk: 0 },
      { name: '프렌치 토스트', price: 5000, item_pk: 4, amount: 5, shop_pk: 0 },
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
      { name: '프렌치 토스트', price: 1000, item_pk: 0, amount: 1, shop_pk: 0 },
      { name: '프렌치 토스트', price: 2000, item_pk: 1, amount: 2, shop_pk: 0 },
      { name: '프렌치 토스트', price: 3000, item_pk: 2, amount: 3, shop_pk: 0 },
      { name: '프렌치 토스트', price: 4000, item_pk: 3, amount: 4, shop_pk: 0 },
      { name: '프렌치 토스트', price: 5000, item_pk: 4, amount: 5, shop_pk: 0 },
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
      { name: '프렌치 토스트', price: 1000, item_pk: 0, amount: 1, shop_pk: 0 },
      { name: '프렌치 토스트', price: 2000, item_pk: 1, amount: 2, shop_pk: 0 },
      { name: '프렌치 토스트', price: 3000, item_pk: 2, amount: 3, shop_pk: 0 },
      { name: '프렌치 토스트', price: 4000, item_pk: 3, amount: 4, shop_pk: 0 },
      { name: '프렌치 토스트', price: 5000, item_pk: 4, amount: 5, shop_pk: 0 },
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
      { name: '프렌치 토스트', price: 1000, item_pk: 0, amount: 1, shop_pk: 0 },
      { name: '프렌치 토스트', price: 2000, item_pk: 1, amount: 2, shop_pk: 0 },
      { name: '프렌치 토스트', price: 3000, item_pk: 2, amount: 3, shop_pk: 0 },
      { name: '프렌치 토스트', price: 4000, item_pk: 3, amount: 4, shop_pk: 0 },
      { name: '프렌치 토스트', price: 5000, item_pk: 4, amount: 5, shop_pk: 0 },
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
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();

  const { getReceiptList } = festivalActions;

  const { shopList, festivalStatus, user, receiptList } = useSelector<
    AppState,
    FestivalModel
  >(state => state.festival);
  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);

  const { getReceiptListStatus } = festivalStatus;
  const prevStatus = usePrevious({ getReceiptListStatus });

  const mappedReceiptList = receiptList.map((item, i) => (
    <ReceiptItemComponent
      pk={item.pk}
      shop_name={item.shop_name}
      moneyAfter={item.moneyAfter}
      moneyBefore={item.moneyBefore}
      price={item.price}
      confirm={item.confirm}
      cancel={item.cancel}
      createdAt={item.createdAt}
      receiptItem={item.receiptItem}
      userMoney={user.money}
      key={i}
    />
  ));

  useEffect(() => {
    dispatch(getReceiptList({ accessToken }));
  }, []);

  return (
    <Wrapper>
      <MoneyWrapper>
        <Money/>
      </MoneyWrapper>
      <ListWrapper>{mappedReceiptList}</ListWrapper>
    </Wrapper>
  );
};

export default ReceiptComponent;
