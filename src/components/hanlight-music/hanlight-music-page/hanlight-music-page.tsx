import * as React from 'react';

import { Device } from 'lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { hanlightMusicActions, hanlightMusicReducerActions } from 'store';
import styled from 'styled-components';

import HMPageList from 'lib/svg/hm-page-list.svg';
import HMPageSearch from 'lib/svg/hm-page-search.svg';
import HMPageMainComponent from './main';
import HMPageSearchComponent from './search';

const { useState } = React;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #ffffff;
`;

const TitleWrapper = styled.div`
  width: 20rem;

  margin: 1.875rem 0 1rem 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-family: 'yg-jalnan';
    font-size: 1.125rem;

    margin: 0;
  }

  img {
    width: 15px;
    height: 15px;

    cursor: pointer;
  }
`;

const CategoryWrapper = styled.section`
  width: 20.5rem;
`;

const Category = styled.span<{ selected: boolean }>`
  font-size: ${({ selected }) => (selected ? '15px' : '13px')};
  font-family: 'yg-jalnan';
  color: ${({ selected }) => (selected ? '#4470ff' : '#000000')};

  margin: 0;
  margin-right: 0.625rem;

  cursor: pointer;
`;

export type pageType = 'main' | 'search';
export type CategoryTypes = '' | 'song' | 'artist' | 'album';

const HanlightMusicPageComponent: React.FC = () => {
  const [page, setPage] = useState<pageType>('main');
  const [category, setCategory] = useState<CategoryTypes>('');

  return (
    <Wrapper>
      <TitleWrapper>
        {page === 'main' ? (
          <h2>신청목록</h2>
        ) : (
          <CategoryWrapper>
            <Category
              selected={category === ''}
              onClick={() => setCategory('')}
            >
              전체
            </Category>
            <Category
              selected={category === 'song'}
              onClick={() => setCategory('song')}
            >
              제목
            </Category>
            <Category
              selected={category === 'artist'}
              onClick={() => setCategory('artist')}
            >
              가수
            </Category>
            <Category
              selected={category === 'album'}
              onClick={() => setCategory('album')}
            >
              앨범
            </Category>
          </CategoryWrapper>
        )}
        <img
          src={page === 'main' ? HMPageSearch : HMPageList}
          alt="page switch"
          onClick={() =>
            page === 'main' ? setPage('search') : setPage('main')
          }
        />
      </TitleWrapper>
      {page === 'main' ? (
        <HMPageMainComponent />
      ) : page === 'search' ? (
        <HMPageSearchComponent category={category} />
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

export default HanlightMusicPageComponent;
