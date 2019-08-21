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
import HMMainItemComponent from './mainItem';

const { useState, useEffect } = React;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;

  display: flex;

  margin-bottom: 1.875rem;

  span {
    font-family: 'yg-jalnan';
    font-size: 1.375rem;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

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

  const MusicList = musicList.map((item, i) => {
    return (
      <HMMainItemComponent
        key={i}
        title={item.title}
        albumImage={item.album.image_url}
        artist={item.album.artist}
        pk={item.album.album_id}
      />
    );
  });

  return (
    <Wrapper>
      <Title>
        <span>신청목록</span>
      </Title>
    </Wrapper>
  );
};

export default HMMAinComponent;
