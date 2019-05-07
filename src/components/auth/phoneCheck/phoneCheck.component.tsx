import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import AccoutKit from 'react-facebook-account-kit';
import { transitions, Inputs, Buttons } from 'lib/styles';
import { useInputs } from 'lib/hooks';
import { PhoneCheckProps, PhoneCheckMethod } from 'container/auth/phoneCheck';
import { PhoneCheckResType } from 'store';

const { useEffect, useRef } = React;

interface PhoneCheckInputs {
  signKey: string;
  phoneNum: string;
}

type GetCodeStatus = | 'none'
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

  animation: ${transitions.fadeIn} 2.5s;
`;

const GreetingDiv = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-weight: bold;
  /* margin-bottom: 2rem; */
`;

const Img = styled.img`
  width: 7rem;
  height: 9rem;
  margin-bottom: 1rem;
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

const ColoredSpan = styled.span`
  color: #4470ff;
  font-size: 1.5rem;
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
  // const [code, setCode] = useState<string>('');
  // const [getCodeStatus, setGetCodeStatus] = useState<GetCodeStatus>('none');
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
      console.log(state);
      console.log(codeRef.current);
      console.log(signKey);
      const code = codeRef.current;
      verifyPhone({ code, state, signKey });
    } else {
      console.log(state);
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
    <>
      {/* <FirstStep>STEP .1</FirstStep> */}
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
            <Inputs
              width="28.75rem"
              height="4.375rem"
              active={!signKey}
              value={signKey}
              type="text"
              placeholder="제공된 핀 번호를 입력해주세요"
              name="signKey"
              autoComplete="off"
              onChange={inputsChange}
              onBlur={() => getState(signKey)}
            />
            <Inputs
              width="28.75rem"
              height="4.375rem"
              active={!phoneNum}
              value={phoneNum}
              type="tel"
              name="phoneNum"
              autoComplete="off"
              placeholder="휴대폰 번호를 - 빼고 입력해주세요."
              onChange={inputsChange}
            />
          </InputWrapper>
          <TermsBtnWrapper>
            {getStateStatus === 'success' && !!phoneNum ? (
              <AccoutKit
                appId="265056484381541"
                csrf={state}
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
                style={getStateStatus === 'failure' ? { letterSpacing: '0' } : {}}
              >
                {getStateStatus === 'failure'
                  ? '존재하지 않는 PIN 번호 입니다.'
                  : '인증'}
              </Buttons>
            )}
          </TermsBtnWrapper>
        </Form>
      </PhoneCheckWrapper>
    </>
  );
};

export default PhoneCheckComponent;
