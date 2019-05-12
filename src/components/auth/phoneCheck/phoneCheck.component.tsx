import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import AccoutKit from 'react-facebook-account-kit';
import uuid from 'uuid';
import {
  Inputs,
  Buttons,
  WrongLabel,
  InputsGroup,
} from 'lib/styles';
import { useInputs } from 'lib/hooks';
import { TP_EXIST, SIGN_KEY_EXIST } from 'store/action';
import { PhoneCheckProps, PhoneCheckMethod } from 'container/auth/phoneCheck';
import { PhoneCheckResType } from 'store';
import { signKey as signKeyRegExp, tp } from 'lib/RegExp/RegExp.json';

const { useState, useEffect, useRef } = React;

interface PhoneCheckInputs {
  signKey: string;
  phoneNum: string;
}

export type GetCodeStatus = | 'none'
| 'PARTIALLY_AUTHENTICATED'
| 'NOT_AUTHENTICATED'
| 'BAD_PARAMS';

const FirstStep = styled.span`
  font-size: 3rem;
  font-family: 'Noto Sans KR';
  font-weight: bold;
  margin-bottom: 2rem;
  color: #bfbfbf;
`;

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
  exist,
  existStatus,
  tpExistStatus,
  signKeyExistStatus,
  verifyPhone,
  verifyStatus,
  history,
  setSignKey,
}) => {
  const [inputs, inputsChange] = useInputs<PhoneCheckInputs>({
    phoneNum: '',
    signKey: '',
  });
  const [signKeyValidation, setSignKeyValidation] = useState<boolean>(true);
  const [phoneNumValidation, setPhoneNumValidation] = useState<boolean>(true);
  const codeRef = useRef<string>('');
  const getCodeStatus = useRef<GetCodeStatus>('none');

  const setCode = async (resCode: string) => {
    codeRef.current = resCode;
  };

  const setGetCodeStatus = async (resStatus: GetCodeStatus) => {
    getCodeStatus.current = resStatus;
  };

  const { phoneNum, signKey } = inputs;

  const verifyPhoneNum = async () => {
    if (getCodeStatus.current === 'PARTIALLY_AUTHENTICATED') {
      console.log(codeRef.current);
      console.log(signKey);
      const code = codeRef.current;
      verifyPhone({ code, signKey });
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
    await setCode(res.code);
    await setGetCodeStatus(res.status);
    await verifyPhoneNum();
    console.log(res);
  };

  const signKeyCheck = (str: string) => new RegExp(signKeyRegExp).test(str);

  const phoneNumCheck = (str: string) => new RegExp(tp).test(str);

  const signKeyFunc = () => {
    setSignKeyValidation(signKeyCheck(signKey));
    exist({ key: 'signKey', value: signKey, type: SIGN_KEY_EXIST });
    setSignKey(signKey);
  };

  const phoneNumFunc = () => {
    setPhoneNumValidation(phoneNumCheck(phoneNum));
    exist({ key: 'tp', value: phoneNum, type: TP_EXIST });
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
          <InputsGroup width="28.75rem" height="6rem">
            {!signKeyValidation && (
              <WrongLabel>형식이 잘못되었습니다!</WrongLabel>
            )}
            <Inputs
              wrong={!signKeyValidation}
              width="28.75rem"
              height="4.375rem"
              active={!!signKey}
              value={signKey}
              type="text"
              placeholder="제공된 핀 번호를 입력해주세요"
              name="signKey"
              autoComplete="off"
              onChange={inputsChange}
              onBlur={signKeyFunc}
            />
          </InputsGroup>
          <InputsGroup width="28.75rem" height="6rem">
            {!phoneNumValidation && (
              <WrongLabel>형식이 잘못되었습니다!</WrongLabel>
            )}
            <Inputs
              wrong={!phoneNumValidation}
              width="28.75rem"
              height="4.375rem"
              active={!!phoneNum}
              value={phoneNum}
              type="tel"
              name="phoneNum"
              autoComplete="off"
              placeholder="휴대폰 번호를 - 빼고 입력해주세요."
              onChange={inputsChange}
              onBlur={phoneNumFunc}
            />
          </InputsGroup>
        </InputWrapper>
        <TermsBtnWrapper>
          {tpExistStatus && signKeyExistStatus && !!phoneNum ? (
            <AccoutKit
              appId="265056484381541"
              csrf={uuid.v4()}
              debug
              version="v1.1"
              phoneNumber={phoneNum}
              onResponse={handleResponse}
              language="ko_KR"
              optionalFunc={() => console.log('test2')}
            >
              {(p: Function) => (
                <Buttons width="28.75rem" height="4.375rem" active {...p}>
                  인증
                </Buttons>
              )}
            </AccoutKit>
          ) : (
            <Buttons
              width="28.75rem"
              height="4.375rem"
              active={!!(phoneNum && signKey)}
              style={signKeyExistStatus ? { letterSpacing: '0' } : {}}
            >
              {existStatus === 'success' || 'failure'
                ? signKeyExistStatus
                  ? '인증'
                  : '존재하지 않거나 중복되는 PIN 입니다'
                : '인증'}
            </Buttons>
          )}
        </TermsBtnWrapper>
      </Form>
    </PhoneCheckWrapper>
  );
};

export default PhoneCheckComponent;
