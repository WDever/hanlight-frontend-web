import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  hanlightMusicActions,
  HanlightMusicModel,
  hanlightMusicReducerActions,
  UserModel,
} from 'store';
import styled from 'styled-components';

const { useState, useEffect } = React;

const HMMAinComponent: React.FC = () => {
  const dispatch: Dispatch<hanlightMusicReducerActions> = useDispatch();

  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { musicList } = useSelector<AppState, HanlightMusicModel>(
    state => state.hanlightMusic,
  );
  const { hanlightStatus } = useSelector<AppState, HanlightMusicModel>(
    state => state.hanlightMusic,
  );

  const { getMusicStatus } = hanlightStatus;

  const { getMusic } = hanlightMusicActions;

  useEffect(() => {
    dispatch(getMusic({ accessToken }));
  }, []);

  return ();
};

export default HMMAinComponent;
