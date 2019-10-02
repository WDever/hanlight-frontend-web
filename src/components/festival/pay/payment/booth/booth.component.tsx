import * as React from 'react';

import { numberWithComma } from 'lib/functions';
import {
  FSShopItemModel,
  FSShopListModel,
  FSShopModel,
  PayItemType,
} from 'store';
import styled from 'styled-components';

const BoothPlusBtn = styled.span<{ toggle: boolean }>`
  width: 1rem;
  height: 1rem;

  position: relative;

  border-radius: 1.25rem;

  cursor: pointer;

  &::before {
    ${({ toggle }) => (toggle ? '' : 'transform: rotate(90deg);')}
  }

  &::before,
  &::after {
    height: 2px;
    width: 1rem;

    position: absolute;
    top: 50%;

    content: ' ';

    background-color: #707070;
  }
`;

const BoothBox = styled.section<{ toggle: boolean }>`
  width: 100%;
  min-height: 2.5rem;

  background-color: #3c3c3c;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: ${({ toggle }) => (toggle ? '0' : '0.5rem')};

  :last-of-type {
    margin-bottom: 0;
  }

  div {
    width: 88.9%;

    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-family: 'Spoqa Han Sans';
    font-size: 1rem;
    font-weight: bold;
    color: #e5e5e5;

    margin: 0;
  }
`;

const ListWrapper = styled.section<{ amount: number }>`
  width: 100%;
  min-height: ${({ amount }) => amount * 2.5}rem;

  background-color: #464646;

  border-bottom: 1rem solid #3c3c3c;

  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoothItemBox = styled.section`
  width: 86.7%;
  height: 2.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    width: 30%;

    font-family: 'Spoqa Han Sans';
    font-size: 0.875rem;
    font-weight: normal;
    color: #e5e5e5;

    margin: 0;
  }

  h2 {
    width: 20%;

    font-family: 'Spoqa Han Sans';
    font-size: 0.875rem;
    font-weight: normal;
    color: #6488ff;

    display: flex;
    justify-content: flex-end;

    margin: 0;
  }
`;

const ItemControlBtnWrapper = styled.section`
  width: 20%;

  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  font-weight: normal;
  color: #6488ff;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemControlBtn = styled.span<{ plus: boolean }>`
  width: 0.625rem;
  height: 100%;

  position: relative;

  border-radius: 1.25rem;

  cursor: pointer;

  &::before {
    ${({ plus }) => (plus ? 'transform: rotate(90deg);' : '')}
  }

  &::before,
  &::after {
    height: 1px;
    width: 0.625rem;

    position: absolute;
    top: 50%;

    content: ' ';

    background-color: #707070;
  }
`;

export interface BoothProps {
  booths: FSShopModel[];
  itemList: PayItemType[];
  setItemList: React.Dispatch<React.SetStateAction<PayItemType[]>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  toggleBooth: number;
  setToggleBooth: React.Dispatch<React.SetStateAction<number>>;
}

const BoothComponent: React.FC<BoothProps> = ({
  booths,
  itemList,
  setItemList,
  totalPrice,
  setTotalPrice,
  toggleBooth,
  setToggleBooth,
}) => {
  const controlItem = (
    shop_pk: number,
    item_pk: number,
    price: number,
    name: string,
    type: 'increment' | 'decrement',
  ) => {
    const index: number = itemList.findIndex(val => val.item_pk === item_pk);

    if (type === 'increment') {
      if (index === -1) {
        setItemList([
          ...itemList,
          { shop_pk, name, price, item_pk, amount: 1 },
        ]);
        setTotalPrice((totalPrice += price));
        return;
      }

      const result = itemList.map((item: PayItemType) => {
        if (item.item_pk === item_pk) {
          item.amount += 1;
        }
        return item;
      });

      setItemList(result);
      setTotalPrice((totalPrice += price));
    } else if (type === 'decrement') {
      if (index !== -1) {
        if (itemList[index].amount === 0) {
          setItemList(itemList.filter(item => item.item_pk !== item_pk));
          setTotalPrice((totalPrice -= price));
          return;
        }
        const result = itemList.map((item: PayItemType) => {
          if (item.item_pk === item_pk) {
            item.amount -= 1;
          }

          return item;
        });

        setItemList(result);
        setTotalPrice((totalPrice -= price));
      }
    }
  };

  const boothList = booths.map((item, i) => {
    return (
      <>
        <BoothBox
          toggle={toggleBooth === item.pk}
          onClick={
            toggleBooth === item.pk
              ? () => {
                  setToggleBooth(0);
                  setItemList([]);
                  setTotalPrice(0);
                }
              : () => {
                  setToggleBooth(item.pk);
                  setItemList([]);
                  setTotalPrice(0);
                }
          }
        >
          <div>
            <h1>
              {item.className} - {item.name}
            </h1>
            <BoothPlusBtn toggle={toggleBooth === item.pk} />
          </div>
        </BoothBox>
        {toggleBooth === item.pk && (
          <ListWrapper amount={item.shopItem.length}>
            {item.shopItem.map(
              (val: FSShopItemModel, idx: number, org: FSShopItemModel[]) => {
                const selectedItem = itemList.find(
                  valA => valA.item_pk === val.pk,
                );

                return (
                  <BoothItemBox key={val.pk}>
                    <h1>{val.name}</h1>
                    <h2>{numberWithComma(val.price)} 원</h2>
                    <ItemControlBtnWrapper>
                      <ItemControlBtn
                        plus={false}
                        onClick={() =>
                          controlItem(
                            item.pk,
                            val.pk,
                            val.price,
                            val.name,
                            'decrement',
                          )
                        }
                      />
                      {selectedItem ? selectedItem.amount : 0}
                      <ItemControlBtn
                        plus={true}
                        onClick={() =>
                          controlItem(
                            item.pk,
                            val.pk,
                            val.price,
                            val.name,
                            'increment',
                          )
                        }
                      />
                    </ItemControlBtnWrapper>
                  </BoothItemBox>
                );
              },
            )}
          </ListWrapper>
        )}
      </>
    );
  });

  return <>{boothList}</>;
};

export default BoothComponent;
