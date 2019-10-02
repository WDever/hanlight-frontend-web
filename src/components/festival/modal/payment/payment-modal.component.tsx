import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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

import { constants } from 'crypto';
import FSBaseModalComponent from '../base';

const { useState } = React;

const ItemContent = styled.h1`
  margin: 0;

  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  font-weight: normal;
  color: rgba(255, 255, 255, 0.87);

  text-align: center;
`;

const TotalPrice = styled.h2`
  margin: 0.75rem 0 0 0;

  text-align: center;

  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  font-weight: normal;
  color: #ff4755;
`;

const Blue = styled.span`
  color: #6488ff;
`;

const PayModalComponent: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();

  const { postShopPurchase } = festivalActions;

  const { modalData } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );
  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);

  const { content, shop } = modalData.data;

  const shopData: { shop_pk: number; items: PayItemType[] } = shop
    ? shop
    : {
        shop_pk: 0,
        items: [{ shop_pk: 0, name: '', price: 0, item_pk: 0, amount: 0 }],
      };

  const numberWithComma = (num: number) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const [totalPrice, setTotalPrice] = useState<string>(() => {
    if (!(content instanceof Array)) {
      return '';
    }

    return numberWithComma(
      content.reduce(
        (acc: number, cur: PayItemType): number =>
          (acc += cur.amount * cur.price),
        0,
      ),
    );
  });

  const itemList =
    content instanceof Array
      ? content.map((item, i) => (
          <ItemContent key={i}>
            {item.name} {item.amount}개
          </ItemContent>
        ))
      : [];

  const Title = (
    <>
      <Blue>결제</Blue>를 진행해주세요
    </>
  );

  const Content = (
    <>
      {itemList}
      <TotalPrice>총합 {totalPrice} 원</TotalPrice>
    </>
  );

  const paymentFunc = () => {
    dispatch(
      postShopPurchase({
        accessToken,
        shopPk: shopData.items[0].shop_pk,
        items: shopData.items,
      }),
    );
  };

  return (
    <FSBaseModalComponent
      title={Title}
      content={Content}
      onAcceptClick={paymentFunc}
    />
  );
};

export default withRouter(PayModalComponent);
