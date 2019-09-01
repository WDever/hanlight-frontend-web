import * as React from 'react';

import { HanlightMusicAlbum } from 'store';
import styled from 'styled-components';
import { MusicItem } from '../hm-search.component';

const { useState } = React;

const Wrapper = styled.div<{ active: boolean }>`
  width: 20.625rem;
  height: 6rem;

  background-color: #ffffff;

  border-radius: 1rem;

  box-shadow: ${({ active }) =>
    active
      ? '0 3px 20px 0 rgba(68, 112, 255, 0.3)'
      : '0 3px 10px 0 rgba(0, 0, 0, 0.21)'};

  border: ${({ active }) => active && 'solid 1px #4470ff'};

  display: flex;
  align-items: center;

  box-sizing: border-box;

  cursor: pointer;

  :first-of-type,
  :nth-of-type(2) {
    margin-top: 1rem;
  }

  :last-of-type,
  :nth-last-child(2) {
    margin-bottom: 1rem;
  }
`;

const AlbumImg = styled.img`
  width: 4rem;
  height: 4rem;

  margin: 0 0.75rem 0 1.05rem;
`;

const ContentWrapper = styled.div`
  width: calc(100% - 5.8rem);

  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  width: 80%;

  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1.125rem;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  display: inline-block;

  margin: 0;
  margin-bottom: 0.25rem;
`;

const Artist = styled.p`
  font-family: 'Spoqa Han Sans';
  font-size: 1rem;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  margin: 0;
`;

interface SearchItemProps {
  title: string;
  album: HanlightMusicAlbum;
  setSelectedItem: React.Dispatch<React.SetStateAction<MusicItem>>;
  setSelect: React.Dispatch<React.SetStateAction<boolean>>;
  select: boolean;
  selectedItem: MusicItem;
}

const HMSearchItemComponent: React.FC<SearchItemProps> = ({
  title,
  album,
  setSelect,
  setSelectedItem,
  select,
  selectedItem,
}) => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <Wrapper
      onClick={() => {
        if (selectedItem.album === album.album_id) {
          setSelect(!select);
          setSelected(!selected);
        } else {
          setSelect(true);
          setSelected(true);
        }

        setSelectedItem({ title, album: album.album_id });
      }}
      active={selected && album.album_id === selectedItem.album}
    >
      <AlbumImg src={album.image_url} alt="album art" />
      <ContentWrapper>
        <Title>{title}</Title>
        <Artist>{album.artist}</Artist>
      </ContentWrapper>
    </Wrapper>
  );
};

export default HMSearchItemComponent;
