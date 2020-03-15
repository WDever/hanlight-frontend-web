import React, { ReactNodeArray } from 'react';

import styled from 'styled-components';
import { MainCardWrapper } from 'lib/styles/MainCard';
import MainMusicItemComponent from './musicItem';

/* eslint-disable @typescript-eslint/typedef */

const MusicWrapper = styled(MainCardWrapper)`
  .title {
    margin-bottom: 1.25rem;
  }
`;

/* eslint-enable @typescript-eslint/typedef */

export interface MusicDataType {
  id: number;
  img: string;
  title: string;
  artist: string;
}

const data: MusicDataType[] = [
  {
    id: 1,
    img:
      'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/373/146/81373146_1582781138572_1_600x600.JPG',
    title: 'talk is overrated',
    artist: 'Jeremy Zucker',
  },
  {
    id: 2,
    img:
      'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/373/146/81373146_1582781138572_1_600x600.JPG',
    title: 'talk is overrated',
    artist: 'Jeremy Zucker',
  },
  {
    id: 3,
    img:
      'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/373/146/81373146_1582781138572_1_600x600.JPG',
    title: 'talk is overrated',
    artist: 'Jeremy Zucker',
  },
  {
    id: 4,
    img:
      'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/373/146/81373146_1582781138572_1_600x600.JPG',
    title: 'talk is overrated',
    artist: 'Jeremy Zucker',
  },
  {
    id: 5,
    img:
      'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/373/146/81373146_1582781138572_1_600x600.JPG',
    title: 'talk is overrated',
    artist: 'Jeremy Zucker',
  },
  {
    id: 6,
    img:
      'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/373/146/81373146_1582781138572_1_600x600.JPG',
    title: 'talk is overrated',
    artist: 'Jeremy Zucker',
  },
  {
    id: 7,
    img:
      'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/373/146/81373146_1582781138572_1_600x600.JPG',
    title: 'talk is overrated',
    artist: 'Jeremy Zucker',
  },
];

const MainMusicComponent: React.FC = () => {
  const musicList: ReactNodeArray = data.map((item: MusicDataType) => (
    <MainMusicItemComponent data={item} key={item.id} />
  ));

  return (
    <MusicWrapper>
      <h1 className='title'>한빛 뮤직</h1>
      {musicList}
    </MusicWrapper>
  );
};

export default MainMusicComponent;
