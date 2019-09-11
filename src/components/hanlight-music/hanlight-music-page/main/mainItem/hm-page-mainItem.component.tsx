import * as React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 20rem;
  height: 3.75rem;

  display: flex;
  align-items: center;

  background-color: #ffffff;

  border-radius: 0.75rem;

  margin-bottom: 0.625rem;

  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.25);
`;

const Number = styled.p`
  margin: 0;

  font-size: 13px;
  font-family: 'yg-jalnan';

  margin: 0 1.25rem 0 1.625rem;
`;

const AlbumImg = styled.img`
  width: 2.875rem;
  height: 2.875rem;

  margin-right: 0.625rem;

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

export interface MainItemProps {
  pk: number;
  albumImage: string;
  title: string;
  artist: string;
}

const HMPageMainItemComponent: React.FC<MainItemProps> = ({
  pk,
  albumImage,
  title,
  artist,
}) => {
  return (
    <Wrapper>
      <Number>{pk}</Number>
      <AlbumImg src={albumImage} alt="album art" />
      <ContentWrapper>
        <h1>{title}</h1>
        <h2>{artist}</h2>
      </ContentWrapper>
    </Wrapper>
  );
};

export default HMPageMainItemComponent;
