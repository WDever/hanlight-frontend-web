import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  FSReciptItemModel,
  FSReciptModel,
  UserModel,
} from 'store';
import styled from 'styled-components';
import FSBaseModalComponent from '../base';

const ItemContent = styled.h1`
  margin: 0;

  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  font-weight: normal;
  color: rgba(255, 255, 255, 0.87);

  text-align: center;
`;

const Blue = styled.span`
  color: #6488ff;
`;

const UseModalComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { toggleModal, postReceiptConfirm } = festivalActions;

  const { modalData } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );
  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);

  const { content, receiptItem } = modalData.data;

  const receipt_pk: number = receiptItem ? receiptItem : 0;

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
      <Blue>사용</Blue>하시겠습니까?
    </>
  );

  const Content = <>{itemList}</>;

  const useFunc = () =>
    dispatch(postReceiptConfirm({ accessToken, receipt_pk }));

  return (
    <FSBaseModalComponent
      title={Title}
      content={Content}
      onAcceptClick={useFunc}
    />
  );
};

export default UseModalComponent;
