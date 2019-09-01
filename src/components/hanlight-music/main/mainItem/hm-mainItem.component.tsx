import * as React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 42.25rem;
  height: 3.125rem;

  background-color: #ffffff;

  border-radius: 1rem;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16);

  margin-bottom: 1rem;

  display: flex;
  align-items: center;
`;

const Number = styled.p`
  font-size: 15px;
  font-family: 'yg-jalnan';

  margin: 0 2.25rem 0 1.25rem;
`;

const AlbumImage = styled.img`
  width: 2.25rem;
  height: 2.25rem;

  background-color: #f3f3f3;

  margin-right: 2.25rem;
`;

const Title = styled.p`
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1rem;

  margin: 0;
`;

const Artist = styled.p`
  font-family: 'Spoqa Han Sans';
  font-size: 13px;

  margin: 0;
  margin-left: 1.875rem;
`;

interface MainMusicItemProps {
  pk: number;
  albumImage: string;
  title: string;
  artist: string;
}

const HMMainItemComponent: React.FC<MainMusicItemProps> = ({
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

export default HMMainItemComponent;
