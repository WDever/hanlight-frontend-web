import * as React from 'react';
import styled from 'styled-components';
import {
  transitions,
  Inputs,
  Buttons,
  InputsGroup,
  WrongLabel,
} from 'lib/styles';
import { useInputs } from 'lib/hooks';
import Logo from 'lib/svg/hanlight-logo.svg';
import { LoginProps, LoginMethod } from 'container/auth/login';
import { RouteComponentProps } from 'react-router-dom';

const { useState, useEffect, useRef } = React;

interface LoginState {
  id: string;
  password: string;
}

const LoginWrapper = styled.div`
  position: relative;
  left: 50%;
  width: 38.125rem;
  height: 43.75rem;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;

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
  margin-bottom: 2rem;
`;

const LoginImg = styled.img`
  width: 12.5rem;
  height: 12.5rem;
  margin-bottom: 1rem;
`;

const LoginInputWrapper = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 55%;
`;

const FindBtnsWrapper = styled.div`
  font-family: 'NanumSquare';
  width: 70%;
  color: #6c63ff;
  font-size: 1.25rem;
  display: flex;
  justify-content: space-around;
`;

const FindBtns = styled.button<{ colored?: boolean }>`
  font-family: 'Noto Sans KR';
  font-size: 1.25rem;
  color: ${props => (props.colored ? '#4470ff' : '#a2a2a2')};
  font-weight: 500;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

const LoginComponent: React.FC<
LoginProps & LoginMethod & RouteComponentProps
> = ({ login, history, loginStatus }) => {
  const [inputs, inputsChange] = useInputs<LoginState>({
    id: '',
    password: '',
  });
  const [idValidation, setIdValidation] = useState<boolean>(true);
  const [pwValidation, setPwValidation] = useState<boolean>(true);
  const idValidationRef = useRef<boolean>(true);
  const pwValidationRef = useRef<boolean>(true);

  const { id, password } = inputs;

  const asyncSetIdVal = async (bool: boolean) => setIdValidation(bool);

  const asyncSetPwVal = async (bool: boolean) => setPwValidation(bool);

  const idCheck = (str: string): boolean => /[a-z0-9-_]{5,20}$/.test(str);

  const pwCheck = (str: string): boolean => /^[a-zA-Z0-9!@#$%^&*()]{8,16}$/.test(str);

  const setIdValidationRef = async () => {
    idValidationRef.current = idCheck(id);
  };

  const setPwValidationRef = async () => {
    pwValidationRef.current = pwCheck(password);
  };

  const loginFunc = async () => {
    console.log(idValidation, pwValidation);
    if (idValidationRef.current && pwValidationRef.current) {
      console.log(idValidation, pwValidation);
      console.log(idValidation && pwValidation);
      login({ id, password });
    }
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await asyncSetIdVal(idCheck(id));
    await asyncSetPwVal(pwCheck(password));
    await setIdValidationRef();
    await setPwValidationRef();
    await loginFunc();

    console.log(idValidation, pwValidation);
  };

  useEffect(() => {
    // after try to login
    if (loginStatus === 'success') {
      history.push('/');
    } else if (loginStatus === 'failure') {
      alert('로그인 실패');
    }
  }, [loginStatus, history]);

  return (
    <LoginWrapper>
      <GreetingDiv>
        <LoginImg src={Logo} alt="" />
      </GreetingDiv>
      <LoginForm onSubmit={submitLogin}>
        <LoginInputWrapper>
          <InputsGroup width="28.75rem" height="6rem" where>
            <Inputs
              wrong={!idValidation}
              width="28.75rem"
              height="4.375rem"
              active={!!id}
              type="id"
              placeholder="아이디"
              onChange={inputsChange}
              name="id"
              value={id}
            />
          </InputsGroup>
          <InputsGroup width="28.75rem" height="6rem" where>
            <Inputs
              wrong={!pwValidation}
              width="28.75rem"
              height="4.375rem"
              active={!!password}
              type="password"
              placeholder="비밀번호"
              onChange={inputsChange}
              name="password"
              value={password}
            />
          </InputsGroup>
        </LoginInputWrapper>
        {!(pwValidation && idValidation) && (
          <WrongLabel>
            <span>
              한빛에 등록되지 않은 아이디이거나,
              <br />
              아이디 또는 비밀번호를 잘못 입력하셨습니다.
            </span>
          </WrongLabel>
        )}
        <Buttons width="28.75rem" height="4.375rem" active={!!(id && password)}>
          로그인
        </Buttons>
      </LoginForm>
      <FindBtnsWrapper>
        <FindBtns>ID / 비밀번호 찾기</FindBtns>
        <FindBtns colored onClick={() => history.push('/auth/register')}>
          회원가입
        </FindBtns>
      </FindBtnsWrapper>
    </LoginWrapper>
  );
};

export default LoginComponent;
