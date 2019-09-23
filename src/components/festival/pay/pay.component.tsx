import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import styled from 'styled-components';

import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { festivalActions, festivalReducerActions } from 'store';
import FSHeaderComponent from '../header';
import PaymentComponent from './payment';
import ReceiptComponent from './receipt';

const { useState, useEffect } = React;

const Template = styled.article<{ state: TransitionStatus }>`
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;

  display: flex;
  justify-content: center;

  background-color: #313131;

  transform: translateY(
    ${({ state }) =>
      state === 'entering' || state === 'entered' ? '0' : '100%'}
  );

  transition: 0.3s;

  position: absolute;
  top: 0;
  z-index: 11;
`;

const Wrapper = styled.section`
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryTab = styled.section`
  width: 100%;
  height: 2.5rem;

  background-color: #3c3c3c;

  position: fixed;

  margin-top: 3.75rem;

  display: flex;
`;

const CategoryBtn = styled.button<{ active: boolean }>`
  width: 50%;
  height: 100%;

  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.125rem;
  font-family: 'yg-jalnan';
  color: ${({ active }) => (active ? '#e4e4e4' : '#878787')};

  background-color: #3c3c3c;

  border: none;
  border-bottom: ${({ active }) =>
    active ? '1px solid #6488ff' : '1px solid #3c3c3c'};
`;

export type categoryType = 'payment' | 'receipt';

const PayComponent: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [category, setCategory] = useState<categoryType>('payment');
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    setAnimate(true);

    if (history.action !== 'PUSH') {
      history.push('/festival');
    }
  }, []);

  return (
    <Transition
      in={animate}
      timeout={300}
      onExited={() => history.push('/festival', { pay: false })}
    >
      {state => (
        <Template state={state}>
          <Wrapper>
            <FSHeaderComponent setAnimate={setAnimate} />
            <CategoryTab>
              <CategoryBtn
                onClick={() => setCategory('payment')}
                active={category === 'payment'}
              >
                결제
              </CategoryBtn>
              <CategoryBtn
                onClick={() => setCategory('receipt')}
                active={category === 'receipt'}
              >
                영수증
              </CategoryBtn>
            </CategoryTab>
            {category === 'payment' ? (
              <PaymentComponent />
            ) : (
              <ReceiptComponent />
            )}
          </Wrapper>
        </Template>
      )}
    </Transition>
  );
};

export default PayComponent;
