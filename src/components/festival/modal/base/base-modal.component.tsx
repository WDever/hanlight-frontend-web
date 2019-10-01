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

const DeemStyled = styled(Deem)`
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

const Content = styled.h2`
  margin: 1.25rem 0 1.25rem 0;

  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  font-weight: normal;
  color: rgba(255, 255, 255, 0.87);

  width: 14.625rem;

  word-break: keep-all;

  text-align: center;
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

const BigAcceptBtn = styled(AcceptBtn)`
  width: 9.75rem;
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

export interface ModalProps {
  title: string | React.ReactElement;
  content: string | React.ReactElement;
  onAcceptClick?: () => void;
}

const FSBaseModalComponent: React.FC<ModalProps> = ({
  title,
  content,
  onAcceptClick,
}) => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { toggleModal } = festivalActions;

  const close = () => dispatch(toggleModal({ status: false }));

  return (
    <DeemStyled>
      <Hidden onClick={close} />
      <Wrapper>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <BtnWrapper>
          {onAcceptClick ? (
            <>
              <AcceptBtn
                onClick={() => {
                  onAcceptClick();
                  close();
                }}
              >
                확인
              </AcceptBtn>
              <CancelBtn onClick={close}>취소</CancelBtn>
            </>
          ) : (
            <>
              <BigAcceptBtn onClick={close}>확인</BigAcceptBtn>
            </>
          )}
        </BtnWrapper>
      </Wrapper>
    </DeemStyled>
  );
};

export default FSBaseModalComponent;
