import * as React from 'react';

import { HanlightMusicAlbum } from 'store';
import styled from 'styled-components';

import { MusicItem } from 'components/hanlight-music/hanlight-music-modal/search/hm-modal-search.component';
import { SearchItemProps } from 'components/hanlight-music/hanlight-music-modal/search/searchItem';

const { useState } = React;

const Wrapper = styled.section<{ active: boolean }>`
  width: 20rem;
  min-height: 3.75rem;

  display: flex;
  align-items: center;

  background-color: #ffffff;

  border-radius: 0.75rem;

  margin-bottom: 0.625rem;

  box-sizing: border-box;

  box-shadow: ${({ active }) =>
    active
      ? '0 3px 16px 0 rgba(68, 112, 255, 0.3)'
      : '0 3px 8px 0 rgba(0, 0, 0, 0.25)'};

  border: ${({ active }) => active && 'solid 1px #4470ff'};

  :first-of-type {
    margin-top: 0.25rem;
  }

  :last-of-type {
    margin-bottom: 0.25rem;
  }
`;

const AlbumImg = styled.img`
  width: 2.875rem;
  height: 2.875rem;

  margin: 0 0.5rem 0 0.625rem;

  border: solid 0.8px #a3a3a3;
`;

const ContentWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 13px;
    font-family: 'Spoqa Han Sans';
    font-weight: bold;

    margin: 0;
    margin-bottom: 2.5px;
  }

  h2 {
    font-size: 11px;
    font-family: 'Spoqa Han Sans';

    margin: 0;
  }
`;

const HMPageSearchItem: React.FC<SearchItemProps> = ({
  title,
  album,
  select,
  selectedItem,
  setSelect,
  setSelectedItem,
}) => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <Wrapper
      onClick={() => {
        if (
          selectedItem.title === title &&
          selectedItem.album === album.album_id
        ) {
          setSelect(!select);
          setSelected(!selected);
        } else {
          setSelect(true);
          setSelected(true);
        }

        setSelectedItem({ title, album: album.album_id });
      }}
      active={
        selected &&
        title === selectedItem.title &&
        album.album_id === selectedItem.album
      }
    >
      <AlbumImg src={album.image_url} alt="album art" />
      <ContentWrapper>
        <h1>{title}</h1>
        <h2>{album.artist}</h2>
      </ContentWrapper>
    </Wrapper>
  );
};

export default HMPageSearchItem;
