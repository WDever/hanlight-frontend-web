import * as React from 'react';
import styled from 'styled-components';
import { transitions } from 'lib/styles';
import { useInputs } from 'lib/hooks';
import LoginImgSrc from 'lib/svg/login.svg';
import { LoginProps, LoginMethod } from 'container/auth/login';
import { RouteComponentProps } from 'react-router-dom';

const { useEffect } = React;

interface LoginState {
  id: string;
  password: string;
}

const LoginWrapper = styled.div`
  width: 70%;
  height: 90%;
  display: inline-flex;
  flex-direction: column;
  margin: 4rem 0 0 0;

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
  height: 50%;
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
  height: 50%;
`;

const LoginBtn = styled.button<{ active: boolean }>`
  font-family: 'NanumSquare';
  font-size: 1.5rem;
  font-weight: 800;
  width: 28.125rem;
  height: 3.375rem;
  background-color: ${props => (props.active ? '#6c63ff' : 'rgba(108, 99, 255, 0.25)')};
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  letter-spacing: 0.5rem;
`;

const FindBtnsWrapper = styled.div`
  font-family: 'NanumSquare';
  width: 28.125rem;
  color: #6c63ff;
  font-size: 1.25rem;
  display: flex;
  justify-content: flex-end;
`;

const FindBtns = styled.button`
  font-family: 'NanumSquare';
  font-size: 1.25rem;
  color: #6c63ff;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
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

const LoginComponent: React.FC<
LoginProps & LoginMethod & RouteComponentProps
> = ({ login, history, loginStatus }) => {
  const [inputs, inputsChange] = useInputs<LoginState>({
    id: '',
    password: '',
  });

  const { id, password } = inputs;

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({ id, password });
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
        <LoginImg src={LoginImgSrc} alt="" />
        한빛에 오신 것을 환영합니다
      </GreetingDiv>
      <LoginForm onSubmit={submitLogin}>
        <LoginInputWrapper>
          <Inputs
            type="id"
            placeholder="아이디"
            onChange={inputsChange}
            name="id"
            value={id}
          />
          <Inputs
            type="password"
            placeholder="비밀번호"
            onChange={inputsChange}
            name="password"
            value={password}
          />
        </LoginInputWrapper>
        <LoginBtn active={!!(id && password)}>로그인</LoginBtn>
        <FindBtnsWrapper>
          <FindBtns>아이디 찾기</FindBtns>
|
          <FindBtns>비밀번호 찾기</FindBtns>
        </FindBtnsWrapper>
      </LoginForm>
    </LoginWrapper>
  );
};

export default LoginComponent;
