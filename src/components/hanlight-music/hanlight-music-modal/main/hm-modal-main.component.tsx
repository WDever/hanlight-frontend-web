import * as React from 'react';

import { usePrevious } from 'lib/hooks';
import { Device } from 'lib/styles';
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
import HMEmptyItemComponent from './emptyItem';
import HMMainItemComponent from './mainItem';

const { useEffect, useMemo } = React;

const Wrapper = styled.div`
  width: calc(100% - 4rem);
  height: 100%;

  display: inline-flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  z-index: 2;
`;

const Title = styled.div`
  width: 42.375rem;

  display: flex;

  margin: 3.875rem 0 1.875rem 0;

  span {
    font-family: 'yg-jalnan';
    font-size: 1.375rem;

    @media ${Device.tabletL} {
      font-size: 1.125rem;
    }
  }

  @media ${Device.tabletL} {
    width: 34.375rem;

    margin: 4.0625rem 0 1.25rem 0;
  }
`;

const ListWrapper = styled.div`
  width: 42.375rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;

  @media ${Device.tabletL} {
    width: 34.375rem;
  }
`;

const EmptyTxt = styled.div`
  width: 100%;
  height: 98%;

  font-family: 'yg-jalnan';
  font-size: 1.25rem;

  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;

  span {
    color: #4470ff;
  }

  @media ${Device.tabletL} {
    font-size: 1rem;
  }
`;

const HMModalMainComponent: React.FC = () => {
  const dispatch: Dispatch<hanlightMusicReducerActions> = useDispatch();

  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { hanlightMusicStatus, musicList } = useSelector<
    AppState,
    HanlightMusicModel
  >(state => state.hanlightMusic);
  const { message: errorMessage } = useSelector<AppState, ErrorModel>(
    state => state.error,
  );

  const { getMusicStatus } = hanlightMusicStatus;

  const { getMusic } = hanlightMusicActions;

  const prevStatus = usePrevious({ getMusicStatus });

  useEffect(() => {
    if (prevStatus) {
      if (
        prevStatus.getMusicStatus === 'pending' &&
        getMusicStatus === 'failure'
      ) {
        alert(errorMessage);
      }
    }
  }, [getMusicStatus]);

  useEffect(() => {
    dispatch(getMusic({ accessToken }));
  }, []);

  const MusicList = useMemo(
    () =>
      getMusicStatus === 'success'
        ? musicList
            .concat(Array(7 - musicList.length).fill(null))
            .map((item, i) => {
              if (item) {
                return (
                  <HMMainItemComponent
                    key={i}
                    title={item.title}
                    albumImage={item.album.image_url}
                    artist={item.album.artist}
                    pk={i + 1}
                  />
                );
              } else {
                return <HMEmptyItemComponent pk={i + 1} />;
              }
            })
        : [],
    [getMusicStatus, musicList],
  );

  return (
    <Wrapper>
      <Title>
        <span>신청목록</span>
      </Title>
      <ListWrapper>
        {musicList.length === 0 && (
          <EmptyTxt>
            신청된 곡이 <span>없습니다.</span>
          </EmptyTxt>
        )}
        {MusicList}
      </ListWrapper>
    </Wrapper>
  );
};

export default HMModalMainComponent;
