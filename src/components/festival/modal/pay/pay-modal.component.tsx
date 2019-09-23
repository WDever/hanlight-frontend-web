import * as React from 'react';

import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { festivalActions, festivalReducerActions } from 'store';
import styled from 'styled-components';
import {
  AcceptBtn,
  BtnWrapper,
  CancelBtn,
  ChildrenModalProps,
} from '../fs-modal.component';

const { useState } = React;

const Content = styled.section`
  max-width: 14.625rem;
  margin: 1rem 0 1.25rem 0;
`;

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

const PayModalComponent: React.FC<ChildrenModalProps> = ({
  content,
  acceptEvent,
  type,
}) => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { toggleModal } = festivalActions;

  const numberWithComma = (num: number) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const [totalPrice, setTotalPrice] = useState<string>(() => {
    let result: number = 0;

    if (content instanceof Array) {
      content.map((item, i) => {
        result += item.amount * item.price;
      });
    }

    return numberWithComma(result);
  });

  const itemList =
    content instanceof Array
      ? content.map((item, i) => (
          <ItemContent key={i}>
            {item.name} {item.amount}개
          </ItemContent>
        ))
      : [];

  return (
    <>
      <Content>
        {type !== 'refund-check' ? (
          itemList
        ) : (
          <ItemContent>
            정상적으로 환불되었습니다
            <br />
            잔액을 확인해주세요
          </ItemContent>
        )}
        {type === 'payment' && <TotalPrice>총합 {totalPrice} 원</TotalPrice>}
      </Content>
      <BtnWrapper>
        <AcceptBtn
          onClick={() => {
            acceptEvent();
            dispatch(toggleModal({ status: false }));
          }}
        >
          확인
        </AcceptBtn>
        <CancelBtn onClick={() => dispatch(toggleModal({ status: false }))}>
          취소
        </CancelBtn>
      </BtnWrapper>
    </>
  );
};

export default PayModalComponent;
