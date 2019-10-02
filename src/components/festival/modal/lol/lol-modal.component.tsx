import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Dispatch } from 'redux';
import {
  AppState,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  LolModalType,
  UserModel,
} from 'store';
import FSBaseModalComponent from '../base';

const LolModalComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { postLolVote } = festivalActions;

  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { modalData } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );

  const { content, team } = modalData.data;

  const teamData: LolModalType = team ? team : { teamPk: 0, name: '' };

  const Content = <>'{content}'팀의 우승에 투표하시겠습니까?</>;

  const voteFunc = () =>
    dispatch(postLolVote({ accessToken, teamPk: teamData.teamPk }));

  return (
    <FSBaseModalComponent
      title="우승 예측 투표"
      content={Content}
      onAcceptClick={voteFunc}
    />
  );
};

export default LolModalComponent;
