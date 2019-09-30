import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
} from 'store';
import styled from 'styled-components';
import FSBaseModalComponent from '../base';

const SingerModalComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { toggleModal } = festivalActions;

  const { modalData } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );

  const { content } = modalData.data;

  const Content = <>'{content}'에게 투표하시겠습니까?</>;

  const voteFunc = () => {};

  return (
    <FSBaseModalComponent
      title="복면가왕 투표"
      content={Content}
      onAcceptClick={voteFunc}
    />
  );
};

export default SingerModalComponent;
