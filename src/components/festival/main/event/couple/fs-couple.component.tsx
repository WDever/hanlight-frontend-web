import * as React from 'react';

import { DefaultBoxOpacity } from 'lib/styles';
import HeartSvg from 'lib/svg/couple-heart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  UserModel,
} from 'store';
import styled from 'styled-components';

const { useEffect } = React;

const Title = styled.h1`
  margin: 25px 0 15px 0;

  font-family: 'yg-jalnan';
  font-size: 15px;
  color: #e4e4e4;
`;

const NumberWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    position: absolute;
    z-index: 1;
  }

  h1 {
    margin: 0;

    font-family: 'yg-jalnan';
    font-size: 4.375rem;
    color: #fcfcfc;

    position: relative;
    z-index: 2;
  }
`;

const TxtWrapper = styled.section`
  width: 100%;

  background-color: ${DefaultBoxOpacity};

  border-radius: 0.375rem;

  display: flex;
  flex-direction: column;

  margin-top: 15px;

  p {
    font-family: 'Spoqa Han Sans';
    font-size: 13px;
    color: #e4e4e4;

    margin: 3px 0 3px 0.625rem;

    :first-of-type {
      margin-top: 0.625rem;
    }

    :last-of-type {
      margin-bottom: 0.625rem;
    }

    span {
      font-weight: bold;
    }
  }
`;

const FSCoupleComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { getMatchNumber } = festivalActions;

  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { coupleNumber, festivalStatus } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );

  useEffect(() => {
    dispatch(getMatchNumber({ accessToken }));
  }, [accessToken]);

  return (
    <>
      <Title>나의 짝 번호는?</Title>
      <NumberWrapper>
        <img src={HeartSvg} alt="heart" />
        <h1>{coupleNumber}</h1>
      </NumberWrapper>
      <TxtWrapper>
        <p>
          <span>Step1)</span> 나의 짝 번호를 가진 짝을 찾는다.
        </p>
        <p>
          <span>Step2)</span> 짝과 손 잡고 학생회 부스로 간다.
        </p>
        <p>
          <span>Step3)</span> 손 대신 상품을 쥐고 헤어진다.
        </p>
      </TxtWrapper>
    </>
  );
};

export default FSCoupleComponent;
