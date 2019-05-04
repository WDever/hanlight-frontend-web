import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import AccoutKit from 'react-facebook-account-kit';
import { transitions } from 'lib/styles';
import { useInputs } from 'lib/hooks';
import { PhoneCheckProps, PhoneCheckMethod } from 'container/auth/phoneCheck';
import { PhoneCheckResType } from '../../../store';

const { useState, useEffect } = React;

interface PhoneCheckInputs {
  signKey: string;
  phoneNum: string;
}

type GetCodeStatus = | 'none'
| 'PARTIALLY_AUTHENTICATED'
| 'NOT_AUTHENTICATED'
| 'BAD_PARAMS';

const PhoneCheckWrapper = styled.div`
  width: 70%;
  margin-top: 1rem;
  height: 95%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 30%;

  animation: ${transitions.fadeIn} 2.5s;
`;

const GreetingDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 2.25rem;
  font-family: 'NanumSquare';
  font-weight: bold;
  font-family: 'NanumSquare';
  margin-bottom: 2rem;
`;

const Img = styled.img`
  width: 7rem;
  height: 9rem;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 40%;
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
  height: 60%;
`;

const Inputs = styled.input`
  color: #6c63ff;
  font-family: 'NanumSquare';
  font-size: 1.125rem;
  text-indent: 1.5rem;
  width: 28.125rem;
  height: 3.125rem;
  background-color: rgba(108, 99, 255, 0.15);

  outline: none;
  border: none;

  &::placeholder {
    font-family: 'NanumSquare';
    color: #6c63ff;
    text-indent: 1.5rem;
  }

  &:focus {
    background-color: white;
    border: solid 0.8px #6c63ff;
  }
`;

const NextBtn = styled.button<{ active: boolean }>`
  font-family: 'NanumSquare';
  font-size: 1.5rem;
  font-weight: bold;
  width: 28.125rem;
  height: 3.375rem;
  background-color: ${props => (props.active ? '#6c63ff' : 'rgba(108, 99, 255, 0.25)')};
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  letter-spacing: 0.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
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

const TermsWrapper = styled.p`
  font-size: 1rem;
  font-family: 'NanumSquare';
`;

const TermSpan = styled.span`
  color: #6c63ff;
`;

const PhoneCheckComponent: React.FC<
PhoneCheckProps & PhoneCheckMethod & RouteComponentProps
> = ({
  // signKey,
  state,
  verifyPhone,
  getState,
  getStateStatus,
  verifyStatus,
  history,
}) => {
  const [inputs, inputsChange] = useInputs<PhoneCheckInputs>({
    phoneNum: '',
    signKey: '',
  });
  const [code, setCode] = useState<string>('');
  const [getCodeStatus, setGetCodeStatus] = useState<GetCodeStatus>('none');

  const { phoneNum, signKey } = inputs;

  const verifyPhoneNum = () => {
    if (getCodeStatus === 'PARTIALLY_AUTHENTICATED') {
      console.log(state);
      console.log(code);
      console.log(signKey);
      verifyPhone({ code, state, signKey });
    } else {
      alert('핸드폰 인증 실패');
    }
  };

  const handleResponse = async (res: PhoneCheckResType) => {
    // await this.setState(
    //   () => ({
    //     code: res.code,
    //     getCodeStatus: res.status,
    //   }),
    //   () => this.verifyPhone(),
    // );

    await setCode(res.code);
    await setGetCodeStatus(res.status);
    await verifyPhoneNum();

    console.log(res);
  };

  useEffect(() => {
    if (verifyStatus === 'success') {
      console.log(verifyStatus);
      history.push('/auth/register');
    } else if (verifyStatus === 'failure') {
      console.log(verifyStatus);
      alert('실패!');
    }
  }, [history, verifyStatus]);

  return (
    <PhoneCheckWrapper>
      <GreetingDiv>
        <Img src={SignUpImgSrc} alt="" />
        회원 가입
      </GreetingDiv>
      <Form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <InputWrapper>
          <Inputs
            type="text"
            placeholder="제공된 핀 번호를 입력해주세요"
            name="signKey"
            autoComplete="off"
            onChange={inputsChange}
            onBlur={() => getState(signKey)}
          />
          <Inputs
            type="tel"
            name="phoneNum"
            autoComplete="off"
            placeholder="휴대폰 번호를 - 빼고 입력해주세요."
            onChange={inputsChange}
          />
        </InputWrapper>
        <TermsBtnWrapper>
          <TermsWrapper>
            회원가입 시
            <TermSpan>&nbsp;이용약관</TermSpan>
과
            <TermSpan>&nbsp;개인정보 이용 약관</TermSpan>
에 동의하게 됩니다.
          </TermsWrapper>
          {getStateStatus === 'success' && !!phoneNum ? (
            <AccoutKit
              appId="265056484381541"
              csrf={state}
              debug
              version="v1.1"
              phoneNumber={phoneNum}
              onResponse={handleResponse}
              language="ko_KR"
            >
              {(p: Function) => (
                <NextBtn active {...p}>
                  다음
                </NextBtn>
              )}
            </AccoutKit>
          ) : (
            <NextBtn
              active={!!(phoneNum && signKey)}
              style={getStateStatus === 'failure' ? { letterSpacing: '0' } : {}}
            >
              {getStateStatus === 'failure'
                ? '존재하지 않는 PIN 번호 입니다.'
                : '다음'}
            </NextBtn>
          )}
        </TermsBtnWrapper>
      </Form>
    </PhoneCheckWrapper>
  );
};

export default PhoneCheckComponent;
