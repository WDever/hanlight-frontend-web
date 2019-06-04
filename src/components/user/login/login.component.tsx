import * as React from 'react';

import { LoginMethod, LoginProps } from 'container/user/login';
import { useInputs } from 'lib/hooks';
import {
  id as idRegExp,
  password as passwordRegExp,
} from 'lib/RegExp/RegExp.json';
import { Buttons, Inputs, transitions } from 'lib/styles';
import Logo from 'lib/svg/hanlight-logo.svg';
import { NavLink, NavLinkProps, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const { useState, useEffect } = React;

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
  height: 50%;
`;

const FindBtnsWrapper = styled.div`
  font-family: 'NanumSquare';
  width: 70%;
  color: #6c63ff;
  font-size: 1.25rem;
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const WrongLabel = styled.label`
  width: 27rem;
  height: 3.125rem;
  color: #ff0000;
  font-family: 'Noto Sans KR';
  font-size: 1rem;
`;

const NavLinkDiv = (props: NavLinkProps) => <NavLink {...props} />;

const FindBtns = styled(NavLinkDiv)<{ colored?: boolean }>`
  font-family: 'Noto Sans KR';
  font-size: 1.25rem;
  color: ${props => (props.colored ? '#4470ff' : '#a2a2a2')};
  font-weight: 500;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
`;

const LoginComponent: React.FC<
  LoginProps & LoginMethod & RouteComponentProps
> = ({ login, history, loginStatus }) => {
  const [inputs, inputsChange] = useInputs<LoginState>({
    id: '',
    password: '',
  });
  const [validation, setValidation] = useState(true);

  const { id, password } = inputs;

  const idCheck = (str: string) => new RegExp(idRegExp).test(str);
  const pwCheck = (str: string) => new RegExp(passwordRegExp).test(str);

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id && password) {
      if (idCheck(id) && pwCheck(password)) {
        login({ id, password });
      } else {
        setValidation(false);
      }
    }
  };

  useEffect(() => {
    // after try to login
    if (loginStatus === 'success') {
      history.push('/');
    }
  }, [loginStatus, history]);

  return (
    <LoginWrapper>
      <GreetingDiv>
        <LoginImg src={Logo} alt="" />
      </GreetingDiv>
      <LoginForm onSubmit={submitLogin}>
        <LoginInputWrapper>
          <Inputs
            width="28.75rem"
            height="4.375rem"
            active={!!id}
            type="id"
            placeholder="아이디"
            onChange={inputsChange}
            name="id"
            value={id}
          />
          <Inputs
            width="28.75rem"
            height="4.375rem"
            active={!!password}
            type="password"
            placeholder="비밀번호"
            onChange={inputsChange}
            name="password"
            value={password}
          />
        </LoginInputWrapper>
        <WrongLabel>
          {(loginStatus === 'failure' || !validation) && (
            <span>
              한빛에 등록되지 않은 아이디이거나,
              <br />
              아이디 또는 비밀번호를 잘못 입력하셨습니다.
            </span>
          )}
        </WrongLabel>
        <Buttons
          width="28.75rem"
          height="4.375rem"
          active={!!(id && password && loginStatus !== 'pending')}
        >
          로그인
        </Buttons>
      </LoginForm>
      <FindBtnsWrapper>
        <FindBtns to="/user/phone?type=recovery&key=id">ID 찾기</FindBtns>
        <FindBtns to="/user/phone?type=recovery&key=password">
          비밀번호 찾기
        </FindBtns>
        <FindBtns colored={true} to="/user/phone?type=register">
          회원가입
        </FindBtns>
      </FindBtnsWrapper>
    </LoginWrapper>
  );
};

export default LoginComponent;
