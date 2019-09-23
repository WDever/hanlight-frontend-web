import * as React from 'react';

import { numberWithComma } from 'lib/functions';
import { PayItemType } from 'store';
import styled from 'styled-components';
import { ExDataBoothType } from '../payment.component';

const { useState } = React;

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
    font-family: 'Spoqa Hans Sans';
    font-size: 1rem;
    font-weight: bold;
    color: #e5e5e5;

    margin: 0;
  }
`;

const ListWrapper = styled.section`
  width: 100%;

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
  width: 17%;

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
  floor: string;
  booths: ExDataBoothType[];
  data: PayItemType[];
  setData: React.Dispatch<React.SetStateAction<PayItemType[]>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const BoothComponent: React.FC<BoothProps> = ({
  booths,
  data,
  setData,
  floor,
  count,
  setCount,
}) => {
  const [toggle, setToggle] = useState<number>(0);

  const controlItem = (
    floor: string,
    boothPk: number,
    item_pk: number,
    price: number,
    name: string,
    type: 'increment' | 'decrement',
  ) => {
    if (type === 'increment') {
      if (data.findIndex(dataVal => dataVal.item_pk === item_pk) === -1) {
        setData([...data, { name, price, item_pk, amount: 1 }]);
      } else {
        const result = data.map(item => {
          if (item.item_pk === item_pk) {
            item.amount += 1;
          }

          return item;
        });

        setData(result);
      }

      setCount((count += price));
    } else if (type === 'decrement') {
      if (data.findIndex(dataVal => dataVal.item_pk === item_pk) !== -1) {
        if (
          data[data.findIndex(dataVal => dataVal.item_pk === item_pk)]
            .amount === 0
        ) {
          setData(data.filter(item => item.item_pk !== item_pk));
        } else {
          const result = data.map(item => {
            if (item.item_pk === item_pk) {
              item.amount -= 1;
            }

            return item;
          });

          setData(result);
          setCount((count -= price));
        }
      }
    }
  };

  const boothList = booths.map((item, i) => {
    return (
      <>
        <BoothBox
          toggle={toggle === i + 1}
          onClick={
            toggle === i + 1 ? () => setToggle(0) : () => setToggle(i + 1)
          }
        >
          <div>
            <h1>{item.name}</h1>
            <BoothPlusBtn toggle={toggle === i + 1} />
          </div>
        </BoothBox>
        {toggle === i + 1 && (
          <ListWrapper>
            {item.items.map((val, idx) => {
              return (
                <BoothItemBox key={idx}>
                  <h1>{val.name}</h1>
                  <h2>{numberWithComma(val.price)} 원</h2>
                  <ItemControlBtnWrapper>
                    <ItemControlBtn
                      plus={false}
                      onClick={() =>
                        controlItem(
                          floor,
                          item.booth_pk,
                          val.item_pk,
                          val.price,
                          val.name,
                          'decrement',
                        )
                      }
                    />
                    {data.findIndex(
                      dataVal => dataVal.item_pk === val.item_pk,
                    ) !== -1
                      ? data[
                          data.findIndex(
                            dataVal => dataVal.item_pk === val.item_pk,
                          )
                        ].amount
                      : 0}
                    <ItemControlBtn
                      plus={true}
                      onClick={() =>
                        controlItem(
                          floor,
                          item.booth_pk,
                          val.item_pk,
                          val.price,
                          val.name,
                          'increment',
                        )
                      }
                    />
                  </ItemControlBtnWrapper>
                </BoothItemBox>
              );
            })}
          </ListWrapper>
        )}
      </>
    );
  });

  return <>{boothList}</>;
};

export default BoothComponent;
