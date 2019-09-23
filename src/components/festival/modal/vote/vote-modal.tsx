import * as React from 'react';

import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { festivalActions, festivalReducerActions } from 'store';
import styled from 'styled-components';
import {
  AcceptBtn,
  BtnWrapper,
  CancelBtn,
  ChildrenModalProps,
} from '../fs-modal.component';

const Content = styled.section`
  max-width: 14.625rem;
  margin: 1.25rem 0 1.25rem 0;
`;

const VoteContent = styled.h1`
  margin: 0;

  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  font-weight: normal;
  color: rgba(255, 255, 255, 0.87);

  text-align: center;
`;

const VoteModalComponent: React.FC<ChildrenModalProps> = ({
  type,
  content,
  acceptEvent,
}) => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { toggleModal } = festivalActions;

  return (
    <>
      <Content>
        <VoteContent>
          '{content}'
          {type === 'lol'
            ? '팀의 우승에 투표하시겠습니까?'
            : type === 'mask'
            ? '에게 투표하시겠습니까?'
            : ''}
        </VoteContent>
      </Content>
      <BtnWrapper>
        <AcceptBtn
          onClick={() => {
            acceptEvent();
            dispatch(toggleModal({ status: false }));
          }}
        >
          확인
        </AcceptBtn>
        <CancelBtn onClick={() => dispatch(toggleModal({ status: false }))}>
          취소
        </CancelBtn>
      </BtnWrapper>
    </>
  );
};

export default VoteModalComponent;
