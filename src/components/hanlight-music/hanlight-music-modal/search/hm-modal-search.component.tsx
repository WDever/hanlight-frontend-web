import * as React from 'react';

import { useInput, usePrevious } from 'lib/hooks';
import { Device } from 'lib/styles';
import NoResultImg from 'lib/svg/no-result.svg';
import SearchIcon from 'lib/svg/search.svg';
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
import HMSearchItemComponent from './searchItem';

const { useState, useEffect, useMemo, useCallback } = React;

const Wrapper = styled.div`
  width: calc(100% - 4rem);
  height: 100%;

  display: inline-flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  z-index: 2;
`;

const CategoryWrapper = styled.div`
  width: 42.375rem;

  font-family: 'yg-jalnan';
  font-size: 1.25rem;

  margin: 3.875rem 0 1.25rem 0;

  @media ${Device.tabletL} {
    width: 35rem;

    margin: 4rem 0 1.25rem 0;
  }
`;

const Category = styled.span<{ active: boolean }>`
  cursor: pointer;

  margin-right: 1.25rem;

  color: ${({ active }) => (active ? '#4470ff' : '#a3a3a3')};
  font-size: ${({ active }) => (active ? '1.375rem' : '1.25rem')};

  @media ${Device.tabletL} {
    font-size: ${({ active }) => (active ? '1.125rem' : '1rem')};
  }
`;

const SearchBar = styled.form`
  width: 42.875rem;
  min-height: 2.875rem;

  background-color: #ffffff;

  border-radius: 1rem;

  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.21);

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${Device.tabletL} {
    width: 35.3125rem;
    min-height: 2.3125rem;
  }

  input {
    font-size: 1.25rem;
    font-family: 'Spoqa Han Sans';

    width: 85%;

    border: none;
    outline: none;

    border-radius: 1rem;

    margin-left: 1.25rem;

    @media ${Device.tabletL} {
      font-size: 1rem;
    }
  }

  button {
    background-color: #ffffff;

    border: none;
    outline: none;

    cursor: pointer;

    border-radius: 1rem;

    margin-right: 1.2rem;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 19.75rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20.625rem, auto));
  grid-auto-rows: minmax(min-content, max-content);
  grid-column-gap: 17px;
  grid-row-gap: 1rem;
  justify-content: center;

  background-color: #ffffff;

  padding: 0.875rem 0 1rem 0;

  overflow-y: scroll;

  position: relative;

  @media ${Device.tabletL} {
    height: 16.5rem;

    grid-template-columns: repeat(auto-fill, minmax(16.875rem, auto));
    grid-column-gap: 15px;
    grid-row-gap: 15px;

    margin: 1.25rem 0 1.5rem 0;
  }
`;

const Blur = styled.div`
  position: relative;

  width: 100%;

  margin: 1rem 0;

  ::before {
    content: '';

    position: absolute;
    top: 0;

    width: 100%;
    height: 0.875rem;

    background: linear-gradient(white, rgba(255, 255, 255, 0.001));

    z-index: 1;
  }

  ::after {
    content: '';

    position: absolute;
    bottom: 0;

    width: 100%;
    height: 0.875rem;

    background: linear-gradient(rgba(255, 255, 255, 0.001), white);
  }
`;

const SubmitBtn = styled.button<{ select: boolean }>`
  width: 8.125rem;
  height: 3.125rem;

  background-color: ${({ select }) => (select ? '#4470ff' : '#ffffff')};

  color: ${({ select }) => (select ? '#ffffff' : '#4470ff')};
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1.25rem;

  cursor: pointer;

  border-radius: 0.5rem;
  border: solid 1px #4470ff;

  @media ${Device.tabletL} {
    width: 6.875rem;
    height: 2.625rem;

    font-size: 1rem;
  }
`;

const StyledTxt = styled.div`
  width: 100%;
  height: 100%;

  font-family: 'yg-jalnan';
  font-size: 1.25rem;

  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 1;

  @media ${Device.tabletL} {
    font-size: 1rem;
  }

  p {
  }

  span {
    color: #4470ff;
  }

  img {
    @media ${Device.tabletL} {
      width: 2.5rem;
    }
  }
`;

type CategoryType = 'song' | 'artist' | 'album' | '';

export interface MusicItem {
  title: string;
  album: number;
}

const HMModalSearchComponent: React.FC = () => {
  const dispatch: Dispatch<hanlightMusicReducerActions> = useDispatch();

  const { searchList, hanlightMusicStatus } = useSelector<
    AppState,
    HanlightMusicModel
  >(state => state.hanlightMusic);
  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { message: errorMessage } = useSelector<AppState, ErrorModel>(
    state => state.error,
  );

  const { getMusicSearch, postMusic } = hanlightMusicActions;

  const { getMusicSearchStatus, postMusicStatus } = hanlightMusicStatus;

  const prevStatus = usePrevious({ getMusicSearchStatus, postMusicStatus });
  const [input, setInput] = useInput('');
  const [category, setCategory] = useState<CategoryType>('');
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
              <HMSearchItemComponent
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
      if (getMusicSearchStatus === 'pending') {
        setSelect(false);
      } else if (
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
      <CategoryWrapper>
        <Category active={category === ''} onClick={() => setCategory('')}>
          전체
        </Category>
        <Category
          active={category === 'song'}
          onClick={() => setCategory('song')}
        >
          제목
        </Category>
        <Category
          active={category === 'artist'}
          onClick={() => setCategory('artist')}
        >
          가수
        </Category>
        <Category
          active={category === 'album'}
          onClick={() => setCategory('album')}
        >
          앨범
        </Category>
      </CategoryWrapper>
      <SearchBar onSubmit={submitSearch}>
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          value={input}
          onChange={setInput}
        />
        <button disabled={input.length === 0}>
          <img src={SearchIcon} alt="search" />
        </button>
      </SearchBar>
      <Blur>
        <ListWrapper>
          {getMusicSearchStatus === 'none' ? (
            <StyledTxt>
              <p>
                <span>노래</span>를 검색해보세요!
              </p>
            </StyledTxt>
          ) : searchList.length !== 0 || getMusicSearchStatus === 'pending' ? (
            SearchList
          ) : (
            <StyledTxt>
              <img src={NoResultImg} alt="no result" />
              <p>
                검색 결과가&nbsp;<span>없습니다.</span>
              </p>
            </StyledTxt>
          )}
        </ListWrapper>
      </Blur>
      {getMusicSearchStatus !== 'none' && getMusicSearchStatus !== 'pending' && (
        <SubmitBtn select={select} onClick={submitSong} disabled={!select}>
          예약하기
        </SubmitBtn>
      )}
    </Wrapper>
  );
};

export default HMModalSearchComponent;
