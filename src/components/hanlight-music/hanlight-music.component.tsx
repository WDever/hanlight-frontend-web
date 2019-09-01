import * as React from 'react';

import HMMainComponent from 'components/hanlight-music/main';
import { Deem } from 'lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import HMSearchComponent from './search';
import HMSideBarComponent from './sideBar';

const { useState, useEffect } = React;

const BackGround = Deem;

const Wrapper = styled.div`
  width: 50rem;
  height: 37.5rem;

  background-color: #ffffff;

  border-radius: 0.5rem;

  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.25);

  display: flex;
`;

export type categoryType = 'list' | 'search';

const HanlightMusicComponent: React.FC = () => {
  const [category, setCategory] = useState<categoryType>('list');

  return (
    <BackGround>
      <Wrapper>
        <HMSideBarComponent category={category} setCategory={setCategory} />
        {category === 'list' ? (
          <HMMainComponent />
        ) : category === 'search' ? (
          <HMSearchComponent />
        ) : (
          <></>
        )}
      </Wrapper>
    </BackGround>
  );
};

export default HanlightMusicComponent;
