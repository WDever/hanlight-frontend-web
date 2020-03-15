import React from 'react';

import styled from 'styled-components';
import { MusicDataType } from '../main-music.component';

/* eslint-disable @typescript-eslint/typedef */

const MusicItemWrapper = styled.article`
  width: 100%;
  height: 2.25rem;

  margin-bottom: 0.5rem;

  background-color: ${({ theme }): string => theme.mainCard.bg};

  display: flex;
  align-items: center;

  img {
    width: 2.25rem;
    height: 2.25rem;

    border-radius: 0.25rem;

    margin-right: 1.875rem;
  }

  h1 {
    margin: 0;
    margin-right: 0.75rem;

    position: relative;

    font-size: 17px;
    color: ${({ theme }): string => theme.mainCard.music.itemDefaultFont};

    ::before {
      content: ' ';

      width: 0.125rem;
      height: 0.125rem;

      position: absolute;
      top: 50%;
      left: -1rem;

      background-color: #000;

      border-radius: 50%;
    }
  }

  h2 {
    margin: 0;

    max-width: 22.5rem;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    font-size: 17px;
    font-weight: normal;
    color: ${({ theme }): string => theme.mainCard.music.itemDefaultFont};
  }

  h3 {
    margin: 0;
    margin-left: auto;

    font-size: 15px;
    font-weight: normal;
    color: ${({ theme }): string => theme.mainCard.music.itmeSubFont};
  }
`;

/* eslint-enable @typescript-eslint/typedef */

interface Props {
  data: MusicDataType;
}

const MainMusicItemComponent: React.FC<Props> = ({ data }: Props) => {
  const { id, img, title, artist }: MusicDataType = data;

  return (
    <MusicItemWrapper>
      <img src={img} alt='album cover' />
      <h1>{id}</h1>
      <h2>{title}</h2>
      <h3>{artist}</h3>
    </MusicItemWrapper>
  );
};

export default MainMusicItemComponent;
