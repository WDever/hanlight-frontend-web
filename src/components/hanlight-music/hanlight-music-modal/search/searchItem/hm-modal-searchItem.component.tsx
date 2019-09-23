import * as React from 'react';

import { Device } from 'lib/styles';
import { HanlightMusicAlbum } from 'store';
import styled from 'styled-components';
import { MusicItem } from '../hm-modal-search.component';

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

  border: ${({ active }) =>
    active ? 'solid 1px #4470ff' : 'solid 1px #ffffff'};

  display: flex;
  align-items: center;

  /* box-sizing: border-box; */

  cursor: pointer;

  @media ${Device.tabletL} {
    width: 16.875rem;
    height: 4.875rem;
  }

  :last-of-type,
  :nth-last-child(2) {
    margin-bottom: 0.875rem;
  }
`;

const AlbumImg = styled.img`
  width: 4rem;
  height: 4rem;

  margin: 0 0.75rem 0 1.05rem;

  @media ${Device.tabletL} {
    width: 3.4375rem;
    height: 3.4375rem;

    margin: 0 0.75rem 0 0.875rem;
  }
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

  @media ${Device.tabletL} {
    font-size: 0.875rem;
  }
`;

const Artist = styled.p`
  font-family: 'Spoqa Han Sans';
  font-size: 1rem;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  margin: 0;

  @media ${Device.tabletL} {
    font-size: 0.75rem;
  }
`;

export interface SearchItemProps {
  title: string;
  album: HanlightMusicAlbum;
  setSelectedItem: React.Dispatch<React.SetStateAction<MusicItem>>;
  setSelect: React.Dispatch<React.SetStateAction<boolean>>;
  select: boolean;
  selectedItem: MusicItem;
}

const HMModalSearchItemComponent: React.FC<SearchItemProps> = ({
  title,
  album,
  setSelect,
  setSelectedItem,
  select,
  selectedItem,
}) => {
  return (
    <Wrapper
      onClick={() => {
        if (
          selectedItem.title === title &&
          selectedItem.album === album.album_id
        ) {
          setSelect(!select);
        } else {
          setSelect(true);
        }

        setSelectedItem({ title, album: album.album_id });
      }}
      active={
        select &&
        title === selectedItem.title &&
        album.album_id === selectedItem.album
      }
    >
      <AlbumImg src={album.image_url} alt="album art" />
      <ContentWrapper>
        <Title>{title}</Title>
        <Artist>{album.artist}</Artist>
      </ContentWrapper>
    </Wrapper>
  );
};

export default HMModalSearchItemComponent;
