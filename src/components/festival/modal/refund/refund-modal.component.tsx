import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  PayItemType,
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

const Red = styled.span`
  color: #ff4755;
`;

const RefundModalComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { toggleModal } = festivalActions;

  const { modalData } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );
  const { content, type } = modalData.data;

  const itemList =
    content instanceof Array
      ? content.map((item, i) => (
          <ItemContent key={i}>
            {item.name} {item.amount}개
          </ItemContent>
        ))
      : [];

  const Title =
    type === 'refund-check' ? (
      <>
        <Red>환불</Red>되었습니다.
      </>
    ) : (
      <>
        정말 <Red>환불</Red>하시겠습니까?
      </>
    );

  const Content =
    type === 'refund-check' ? (
      '정상적으로 환불 되었습니다. 잔액을 확인해주세요.'
    ) : (
      <>{itemList}</>
    );

  const refundFunc = () => {};

  return type === 'refund-check' ? (
    <FSBaseModalComponent title={Title} content={Content} />
  ) : (
    <FSBaseModalComponent
      title={Title}
      content={Content}
      onAcceptClick={refundFunc}
    />
  );
};

export default RefundModalComponent;
