import * as React from 'react';

import { LoginMethod, LoginProps } from 'container/user/login';
import { useInputs } from 'lib/hooks';
import { Button, Device, Input, transitions } from 'lib/styles';
import LogoSvg from 'lib/svg/hanlight-logo.svg';
import { NavLink, NavLinkProps, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const { useState, useEffect } = React;

interface LoginState {
  id: string;
  password: string;
}

const LoginWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 3rem;
  animation: ${transitions.fadeIn} 2.5s;
`;

const GreetingDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 2.25rem;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
`;

const LoginImg = styled.img`
  width: 6.95rem;
  margin-bottom: 4.375rem;

  @media ${Device.mobileL} {
    width: 2.95rem;
    margin-bottom: 2.5rem;
  }
`;

const LoginForm = styled.form`
  border-bottom: solid 2px #d9d9d9;
  padding-bottom: 3.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${Device.tabletS} {
    width: 90%;
  }
  @media ${Device.mobileL} {
    border-bottom: solid 1px #d9d9d9;
    padding-bottom: 1.25rem;
  }
`;

const ErrorMessage = styled.div`
  width: 100%;
  max-width: 36.25rem;
  height: 3.125rem;
  margin-top: 0.875rem;
  margin-bottom: 2.75rem;
  color: #ff0000;
  font-family: 'Spoqa Han Sans';
  font-size: 1rem;

  @media ${Device.mobileL} {
    height: 2rem;
    font-size: 0.63rem;
    margin-top: 0.5rem;
    margin-bottom: 1.75rem;
  }
`;

const LoginInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginInputId = styled(Input)`
  margin-bottom: 1.375rem;

  @media ${Device.tabletS} {
    margin-bottom: 1.125rem;
  }
`;

const LoginInputPw = styled(Input)``;

const NavLinkDiv = (props: NavLinkProps) => <NavLink {...props} />;

const LoginBtn = styled(Button)``;

const FindBtnsWrapper = styled.div`
  font-family: 'Spoqa Han Sans';
  font-size: 1.125rem;
  margin-top: 1rem;
  display: flex;

  @media ${Device.tabletS} {
    margin-top: 2.25rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.625rem;
    margin-top: 0.5rem;
  }
`;

const FindBtn = styled(NavLinkDiv)`
  padding: 0 2.31rem 0 2.31rem;
  color: #a9a9a9;
  font-family: 'Spoqa Han Sans';
  white-space: nowrap;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #4470ff;
  }

  @media ${Device.mobileL} {
    padding: 0 1.03rem 0 1.03rem;
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

    if (loginStatus !== 'pending' && id && password) {
      login({ id, password });
    }
  };

  useEffect(() => {
    if (loginStatus === 'success') {
      history.push('/');
    }
  }, [loginStatus, history]);

  return (
    <LoginWrapper>
      <GreetingDiv>
        <LoginImg src={LogoSvg} alt="" />
      </GreetingDiv>
      <LoginForm onSubmit={submitLogin}>
        <LoginInputWrapper>
          <LoginInputId
            type="id"
            placeholder="아이디"
            onChange={inputsChange}
            name="id"
            value={id}
            wrong={loginStatus === 'failure'}
            autoComplete="off"
          />
          <LoginInputPw
            type="password"
            placeholder="비밀번호"
            onChange={inputsChange}
            name="password"
            value={password}
            wrong={loginStatus === 'failure'}
            autoComplete="off"
          />
        </LoginInputWrapper>
        <ErrorMessage>
          {loginStatus === 'failure' && (
            <span>
              한빛에 등록되지 않은 아이디이거나,
              <br />
              아이디 또는 비밀번호를 잘못 입력하셨습니다.
            </span>
          )}
        </ErrorMessage>
        <LoginBtn active={!!id && !!password && loginStatus !== 'pending'}>
          로그인
        </LoginBtn>
      </LoginForm>
      <FindBtnsWrapper>
        <FindBtn to="/user/phone?type=recovery&key=id">ID 찾기</FindBtn>
        <FindBtn
          style={{
            borderLeft: 'solid 1px #e1e1e1',
            borderRight: 'solid 1px #e1e1e1',
          }}
          to="/user/phone?type=recovery&key=password"
        >
          비밀번호 찾기
        </FindBtn>
        <FindBtn to="/user/phone?type=register">회원가입</FindBtn>
      </FindBtnsWrapper>
    </LoginWrapper>
  );
};

export default LoginComponent;
