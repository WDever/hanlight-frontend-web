import * as React from 'react';

import { Device } from 'lib/styles';
import ListIcon from 'lib/svg/hm-list-icon.svg';
import SearchIcon from 'lib/svg/hm-search-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { categoryType } from '../hanlight-music-modal.component';

const { useState, useEffect } = React;

const Wrapper = styled.div`
  width: 4rem;
  height: 100%;

  background-color: #ffffff;

  display: inline-flex;
  flex-direction: column;

  box-shadow: inset 0 0px 10px 0 rgba(0, 0, 0, 0.07);

  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;

  position: relative;

  z-index: 1;

  @media ${Device.tabletL} {
    width: 3.375rem;
  }
`;

const Block = styled.div<{ active: boolean }>`
  width: 100%;
  height: 3.875rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  border-left: ${({ active }) =>
    active ? '7px solid #4470ff' : '7px solid transparent'};

  cursor: pointer;

  box-shadow: ${({ active }) =>
    active ? '-7px 3px 10px 0 rgba(0, 0, 0, 0.07)' : 'none'};

  ${({ active }) =>
    active &&
    css`
      background-color: #ffffff;
      position: relative;
      z-index: 3;
    `}

  @media ${Device.tabletL} {
    height: 3.2rem;
  }

  img {
    width: 1.375rem;

    @media ${Device.tabletL} {
      width: 1.125rem;
    }
  }

  :first-of-type {
    border-top-left-radius: 0.5rem;
  }

  div {
    width: 7px;
    height: 100%;

    background-color: #4470ff;
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
