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

  opacity: 0.8;

  position: relative;
`;

const Cover = styled.div`
  background-color: #ffffff;

  opacity: 0.8;

  width: 100%;
  height: 100%;

  position: absolute;

  border-radius: 1rem;
`;

const Number = styled.p`
  font-size: 15px;
  font-family: 'yg-jalnan';

  margin: 0 2.25rem 0 1.25rem;
`;

const AlbumImage = styled.div`
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

interface EmptyItemProps {
  pk: number;
}

const HMEmptyItemComponent: React.FC<EmptyItemProps> = ({ pk }) => {
  return (
    <Wrapper>
      <Cover />
      <Number>{pk}</Number>
      <AlbumImage />
      <Title>-</Title>
      <Artist>-</Artist>
    </Wrapper>
  );
};

export default HMEmptyItemComponent;
