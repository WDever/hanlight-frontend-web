import * as React from 'react';

import { Deem, Device } from 'lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { hanlightMusicActions, hanlightMusicReducerActions } from 'store';
import styled from 'styled-components';

import HMMainComponent from 'components/hanlight-music/hanlight-music-modal/main';
import HMSearchComponent from './search';
import HMSideBarComponent from './sideBar';

const { useState, useEffect } = React;

const BackGround = Deem;

const Hidden = styled.div`
  width: 100%;
  height: 100%;
`;

const XButton = styled.span`
  width: 25px;
  height: 20px;
  top: 40px;
  right: 30px;
  border-radius: 1.25rem;
  position: absolute;

  cursor: pointer;

  z-index: 3;

  @media ${Device.mobileL} {
    top: 16px;
    right: 4px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &::before,
  &::after {
    height: 2px;
    width: 25px;
    position: absolute;
    content: ' ';
    border-radius: 1.25rem;
    background-color: #555555;
  }
`;

const Wrapper = styled.div`
  position: absolute;

  width: 50rem;
  height: 37.5rem;

  background-color: #ffffff;

  border-radius: 0.5rem;

  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.25);

  display: flex;

  @media ${Device.tabletL} {
    width: 43rem;
    height: 32.25rem;
  }
`;

export type categoryType = 'list' | 'search';

const HanlightMusicModalComponent: React.FC = () => {
  const dispatch: Dispatch<hanlightMusicReducerActions> = useDispatch();

  const { toggleHM, resetSearchList } = hanlightMusicActions;

  const [category, setCategory] = useState<categoryType>('list');

  useEffect(
    () => () => {
      dispatch(resetSearchList());
      dispatch(toggleHM(false));
    },
    [],
  );

  return (
    <BackGround>
      <Hidden onClick={() => dispatch(toggleHM(false))} />
      <Wrapper>
        <XButton onClick={() => dispatch(toggleHM(false))} />
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

export default HanlightMusicModalComponent;
