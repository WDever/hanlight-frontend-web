import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Dispatch } from 'redux';
import {
  AppState,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
} from 'store';
import FSBaseModalComponent from '../base';

const LolModalComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { toggleModal } = festivalActions;

  const { modalData } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );

  const { content } = modalData.data;

  const Content = <>'{content}'팀의 우승에 투표하시겠습니까?</>;

  const voteFunc = () => {};

  return (
    <FSBaseModalComponent
      title="우승 예측 투표"
      content={Content}
      onAcceptClick={voteFunc}
    />
  );
};

export default LolModalComponent;
