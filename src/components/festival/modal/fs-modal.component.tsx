import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState, FestivalModel, festivalReducerActions } from 'store';
import styled from 'styled-components';
import LolModalComponent from './lol';
import PaymentModalComponent from './payment';
import RefundModalComponent from './refund';
import SingerModalComponent from './singer';
import UseModalComponent from './use';

const FSModalComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();

  const { modalData } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );

  const { type } = modalData.data;

  switch (type) {
    case 'lol':
      return <LolModalComponent />;

    case 'singer':
      return <SingerModalComponent />;

    case 'payment':
      return <PaymentModalComponent />;

    case 'use':
      return <UseModalComponent />;

    case 'refund':
    case 'refund-check':
      return <RefundModalComponent />;

    default:
      return <></>;
  }
};

export default FSModalComponent;
