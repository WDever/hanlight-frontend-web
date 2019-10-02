import * as React from 'react';

import { numberWithComma } from 'lib/functions';
import { DefaultBoxOpacity } from 'lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  ErrorModel,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  PaySalesItemModel,
  UserModel,
} from 'store';
import styled from 'styled-components';

const { useState, useEffect } = React;

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

const Box = styled.section`
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

    text-align: right;
  }
`;

const TotalSaleBox = styled(Box)`
  margin-top: 0.625rem;
`;

const Separator = styled.hr`
  width: 100%;

  margin: 0.125rem 0 0 0;

  border: none;
  border-bottom: 1px solid #ffffff;
`;

const AccessBlockBox = styled.section`
  width: 100%;
  min-height: 15.625rem;

  border-radius: 0.375rem;

  background-color: ${DefaultBoxOpacity};

  margin-top: 0.625rem;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: 'yg-jalnan';
    font-size: 1rem;
    color: #e4e4e4;

    span {
      color: #ff5677;
    }
  }
`;

const FSSalesComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { getShopPurchase } = festivalActions;

  const { accessToken, name: userName, type } = useSelector<
    AppState,
    UserModel
  >(state => state.user);
  const { shopPurchase, festivalStatus } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );

  const itemList =  shopPurchase.items.map(
    (item: PaySalesItemModel, i: number) => (
      <Box key={i}>
        <h1>{item.name}</h1>
        <h2>{item.count}개</h2>
        <h3>{item.totalPrice}원</h3>
      </Box>
    ),
  );

  useEffect(() => {
    if (type !== 'student') {
      return;
    }

    dispatch(getShopPurchase({ accessToken }));
  }, [accessToken]);

  return (
    <>
      {type === 'student' ? (
        <>
          <Title>
            <h1>{userName}</h1>의 실시간 매출
          </Title>
          {itemList}
          <Separator />
          <TotalSaleBox>
            <h2>{shopPurchase.items.reduce((prevItem, item) => prevItem + item.count, 0)}개</h2>
            <h3>{numberWithComma(shopPurchase.totalPrice)}원</h3>
          </TotalSaleBox>
        </>
      ) : (
        <>
          <AccessBlockBox>
            <h1>
              매출 확인 권한이 <span>없습니다.</span>
            </h1>
          </AccessBlockBox>
        </>
      )}
    </>
  );
};

export default FSSalesComponent;
