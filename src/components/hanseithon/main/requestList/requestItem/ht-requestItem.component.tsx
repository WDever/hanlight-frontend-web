import * as React from 'react';

import styled from 'styled-components';
import { ModalTypes } from 'store';

const Wrapper = styled.div`
  width: 100%;
  height: 4rem;

  display: flex;

  background-color: #ffffff;
`;

const NameBox = styled.div`
  width: 72.4%;
  height: 100%;
  border: solid 1px #e8e8e8;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Open Sans';
  font-size: 19px;
  font-weight: bold;
`;

const Box = styled.div`
  width: 27.6%;
  height: 100%;

  border: solid 1px #e8e8e8;

  display: flex;
  justify-content: center;
  align-items: center;

  button {
    font-family: 'Open Sans';
    font-weight: bold;
    font-size: 1rem;
    color: #ffffff;

    cursor: pointer;

    height: 2.25rem;
    width: 8.7rem;

    border-radius: 1.25rem;
    background-color: #000000;
  }
`;

export interface RequestListItemProps {
  modal(payload: ModalTypes): void;
  deem(payload: boolean): void;
}


const HTRequestItemComponent: React.FC<RequestListItemProps> = ({ deem, modal }) => {
  return (
    <Wrapper>
      <NameBox>이름</NameBox>
      <Box>
        <button onClick={() => {
          deem(true);
          modal('detail-view');
        }}>상세보기</button>
      </Box>
    </Wrapper>
  );
};

export default HTRequestItemComponent;
