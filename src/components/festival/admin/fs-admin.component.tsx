import * as React from 'react';

import { useInput } from 'lib/hooks';
import QrReader from 'react-qr-reader';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  UserModel,
  AdminMoneyModel,
} from 'store';
import styled from 'styled-components';

const { useState, useEffect } = React;

const Wrapper = styled.article`
  width: 100%;

  background-color: #313131;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MoneyInput = styled.input`
  width: 75%;
  height: 3rem;
  margin-top: 1rem;
  padding-left: 5%;
  padding-right: 5%;
  border-radius: 0.25rem;
  font-size: 1.25rem;

  border: 0;
`;

const SubmitButton = styled.button`
  background-color: #6488ff;
  font-family: "Spoqa HanSans";
  width: 85%;
  margin-top: 1rem;
  height: 3rem;
  border-radius: 0.25rem;
  font-size: 1rem;

  border: 0;
`
const ResetButton = styled.button`
  background-color: #d1d0d0;
  font-family: "Spoqa HanSans";
  width: 85%;
  margin-top: 1rem;
  height: 3rem;
  border-radius: 0.25rem;
  font-size: 1rem;

  border: 0;
`

const FSAdminComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { postAdminMoney, getAdminMoneyList, postAdminMoneyApprove } = festivalActions;

  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { festivalStatus, adminChargeList } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );
  const { postAdminMoneyStatus, postAdminMoneyApproveStatus } = festivalStatus;

  const [userPk, setUserPk] = useState<string>('');
  const [amount, setAmount] = useInput('');

  useEffect(() => {
    dispatch(getAdminMoneyList({ accessToken }));
  }, [postAdminMoneyApproveStatus])

  const submitCharge = () => dispatch(postAdminMoney({ accessToken, userPk, amount: parseInt(amount, 10) }));

  const onScan = (pk: string | null) => {
    if (pk !== null) setUserPk(pk);
  }
  const onError = (error: string) => alert(error);

  console.log(adminChargeList);

  const list = adminChargeList/* .filter((charge: AdminMoneyModel) => charge.confirmed === false) */
    .map((charge: AdminMoneyModel) => (
    <li>
      <span>{charge.user_name}</span>님 <span>{charge.amount}원</span> <button disabled={postAdminMoneyApproveStatus === 'pending'} style={{backgroundColor: 'white'}} onClick={() => dispatch(postAdminMoneyApprove({ accessToken, charge_pk: charge.pk }))}>승인</button>
    </li>
  ));

  return (
    <Wrapper>
      <QrReader
        onScan={onScan}
        onError={onError}
      />
      <h1 color={'#ffffff'}>{userPk}</h1>
      <ButtonWrapper>
        <MoneyInput type="number" placeholder={'돈'} onChange={setAmount} disabled={userPk.length === 0}/>
        <SubmitButton type="submit" onClick={submitCharge}>충전 신청</SubmitButton>
        <ResetButton type="submit" onClick={() => setUserPk('')}>리셋</ResetButton>
      </ButtonWrapper>

      <ul>
        {list.reverse()}
      </ul>
    </Wrapper>
  );
};

export default FSAdminComponent;
