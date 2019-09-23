import * as React from 'react';

import { Deem } from 'lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  modalType,
  PayItemType,
} from 'store';
import styled from 'styled-components';

import PayModalComponent from './pay';
import VoteModalComponent from './vote';

const Dim = styled(Deem)`
  background-color: rgba(49, 49, 49, 0.7);

  color: rgba(255, 255, 255, 0.87);

  z-index: 12;
`;

const Hidden = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.section`
  width: 18.75rem;

  background-color: #4a4a4a;

  border-radius: 0.375rem;

  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 1rem 0 0;

  font-family: 'Spoqa Han Sans';
  font-size: 1rem;
`;

const Red = styled.span`
  color: #ff4755;
`;

const Blue = styled.span`
  color: #6488ff;
`;

export const BtnWrapper = styled.section`
  width: 16.75rem;

  display: flex;
  justify-content: space-between;

  margin-bottom: 1rem;
`;

export const AcceptBtn = styled.button`
  width: 7.875rem;
  height: 2rem;

  font-size: 1rem;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  color: rgba(255, 255, 255, 0.87);

  background-color: #6488ff;

  border: none;
  border-radius: 1rem;

  outline: none;
`;

export const CancelBtn = styled(AcceptBtn)`
  color: rgba(255, 255, 255, 0.6);

  background-color: rgba(255, 255, 255, 0.05);
`;

export interface ChildrenModalProps {
  type: modalType;
  content: string | PayItemType[];
  acceptEvent(): void;
}

const FSModalComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { toggleModal } = festivalActions;

  const { modalData } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );

  const { type, content, acceptEvent } = modalData.data;

  return (
    <Dim>
      <Hidden onClick={() => dispatch(toggleModal({ status: false }))} />
      <Wrapper>
        <Title>
          {type === 'lol' ? (
            '우승 예측 투표'
          ) : type === 'mask' ? (
            '복면가왕 투표'
          ) : type === 'payment' ? (
            '결제를 진행해주세요'
          ) : type === 'refund' ? (
            <>
              정말 <Red>환불</Red>하시겠습니까?
            </>
          ) : type === 'use' ? (
            <>
              <Blue>사용</Blue>하시겠습니까?
            </>
          ) : type === 'refund-check' ? (
            <>
              <Red>환불</Red>되었습니다
            </>
          ) : (
            ''
          )}
        </Title>
        {(type === 'lol' || type === 'mask') && (
          <VoteModalComponent
            type={type}
            content={content}
            acceptEvent={acceptEvent}
          />
        )}
        {(type === 'payment' ||
          type === 'use' ||
          type === 'refund' ||
          type === 'refund-check') && (
          <PayModalComponent
            type={type}
            content={content}
            acceptEvent={acceptEvent}
          />
        )}
      </Wrapper>
    </Dim>
  );
};

export default FSModalComponent;
