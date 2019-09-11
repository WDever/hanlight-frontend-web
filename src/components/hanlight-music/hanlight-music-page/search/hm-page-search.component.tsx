import * as React from 'react';

import { useInput, usePrevious } from 'lib/hooks';
import SearchIcon from 'lib/svg/hm-page-search.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppState,
  ErrorModel,
  hanlightMusicActions,
  HanlightMusicModel,
  hanlightMusicReducerActions,
  UserModel,
} from 'store';
import styled from 'styled-components';

import { MusicItem } from 'components/hanlight-music/hanlight-music-modal/search/hm-modal-search.component';
import { Dispatch } from 'redux';
import { CategoryTypes } from '../hanlight-music-page';
import HMPageSearchItemComponent from './searchItem';

const { useState, useEffect, useCallback, useMemo } = React;

const Wrapper = styled.article`
  width: 100%;
  height: calc(100vh - 70px - 60px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SearchBarWrapper = styled.form`
  width: 20.5rem;
  min-height: 2.25rem;

  background-color: #ffffff;

  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.21);

  border-radius: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 1rem;

  img {
  }

  button {
    background-color: #ffffff;

    margin-right: 0.625rem;

    border: none;
    outline: none;
  }

  input {
    font-size: 13px;
    font-family: 'Spoqa Han Sans';

    width: 85%;

    border: none;
    outline: none;

    border-radius: 0.75rem;

    margin-left: 0.625rem;

    color: #000000;

    ::placeholder {
      color: #bebebe;
    }
  }
`;

const ListWrapper = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: scroll;
`;

const SubmitBtn = styled.button`
  width: 100%;
  min-height: 3.75rem;

  background-color: #4470ff;

  outline: none;

  border: none;

  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.06);

  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1.125rem;
  color: #ffffff;
`;

const HMPageSearchComponent: React.FC<{ category: CategoryTypes }> = ({
  category,
}) => {
  const dispatch: Dispatch<hanlightMusicReducerActions> = useDispatch();

  const { searchList, hanlightStatus } = useSelector<
    AppState,
    HanlightMusicModel
  >(state => state.hanlightMusic);
  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { message: errorMessage } = useSelector<AppState, ErrorModel>(
    state => state.error,
  );

  const { getMusicSearch, postMusic } = hanlightMusicActions;

  const { getMusicSearchStatus, postMusicStatus } = hanlightStatus;

  const prevStatus = usePrevious({ getMusicSearchStatus, postMusicStatus });

  const [input, setInput] = useInput('');
  const [selectedItem, setSelectedItem] = useState<MusicItem>({
    title: '',
    album: 0,
  });
  const [select, setSelect] = useState(false);

  const submitSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(getMusicSearch({ accessToken, q: input, type: category }));
    },
    [getMusicSearch, input, category],
  );

  const submitSong = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { title, album } = selectedItem;
      e.preventDefault();

      dispatch(postMusic({ accessToken, title, album }));
    },
    [selectedItem],
  );

  const SearchList = useMemo(
    () =>
      getMusicSearchStatus === 'success'
        ? searchList.map((item, i) => {
            return (
              <HMPageSearchItemComponent
                key={item.album.album_id}
                title={item.title}
                album={item.album}
                setSelectedItem={setSelectedItem}
                setSelect={setSelect}
                select={select}
                selectedItem={selectedItem}
              />
            );
          })
        : [],
    [getMusicSearchStatus, searchList, selectedItem, select],
  );

  useEffect(() => {
    if (prevStatus) {
    console.log('hmpageuseeffect');
      if (
        prevStatus.getMusicSearchStatus === 'pending' &&
        getMusicSearchStatus === 'failure'
      ) {
        alert(errorMessage);
      } else if (prevStatus.postMusicStatus === 'pending') {
        if (postMusicStatus === 'success') {
          alert('성공적으로 노래를 신청했습니다.');
        } else if (postMusicStatus === 'failure') {
          alert(errorMessage);
        }
      }
    }
  }, [getMusicSearchStatus, postMusicStatus, prevStatus, errorMessage]);

  return (
    <Wrapper>
      <SearchBarWrapper onSubmit={submitSearch}>
        <input
          type="text"
          value={input}
          onChange={setInput}
          placeholder="검색어를 입력해주세요."
        />
        <button disabled={input === ''}>
          <img src={SearchIcon} alt="search icon" />
        </button>
      </SearchBarWrapper>
      <ListWrapper>{SearchList}</ListWrapper>
      {select && <SubmitBtn onClick={submitSong}>예약하기</SubmitBtn>}
    </Wrapper>
  );
};

export default HMPageSearchComponent;
