import * as React from 'react';

import { numberWithComma } from 'lib/functions';
import CoinIcon from 'lib/svg/woncoin.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import {
  AppState,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  FSShopListModel,
  PayItemType,
  UserModel,
} from 'store';
import styled from 'styled-components';

import { usePrevious } from 'lib/hooks';
import { categoryType } from '../pay.component';
import BoothComponent from './booth';

const { useMemo } = React;

const { useState, useEffect } = React;

const Wrapper = styled.section`
  width: 100%;
  height: calc(100% - 6.25rem);

  margin-top: 6.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.section`
  width: 88.9%;

  display: flex;
  justify-content: space-between;

  margin-top: 1rem;
  margin-bottom: 1rem;

  section {
    width: 50%;
  }

  h2 {
    font-family: 'yg-jalnan';
    font-size: 0.875rem;
    color: #6488ff;

    display: flex;
    align-items: center;

    margin: 0;

    img {
      width: 1.25rem;

      margin-right: 0.5rem;
      margin-bottom: 0.25rem;
    }
  }
`;

const Category = styled.button<{ active: boolean }>`
  font-family: 'yg-jalnan';
  font-size: 1rem;
  color: ${({ active }) => (active ? '#ffffff' : '#878787')};

  background-color: transparent;
  border: none;
  outline: none;

  padding: 0;

  margin-right: 1rem;
`;

const ListWrapper = styled.article`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 3.125rem;

  overflow-y: scroll;
`;

const SubmitBtn = styled.button`
  width: 100%;
  min-height: 3.125rem;

  color: ${({ disabled }) => (!disabled ? '#ffffff' : '#6e6e6e')};
  font-family: 'Spoqa Han Sans';
  font-size: 1.125rem;
  font-weight: bold;

  border: none;
  outline: none;

  position: fixed;
  bottom: 0;

  background-color: ${({ disabled }) => (!disabled ? '#6488ff' : '#404a6e')};
`;

const Floor = styled.h1`
  font-family: 'yg-jalnan';
  font-size: 1rem;
  color: #878787;

  width: 88.9%;
  margin: 1rem 0 0.5rem 0;
`;

export type paymentCategoryType = 'default' | 'popular' | 'sale';

export interface ExDataItemType {
  item_pk: number;
  name: string;
  price: number;
}

export interface ExDataBoothType {
  booth_pk: number;
  name: string;
  items: ExDataItemType[];
}

export interface ExDataType {
  floor: string;
  booths: ExDataBoothType[];
}

export const ExData: FSShopListModel = {
  '2': [
    {
      pk: 2,
      className: 'G3-1',
      name: '아빠?',
      location: 2,
      shopItem: [
        {
          pk: 5,
          name: '엄마',
          price: 500,
        },
        {
          pk: 6,
          name: '아이템',
          price: 10000,
        },
      ],
    },
    {
      pk: 3,
      className: 'G3-1',
      name: '아빠?',
      location: 2,
      shopItem: [
        {
          pk: 7,
          name: '엄마',
          price: 500,
        },
        {
          pk: 8,
          name: '아이템',
          price: 10000,
        },
      ],
    },
    {
      pk: 4,
      className: 'G3-1',
      name: '아빠?',
      location: 2,
      shopItem: [
        {
          pk: 9,
          name: '엄마',
          price: 500,
        },
        {
          pk: 10,
          name: '아이템',
          price: 10000,
        },
      ],
    },
  ],
  '-1': [
    {
      pk: 1,
      className: 'U3-2',
      name: '엄마분식',
      location: -1,
      shopItem: [
        {
          pk: 4,
          name: '피카츄',
          price: 50,
        },
        {
          pk: 1,
          name: '떡볶이',
          price: 1000,
        },
        {
          pk: 2,
          name: '오므라이스',
          price: 3000,
        },
        {
          pk: 3,
          name: '슬러쉬',
          price: 500,
        },
      ],
    },
  ],
  '3': [
    {
      pk: 5,
      className: 'U3-2',
      name: '엄마분식',
      location: -1,
      shopItem: [
        {
          pk: 4,
          name: '피카츄',
          price: 50,
        },
        {
          pk: 1,
          name: '떡볶이',
          price: 1000,
        },
        {
          pk: 2,
          name: '오므라이스',
          price: 3000,
        },
        {
          pk: 3,
          name: '슬러쉬',
          price: 500,
        },
      ],
    },
  ],
};

export interface CountItemType extends ExDataItemType {
  amount: number;
}

export interface CountBoothType {
  booth_pk: number;
  name: string;
  items: CountItemType[];
}

export interface CountDataType {
  floor: string;
  booths: CountBoothType[];
}

const FloorList = ['-1', '1', '2', '3', '4', '5'];

const PaymentComponent: React.FC<
  RouteComponentProps & {
    setPage: React.Dispatch<React.SetStateAction<categoryType>>;
  }
> = ({ history, setPage }) => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();

  const { toggleModal, getShopList, getMoney } = festivalActions;

  const { shopList, festivalStatus, user } = useSelector<
    AppState,
    FestivalModel
  >(state => state.festival);
  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);

  const {
    getShopListStatus,
    postShopPurchaseStatus,
    postReceiptConfirmStatus,
  } = festivalStatus;
  const prevStatus = usePrevious({
    getShopListStatus,
    postShopPurchaseStatus,
    postReceiptConfirmStatus,
  });

  const [category, setCategory] = useState<paymentCategoryType>('default');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [itemList, setItemList] = useState<PayItemType[]>([]);
  const [toggleBooth, setToggleBooth] = useState<number>(0);

  const changeCatgory = (e: React.MouseEvent<HTMLButtonElement>) =>
    setCategory(e.currentTarget.name as paymentCategoryType);

  const floorList = useMemo(
    () =>
      getShopListStatus === 'success'
        ? FloorList.map((location: string, i: number, org: string[]) => {
            if (!shopList[location]) {
              return;
            }

            if (category === 'default') {
              return (
                <>
                  <Floor>{location === '-1' ? 'B1' : location}층</Floor>
                  <BoothComponent
                    key={i}
                    booths={shopList[location]}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                    itemList={itemList}
                    setItemList={setItemList}
                    toggleBooth={toggleBooth}
                    setToggleBooth={setToggleBooth}
                  />
                </>
              );
            } else {
              return (
                <BoothComponent
                  key={i}
                  booths={shopList[location]}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  itemList={itemList}
                  setItemList={setItemList}
                  toggleBooth={toggleBooth}
                  setToggleBooth={setToggleBooth}
                />
              );
            }
          })
        : [],
    [
      category,
      toggleBooth,
      setToggleBooth,
      totalPrice,
      setTotalPrice,
      itemList,
      setItemList,
      shopList,
      getShopListStatus,
    ],
  );

  useEffect(() => {
    dispatch(getShopList({ accessToken, sort: category }));
    dispatch(getMoney({ accessToken }));
  }, [accessToken]);

  useEffect(() => {
    if (prevStatus && prevStatus.postShopPurchaseStatus === 'pending') {
      if (postShopPurchaseStatus === 'success') {
        setPage('receipt');
      } else if (postShopPurchaseStatus === 'failure') {
        alert('결제 실패');
      }
    }

    if (prevStatus && prevStatus.postReceiptConfirmStatus === 'pending') {
      if (postReceiptConfirmStatus === 'success') {
        alert('사용 되었습니다.');
      } else if (postReceiptConfirmStatus === 'failure') {
        alert('구매 확인 실패');
      }
    }
  }, [postShopPurchaseStatus]);

  return (
    <Wrapper>
      <Header>
        <section>
          <Category
            name="default"
            active={category === 'default'}
            onClick={changeCatgory}
          >
            기본
          </Category>
          <Category
            name="popular"
            active={category === 'popular'}
            onClick={changeCatgory}
          >
            인기
          </Category>
          <Category
            name="sale"
            active={category === 'sale'}
            onClick={changeCatgory}
          >
            매출
          </Category>
        </section>
        <h2>
          <img src={CoinIcon} alt="Coin" />
          {numberWithComma(user.money)}원
        </h2>
      </Header>
      <ListWrapper>{floorList}</ListWrapper>
      <SubmitBtn
        disabled={totalPrice <= 0 || user.money < totalPrice}
        onClick={() => alert('부스 운영이 종료되었습니다.')}
      >
        {totalPrice > 0 &&
          totalPrice <= user.money &&
          `${numberWithComma(totalPrice)}원`}{' '}
        {totalPrice <= user.money ? '결제하기' : '잔액부족'}
      </SubmitBtn>
    </Wrapper>
  );
};

export default withRouter(PaymentComponent);
