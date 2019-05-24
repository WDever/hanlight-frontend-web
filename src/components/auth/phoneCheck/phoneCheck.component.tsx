import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import AccountKit, { ChildrenParams } from 'components/facebook-account-kit';
import uuid from 'uuid';
import {
  Inputs, Buttons, WrongLabel, InputsGroup,
} from 'lib/styles';
import { useInputs } from 'lib/hooks';
import { PhoneCheckProps, PhoneCheckMethod } from 'container/auth/phoneCheck';
import { PhoneCheckResType } from 'store';
import {
  signKey as signKeyRegExp,
  tp as tpRegExp,
} from 'lib/RegExp/RegExp.json';

const { useRef, useState, useEffect } = React;

interface PhoneCheckInputs {
  signKey: string;
  tp: string;
}

export type GetCodeStatus = | 'none'
| 'PARTIALLY_AUTHENTICATED'
| 'NOT_AUTHENTICATED'
| 'BAD_PARAMS';

const PhoneCheckWrapper = styled.div`
  width: 38.125rem;
  height: 31.875rem;
  margin-top: 1rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.16);
`;

const GreetingDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-weight: bold;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 70%;
`;

const TermsBtnWrapper = styled.div`
  font-family: 'NanumSquare';
  width: 28.125rem;
  color: black;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ColoredSpan = styled.span`
  color: #4470ff;
  font-size: 1.5rem;
`;

const PhoneCheckComponent: React.FC<
PhoneCheckProps & PhoneCheckMethod & RouteComponentProps
> = ({
  tpExist,
  signKeyExist,
  tpExistStatus,
  signKeyExistStatus,
  verifyPhone,
  verifyStatus,
  history,
  setSignKey,
  resetExist,
}) => {
  const [inputs, inputsChange] = useInputs<PhoneCheckInputs>({
    tp: '',
    signKey: '',
  });
  const [signKeyValidation, setSignKeyValidation] = useState<boolean>(true);
  const [tpValidation, setTpValidation] = useState<boolean>(true);
  const codeRef = useRef<string>('');
  const getCodeStatus = useRef<GetCodeStatus>('none');

  const setGetCodeStatus = async (resStatus:GetCodeStatus) => {
    getCodeStatus.current = resStatus;
  };

  const setCodeRef = async (resCode: string) => {
    codeRef.current = resCode;
  };

  const { tp, signKey } = inputs;

  const verifyPhoneNum = async () => {
    if (getCodeStatus.current === 'PARTIALLY_AUTHENTICATED') {
      console.log(codeRef);
      console.log(signKey);
      verifyPhone({ code: codeRef.current, signKey });
    } else if (getCodeStatus.current === 'BAD_PARAMS') {
      console.log(getCodeStatus);
      console.log(signKey);
      alert('핸드폰 인증 실패 (BAD_PARAMS)');
    } else if (getCodeStatus.current === 'NOT_AUTHENTICATED') {
      console.log(getCodeStatus);
      console.log(signKey);
      alert('핸드폰 인증 실패');
    }
  };

  const handleResponse = async (res: PhoneCheckResType) => {
    await setCodeRef(res.code);
    await setGetCodeStatus(res.status);
    await verifyPhoneNum();
    console.log(res);
  };

  const signKeyCheck = (str: string) => new RegExp(signKeyRegExp).test(str);

  const tpCheck = (str: string) => new RegExp(tpRegExp).test(str);

  const signKeyFunc = async () => {
    setSignKeyValidation(signKeyCheck(signKey));
    signKeyExist(signKey);
    setSignKey(signKey);
  };

  const tpFunc = async () => {
    setTpValidation(tpCheck(tp));
    tpExist(tp);
  };

  useEffect(() => {
    if (verifyStatus === 'success') {
      console.log(verifyStatus);
      history.push('/auth/register/create');
    } else if (verifyStatus === 'failure') {
      console.log(verifyStatus);
      alert('실패!');
    }
  }, [history, verifyStatus]);

  useEffect(
    () => () => {
      resetExist();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <PhoneCheckWrapper>
      <GreetingDiv>
        <ColoredSpan>등록키</ColoredSpan>
        와&nbsp;
        <ColoredSpan>전화번호</ColoredSpan>
        를&nbsp; 입력해주세요
      </GreetingDiv>
      <Form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <InputWrapper>
          <InputsGroup width="28.75rem" height="6.5rem">
            {(!signKeyValidation
              || (signKeyExistStatus === 'failure')) && (
              <WrongLabel>
                형식이 잘못되었거나 없는 회원가입 키 입니다!
              </WrongLabel>
            )}
            <Inputs
              wrong={!signKeyValidation || (signKeyExistStatus === 'failure')}
              width="28.75rem"
              height="4.375rem"
              active={!!signKey}
              value={signKey}
              type="text"
              placeholder="제공된 핀 번호를 입력해주세요"
              name="signKey"
              autoComplete="off"
              onChange={inputsChange}
            />
          </InputsGroup>
          <InputsGroup width="28.75rem" height="6.5rem">
            {(!tpValidation || (tpExistStatus === 'success')) && (
              <WrongLabel>
                형식이 잘못되었거나 이미 등록된 전화번호 입니다!
              </WrongLabel>
            )}
            <Inputs
              wrong={!tpValidation || tpExistStatus === 'success'}
              width="28.75rem"
              height="4.375rem"
              active={!!tp}
              value={tp}
              type="tel"
              name="tp"
              autoComplete="off"
              placeholder="휴대폰 번호를 - 빼고 입력해주세요."
              onChange={inputsChange}
            />
          </InputsGroup>
        </InputWrapper>
        <TermsBtnWrapper>
          {!!tp && !!signKey ? (
            <AccountKit
              appId="265056484381541"
              csrf={uuid.v4()}
              debug
              version="v1.1"
              phoneNumber={tp}
              onResponse={handleResponse}
              language="ko_KR"
              optionalFunc={async () => {
                await signKeyFunc();
                await tpFunc();
              }}
              validation={
                tpExistStatus === 'failure'
                && tpValidation
                && signKeyExistStatus === 'success'
                && signKeyValidation
              }
            >
              {(p: ChildrenParams) => (
                <Buttons width="28.75rem" height="4.375rem" active {...p}>
                  인증
                </Buttons>
              )}
            </AccountKit>
          ) : (
            <Buttons
              width="28.75rem"
              height="4.375rem"
              active={
                !!(tp && signKey)
                && signKeyExistStatus === 'success'
                && tpExistStatus === 'success'
              }
              style={signKeyExistStatus ? { letterSpacing: '0' } : {}}
            >
              인증
            </Buttons>
          )}
        </TermsBtnWrapper>
      </Form>
    </PhoneCheckWrapper>
  );
};

export default PhoneCheckComponent;
