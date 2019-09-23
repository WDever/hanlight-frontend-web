import * as React from 'react';

import { numberWithComma } from 'lib/functions';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { festivalActions, festivalReducerActions, PayItemType } from 'store';
import styled from 'styled-components';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import BoothComponent from './booth';

const { useState, useEffect } = React;

const Wrapper = styled.article`
  width: 100%;
  height: calc(100% - 9.475rem);

  margin-top: 6.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListWrapper = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: scroll;
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

    margin: 0;
  }
`;

const Floor = styled.h1`
  width: 88.9%;

  font-family: 'yg-jalnan';
  font-size: 1rem;
  color: #878787;

  margin: 0 0 0.5rem 0;
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

export type paymentCategoryType = 'default' | 'popular' | 'sales';

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

export const ExData: ExDataType[] = [
  {
    floor: 'B1',
    booths: [
      {
        name: '학생회 부스',
        booth_pk: 0,
        items: [
          { name: '프렌치 토스트', price: 1000, item_pk: 0 },
          { name: '프렌치 토스트', price: 2000, item_pk: 1 },
          { name: '프렌치 토스트', price: 3000, item_pk: 2 },
          { name: '프렌치 토스트', price: 4000, item_pk: 3 },
          { name: '프렌치 토스트', price: 5000, item_pk: 4 },
        ],
      },
      {
        name: '학생회 부스',
        booth_pk: 1,
        items: [
          { name: '프렌치 토스트', price: 1000, item_pk: 6 },
          { name: '프렌치 토스트', price: 1000, item_pk: 7 },
          { name: '프렌치 토스트', price: 1000, item_pk: 8 },
          { name: '프렌치 토스트', price: 1000, item_pk: 9 },
          { name: '프렌치 토스트', price: 1000, item_pk: 10 },
        ],
      },
    ],
  },
  {
    floor: '1',
    booths: [
      {
        name: '아몰라힘들다',
        booth_pk: 0,
        items: [
          { name: '최민규의 심장', price: 500, item_pk: 11 },
          { name: '최민규의 영혼', price: 1000, item_pk: 12 },
          { name: '최민규의 두뇌', price: 1500, item_pk: 13 },
          { name: '최민규의 노예 근성', price: 2500, item_pk: 14 },
          { name: '최민규', price: 3500, item_pk: 15 },
        ],
      },
    ],
  },
];

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

const PaymentComponent: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();

  const { toggleModal } = festivalActions;

  const [category, setCategory] = useState<paymentCategoryType>('default');
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<PayItemType[]>([]);

  const floorList = ExData.map((item, i) => {
    if (category === 'default') {
      return (
        <>
          <Floor>{item.floor}</Floor>
          <BoothComponent
            key={i}
            booths={item.booths}
            data={data}
            setData={setData}
            floor={item.floor}
            count={count}
            setCount={setCount}
          />
        </>
      );
    } else {
      return (
        <>
          <BoothComponent
            key={i}
            booths={item.booths}
            data={data}
            setData={setData}
            floor={item.floor}
            count={count}
            setCount={setCount}
          />
        </>
      );
    }
  });

  return (
    <Wrapper>
      <ListWrapper>
        <Header>
          <section>
            <Category
              active={category === 'default'}
              onClick={() => setCategory('default')}
            >
              기본
            </Category>
            <Category
              active={category === 'popular'}
              onClick={() => setCategory('popular')}
            >
              인기
            </Category>
            <Category
              active={category === 'sales'}
              onClick={() => setCategory('sales')}
            >
              매출
            </Category>
          </section>
          <h2>{numberWithComma(30000)}원</h2>
        </Header>
        {floorList}
      </ListWrapper>
      <SubmitBtn
        disabled={count <= 0}
        onClick={() =>
          dispatch(
            toggleModal({
              status: true,
              data: {
                type: 'payment',
                content: data,
                acceptEvent: () => {
                  // some dispatch
                  history.push('/festival/pay/receipt');
                },
              },
            }),
          )
        }
      >
        {count > 0 && `${count}원`} 결제하기
      </SubmitBtn>
    </Wrapper>
  );
};

export default withRouter(PaymentComponent);
