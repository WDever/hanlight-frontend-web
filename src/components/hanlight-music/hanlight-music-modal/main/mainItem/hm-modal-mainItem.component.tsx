import * as React from 'react';

import { Device } from 'lib/styles';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 3.125rem;

  background-color: #ffffff;

  border-radius: 1rem;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16);

  margin-bottom: 1rem;

  display: flex;
  align-items: center;

  @media ${Device.tabletL} {
    height: 2.5rem;
  }
`;

const Number = styled.p`
  font-size: 15px;
  font-family: 'yg-jalnan';

  margin: 0 2.25rem 0 1.25rem;

  @media ${Device.tabletL} {
    font-size: 0.875rem;
  }
`;

const AlbumImage = styled.img`
  width: 2.25rem;
  height: 2.25rem;

  background-color: #f3f3f3;

  margin-right: 2.25rem;

  @media ${Device.tabletL} {
    width: 1.875rem;
    height: 1.875rem;

    margin-right: 1.875rem;
  }
`;

const Title = styled.p`
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1rem;

  margin: 0;

  @media ${Device.tabletL} {
    font-size: 15px;
  }
`;

const Artist = styled.p`
  font-family: 'Spoqa Han Sans';
  font-size: 13px;

  margin: 0;
  margin-left: 1.875rem;

  @media ${Device.tabletL} {
    font-size: 0.75rem;
  }
`;

interface MainMusicItemProps {
  pk: number;
  albumImage: string;
  title: string;
  artist: string;
}

const HMModalMainItemComponent: React.FC<MainMusicItemProps> = ({
  pk,
  albumImage,
  title,
  artist,
}) => {
  return (
    <Wrapper>
      <Number>{pk}</Number>
      <AlbumImage src={albumImage} alt="album art" />
      <Title>{title}</Title>
      <Artist>{artist}</Artist>
    </Wrapper>
  );
};

export default HMModalMainItemComponent;
