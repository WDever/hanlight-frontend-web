/* eslint-disable @typescript-eslint/indent */
import AccountKit, {
  ChildrenParams,
  FbAccountKitResType,
} from 'components/facebook-account-kit';
import { PhoneCheckMethod, PhoneCheckProps } from 'container/user/phoneCheck';
import { useInputs } from 'lib/hooks';
import { Buttons, Inputs, InputsGroup, WrongLabel } from 'lib/styles';
import queryString from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import uuid from 'uuid';

import {
  id as idRegExp,
  signKey as signKeyRegExp,
  tp as tpRegExp,
} from 'lib/RegExp/RegExp.json';
import RecoveryModalComponent from '../recovery/modal';

const { useRef, useState, useEffect } = React;

export type GetCodeStatus =
  | 'none'
  | 'PARTIALLY_AUTHENTICATED'
  | 'NOT_AUTHENTICATED'
  | 'BAD_PARAMS';

const PhoneCheckWrapper = styled.div<{
  component_type: 'register' | 'recovery' | '';
  component_key: 'id' | 'password' | '';
}>`
  width: ${props =>
    props.component_type === 'recovery' && props.component_key === 'id'
      ? 38.1875
      : 38.125}rem;
  height: ${props =>
    props.component_type === 'recovery' && props.component_key === 'id'
      ? 24.5625
      : 31.875}rem;
  margin-top: 1rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin-top: 3rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Form = styled.form<{
  component_type: '' | 'register' | 'recovery';
  component_key: '' | 'id' | 'password';
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${props =>
    props.component_type === 'register' ||
    (props.component_type === 'recovery' && props.component_key === 'password')
      ? 76
      : 70}%;
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
  margin-bottom: 3rem;
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
  verifyPhone,
  verifyStatus,
  history,
  match,
  location,
  tpExistStatus,
  signKeyExistStatus,
  setSignKey,
  reset,
  idExistStatus,
  idExist,
  setFbCode,
  idRecovery,
  idRecoveryStatus,
  recoveryId,
  setId,
}) => {
  const [inputs, inputsChange] = useInputs({
    tp: '',
    signKey: '',
    id: '',
  });
  const [signKeyValidation, setSignKeyValidation] = useState<boolean>(true);
  const [tpValidation, setTpValidation] = useState<boolean>(true);
  const [idValidation, setIdValidation] = useState<boolean>(true);
  const [type, setType] = useState<'register' | 'recovery' | ''>('');
  const [key, setKey] = useState<'id' | 'password' | ''>('');
  const [queryValidation, setQueryValidation] = useState<boolean>(false);
  const codeRef = useRef<string>('');
  const getCodeStatus = useRef<GetCodeStatus>('none');

  const { tp, signKey, id } = inputs;

  const handleResponse = (res: FbAccountKitResType) => {
    codeRef.current = res.code;
    getCodeStatus.current = res.status;
    console.log(res);

    if (getCodeStatus.current === 'PARTIALLY_AUTHENTICATED') {
      if (type === 'register') {
        setSignKey(signKey);
        verifyPhone({ code: codeRef.current, signKey });
      } else if (type === 'recovery' && key === 'id') {
        idRecovery({ code: codeRef.current });
      } else if (type === 'recovery' && key === 'password') {
        setFbCode(codeRef.current);
        setId(id);
        history.push('/user/recovery/password');
      }
    } else if (getCodeStatus.current === 'BAD_PARAMS') {
      console.log(getCodeStatus);
      console.log(signKey);
      alert('핸드폰 인증 실패 (BAD_PARAMS)');
    }
  };

  const signKeyCheck = (str: string) => new RegExp(signKeyRegExp).test(str);
  const tpCheck = (str: string) => new RegExp(tpRegExp).test(str);
  const idCheck = (str: string) => new RegExp(idRegExp).test(str);

  const signKeyValidate = () => {
    const signKeyCheckResult = signKeyCheck(signKey);
    setSignKeyValidation(signKeyCheckResult);
    if (signKeyCheckResult) {
      signKeyExist({ signKey });
    }
  };

  const tpValidate = () => {
    const tpCheckResult = tpCheck(tp);
    setTpValidation(tpCheckResult);
    if (tpCheckResult) {
      tpExist({ tp });
    }
  };

  const idValidate = () => {
    const idCheckResult = idCheck(id);
    setIdValidation(idCheckResult);
    if (idCheckResult) {
      idExist({ id });
    }
  };

  const typingCheck = (): boolean => {
    if (type === 'register') {
      return !!tp.length && !!signKey.length;
    }
    if (type === 'recovery' && key === 'id') {
      return !!tp.length;
    }
    if (type === 'recovery' && key === 'password') {
      return !!id.length && !!tp.length;
    }
    return false;
  };

  useEffect(() => {
    const parsedQuery = queryString.parse(location.search);
    const { type, key } = parsedQuery;
    if (type === 'register') {
      setQueryValidation(true);
      setType(type);
      setSignKey(signKey);
    } else if (type === 'recovery' && (key === 'id' || key === 'password')) {
      setQueryValidation(true);
      setType(type);
      setKey(key);
    } else {
      setQueryValidation(false);
      history.push('/user/login');
    }
  }, [history, location.search, setSignKey, signKey]);

  useEffect(() => {
    if (verifyStatus === 'success') {
      history.push('/user/register');
    }
  }, [history, verifyStatus]);

  useEffect(() => {
    // getCodeStatus.current = 'none';
    reset();
  }, [reset]);

  return (
    <React.Fragment>
      {idRecoveryStatus === 'success' && (
        <RecoveryModalComponent
          width="50.25rem"
          height="24.625rem"
          type="recovery"
          id={recoveryId}
          click={() => history.push('/user/login')}
        />
      )}
      {queryValidation ? (
        <PhoneCheckWrapper component_type={type} component_key={key}>
          <GreetingDiv>
            {type === 'register' && (
              <React.Fragment>
                <ColoredSpan>등록키</ColoredSpan>
                와&nbsp;
              </React.Fragment>
            )}
            {type === 'recovery' && key === 'password' && (
              <React.Fragment>
                <ColoredSpan>아이디</ColoredSpan>
                와&nbsp;
              </React.Fragment>
            )}
            <ColoredSpan>전화번호</ColoredSpan>
            를&nbsp; 입력해주세요
          </GreetingDiv>
          <Form
            component_type={type}
            component_key={key}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              e.preventDefault()
            }
          >
            <InputWrapper>
              {type === 'register' ? (
                <InputsGroup width="28.75rem" height="6.5rem">
                  {(!signKeyValidation ||
                    signKeyExistStatus === 'success-false') && (
                    <WrongLabel>
                      형식이 잘못되었거나 존재하지 않는 회원가입 키 입니다!
                    </WrongLabel>
                  )}
                  <Inputs
                    wrong={
                      !signKeyValidation ||
                      signKeyExistStatus === 'success-false'
                    }
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
              ) : (
                <React.Fragment />
              )}
              {type === 'recovery' && key === 'password' ? (
                <InputsGroup width="28.75rem" height="6.5rem">
                  {(!idValidation || idExistStatus === 'failure') && (
                    <WrongLabel>
                      형식이 잘못되었거나 존재하지 않는 아이디 입니다!
                    </WrongLabel>
                  )}
                  <Inputs
                    wrong={
                      !idValidation ||
                      idExistStatus === 'success-false' ||
                      idExistStatus === 'failure'
                    }
                    width="28.75rem"
                    height="4.375rem"
                    value={id}
                    name="id"
                    onChange={inputsChange}
                    placeholder="아이디"
                    active={!!id}
                  />
                </InputsGroup>
              ) : (
                <React.Fragment />
              )}
              <InputsGroup width="28.75rem" height="6.5rem">
                {(!tpValidation ||
                  (type === 'recovery'
                    ? tpExistStatus === 'success-false'
                    : false) ||
                  (type === 'register'
                    ? tpExistStatus === 'success-true'
                    : false)) && (
                  <WrongLabel>
                    형식이 잘못되었거나 존재하지 않는 전화번호 입니다!
                  </WrongLabel>
                )}
                <Inputs
                  wrong={
                    !tpValidation ||
                    tpExistStatus === 'failure' ||
                    (type === 'register'
                      ? tpExistStatus === 'success-true'
                      : tpExistStatus === 'success-false')
                  }
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
              {typingCheck() ? (
                <AccountKit
                  appId="265056484381541"
                  csrf={uuid.v4()}
                  debug={true}
                  version="v1.1"
                  phoneNumber={tp}
                  onResponse={handleResponse}
                  language="ko_KR"
                  optionalFunc={() => {
                    if (type === 'register') {
                      signKeyValidate();
                      tpValidate();
                    } else if (type === 'recovery' && key === 'id') {
                      tpValidate();
                    } else if (type === 'recovery' && key === 'password') {
                      idValidate();
                      tpValidate();
                    }
                  }}
                  validation={
                    queryValidation &&
                    idValidation &&
                    tpValidation &&
                    signKeyValidation &&
                    (type === 'register'
                      ? tpExistStatus === 'success-false' &&
                        signKeyExistStatus === 'success-true'
                      : true) &&
                    (type === 'recovery' && key === 'id'
                      ? tpExistStatus === 'success-true'
                      : true) &&
                    (type === 'recovery' && key === 'password'
                      ? idExistStatus === 'success-true' &&
                        tpExistStatus === 'success-true'
                      : true)
                  }
                >
                  {(p: ChildrenParams) => (
                    <Buttons
                      width="28.75rem"
                      height="4.375rem"
                      active={true}
                      {...p}
                    >
                      인증
                    </Buttons>
                  )}
                </AccountKit>
              ) : (
                <Buttons
                  width="28.75rem"
                  height="4.375rem"
                  active={false}
                  style={signKeyExistStatus ? { letterSpacing: '0' } : {}}
                >
                  인증
                </Buttons>
              )}
            </TermsBtnWrapper>
          </Form>
        </PhoneCheckWrapper>
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
};

export default PhoneCheckComponent;
