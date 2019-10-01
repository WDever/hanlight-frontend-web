import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  SingerModalType,
  UserModel,
} from 'store';
import styled from 'styled-components';
import FSBaseModalComponent from '../base';

const SingerModalComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { postSingerVote } = festivalActions;

  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { modalData } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );

  const { content, singer } = modalData.data;

  const singerData: SingerModalType = singer
    ? singer
    : { singerPk: 0, name: '' };

  const Content = <>'{content}'에게 투표하시겠습니까?</>;

  const voteFunc = () =>
    dispatch(postSingerVote({ accessToken, singerPk: singerData.singerPk }));

  return (
    <FSBaseModalComponent
      title="복면가왕 투표"
      content={Content}
      onAcceptClick={voteFunc}
    />
  );
};

export default SingerModalComponent;
