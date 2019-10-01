import * as React from 'react';

import { useInput, usePrevious } from 'lib/hooks';
import QrReader from 'react-qr-reader';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  ErrorModel,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  UserModel,
} from 'store';
import styled from 'styled-components';

const { useState, useEffect } = React;

const Wrapper = styled.article`
  width: 100%;
  height: 100vh;

  background-color: #313131;
`;

const FSAdminComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { postAdminMoney } = festivalActions;

  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { singers, festivalStatus } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );
  const { message: errorMessage } = useSelector<AppState, ErrorModel>(
    state => state.error,
  );

  const { getSingerStatus, postSingerVoteStatus } = festivalStatus;

  const prevStatus = usePrevious({ postSingerVoteStatus });

  const [usePk, setUserPk] = useState<string>('');
  const [amount, setAmount] = useInput('');

  // const submitCharge = () => dispatch(postAdminMoney({ accessToken, userPk, amount }))

  return (
    <Wrapper>
      <QrReader
        onScan={() => console.log('scan')}
        onError={() => console.log('error')}
      />
    </Wrapper>
  );
};

export default FSAdminComponent;
