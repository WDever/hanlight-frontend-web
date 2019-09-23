import * as React from 'react';

import { CompletelyBoxOpacity } from 'lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FSCoupleComponent from './couple';
import FSMaskComponent from './mask';
import FSSTampComponent from './stamp';

const { useState } = React;

const Wrapper = styled.article`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BtnsWrapper = styled.div`
  width: 100%;
`;

const Btn = styled.button<{ active: boolean }>`
  width: calc(100% / 3);

  background-color: ${CompletelyBoxOpacity};

  font-size: 0.875rem;
  font-weight: bold;
  font-family: 'Spoqa Han Sans';
  color: #e4e4e4;

  border: none;
  border-bottom: ${({ active }) =>
    active ? 'solid 2px #6488ff' : 'solid 2px transparent'};
  outline: none;
`;

type categoryType = 'stamp' | 'couple' | 'mask';

const FSEventComponent: React.FC = () => {
  const [category, setCategory] = useState<categoryType>('stamp');

  return (
    <Wrapper>
      <BtnsWrapper>
        <Btn onClick={() => setCategory('stamp')} active={category === 'stamp'}>
          부스 참여
        </Btn>
        <Btn
          onClick={() => setCategory('couple')}
          active={category === 'couple'}
        >
          짝찾기
        </Btn>
        <Btn onClick={() => setCategory('mask')} active={category === 'mask'}>
          복면 가왕
        </Btn>
      </BtnsWrapper>
      {category === 'stamp' && <FSSTampComponent />}
      {category === 'couple' && <FSCoupleComponent />}
      {category === 'mask' && <FSMaskComponent />}
    </Wrapper>
  );
};

export default FSEventComponent;
