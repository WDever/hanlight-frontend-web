import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  ErrorModel,
  hanlightMusicActions,
  HanlightMusicModel,
  hanlightMusicReducerActions,
  UserModel,
} from 'store';
import styled from 'styled-components';

import HMPageEmptyItemComponent from './emptyItem';
import HMPageMainItemComponent from './mainItem';

const { useState, useEffect, useMemo, useCallback } = React;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: relative;
`;

const EmptyTxt = styled.div`
  font-family: 'yg-jalnan';
  font-size: 1rem;

  position: absolute;

  top: 10rem;

  z-index: 1;

  span {
    color: #4470ff;
  }
`;

const HMPageMainComponent: React.FC = () => {
  const dispatch: Dispatch<hanlightMusicReducerActions> = useDispatch();

  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { hanlightStatus, musicList } = useSelector<
    AppState,
    HanlightMusicModel
  >(state => state.hanlightMusic);
  const { message: errorMessage } = useSelector<AppState, ErrorModel>(
    state => state.error,
  );

  const { getMusicStatus } = hanlightStatus;
  const { getMusic } = hanlightMusicActions;

  const MusicList = useMemo(
    () =>
      getMusicStatus === 'success'
        ? musicList
            .concat(Array(7 - musicList.length).fill(null))
            .map((item, i) => {
              if (item) {
                return (
                  <HMPageMainItemComponent
                    title={item.title}
                    albumImage={item.album.image_url}
                    artist={item.album.artist}
                    pk={i + 1}
                    key={i}
                  />
                );
              } else {
                return <HMPageEmptyItemComponent pk={i + 1} />;
              }
            })
        : [],
    [getMusicStatus, musicList],
  );

  useEffect(() => {
    dispatch(getMusic({ accessToken }));
  }, []);

  return (
    <Wrapper>
      {musicList.length === 0 && (
        <EmptyTxt>
          신청된 곡이 <span>없습니다.</span>
        </EmptyTxt>
      )}
      {MusicList}
    </Wrapper>
  );
};

export default HMPageMainComponent;
