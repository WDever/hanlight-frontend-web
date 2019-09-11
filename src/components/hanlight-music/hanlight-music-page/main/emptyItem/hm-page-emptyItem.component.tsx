import * as React from 'react';

import styled from 'styled-components';

const Wrapper = styled.section`
  width: 20rem;
  height: 3.75rem;

  background-color: #ffffff;

  border-radius: 0.75rem;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16);

  margin-bottom: 0.625rem;

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
  margin: 0;

  font-size: 13px;
  font-family: 'yg-jalnan';

  margin: 0 1.25rem 0 1.625rem;
`;

const AlbumImg = styled.div`
  width: 2.875rem;
  height: 2.875rem;

  margin-right: 0.625rem;

  background-color: #f3f3f3;

  border: solid 0.8px #a3a3a3;
`;

const ContentWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

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

const HMPageEmptyItemComponent: React.FC<{ pk: number }> = ({ pk }) => {
  return (
    <Wrapper>
      <Cover />
      <Number>{pk}</Number>
      <AlbumImg />
      <ContentWrapper>
        <span>-</span>
        <span>-</span>
      </ContentWrapper>
    </Wrapper>
  );
};

export default HMPageEmptyItemComponent;
