import * as React from 'react';

import ListIcon from 'lib/svg/hm-list-icon.svg';
import SearchIcon from 'lib/svg/hm-search-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { categoryType } from '../hanlight-music.component';

const { useState, useEffect } = React;

const Wrapper = styled.div`
  width: 4rem;
  height: 100%;

  background-color: #ffffff;
`;

const Block = styled.div<{ active: boolean }>`
  width: 100%;
  height: 3.875rem;

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  border-left: ${({active}) => active ? '7px solid #4470ff' : 'none'};

  img {
    width: 1.375rem;
  }
`;

export interface SideBarProps {
  category: categoryType;
  setCategory: React.Dispatch<React.SetStateAction<categoryType>>;
}

const HMSideBarComponent: React.FC<SideBarProps> = ({
  category,
  setCategory,
}) => {
  return (
    <Wrapper>
      <Block active={category === 'list'} onClick={() => setCategory('list')}>
        <img src={ListIcon} alt="list" />
      </Block>
      <Block
        active={category === 'search'}
        onClick={() => setCategory('search')}
      >
        <img src={SearchIcon} alt="search" />
      </Block>
    </Wrapper>
  );
};

export default HMSideBarComponent;
