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

const { useState, useEffect, useMemo } = React;

const Wrapper = styled.div`
  width: calc(100% - 4rem);
  height: 100%;

  display: inline-flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  z-index: 2;

  /* box-shadow: 0 15px 10px 0 rgba(0, 0, 0, 0.07); */

  /* ::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    content: "";

    z-index: 1;

    box-shadow: 0 15px 10px 0 rgba(0, 0, 0, 0.07);
  } */
`;

const Title = styled.div`
  width: 42.375rem;

  display: flex;

  margin: 3.875rem 0 1.875rem 0;

  span {
    font-family: 'yg-jalnan';
    font-size: 1.375rem;
  }
`;

const ListWrapper = styled.div`
  width: 42.375rem;

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

  const MusicList = useMemo(
    () =>
      getMusicStatus === 'success'
        ? musicList.map((item, i) => {
            return (
              <HMMainItemComponent
                key={i}
                title={item.title}
                albumImage={item.album.image_url}
                artist={item.album.artist}
                pk={i + 1}
              />
            );
          })
        : [],
    [getMusicStatus],
  );

  return (
    <Wrapper>
      <Title>
        <span>신청목록</span>
      </Title>
      <ListWrapper>{MusicList}</ListWrapper>
    </Wrapper>
  );
};

export default HMMAinComponent;
