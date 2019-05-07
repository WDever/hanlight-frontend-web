import * as React from 'react';
import styled from 'styled-components';
import { Inputs, Buttons } from 'lib/styles';
import { RouteComponentProps } from 'react-router-dom';
import { RegisterProps, RegisterMethod } from 'container/auth/register';
import { useInputs } from 'lib/hooks';

const { useEffect } = React;

interface RegisterState {
  id: string;
  password: string;
  rePassword: string;
}

const SecondStep = styled.span`
  font-size: 2rem;
  font-family: 'Noto Sans KR';
  font-weight: bold;
  margin-bottom: 2rem;
  color: #bfbfbf;
`;

const RegisterWrapper = styled.div`
  width: 38.125rem;
  height: 38rem;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.16);
  margin-top: 1rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
  color: #4470ff;
  margin-top: 3rem;
  /* margin-bottom: 2rem; */
`;

const Img = styled.img`
  width: 7rem;
  height: 9rem;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 65%;
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
  height: 80%;
`;

const Btn = styled.button<{ active: boolean }>`
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

const RegisterComponent: React.FC<
RegisterProps & RegisterMethod & RouteComponentProps
> = ({
  registerStatus, signKey, register, history,
}) => {
  const [inputs, inputsChange] = useInputs<RegisterState>({
    id: '',
    password: '',
    rePassword: '',
  });

  const { id, password, rePassword } = inputs;

  const registerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register({ id, password, signKey });
  };

  useEffect(() => {
    if (registerStatus === 'success') {
      console.log('성공');
      history.push('/auth');
    } else if (registerStatus === 'failure') {
      alert('실패');
    }
  }, [registerStatus, history]);

  return (
    <>
      <RegisterWrapper>
        {/* <SecondStep>STEP .2</SecondStep> */}
        <GreetingDiv>회원가입</GreetingDiv>
        <Form onSubmit={registerSubmit}>
          <InputWrapper>
            <Inputs
              width="28.75rem"
              height="4.375rem"
              active={!id}
              value={id}
              type="text"
              placeholder="아이디"
              name="id"
              autoComplete="off"
              onChange={inputsChange}
            />
            <Inputs
              width="28.75rem"
              height="4.375rem"
              active={!password}
              value={password}
              type="password"
              name="password"
              autoComplete="off"
              placeholder="비밀번호"
              onChange={inputsChange}
            />
            <Inputs
              width="28.75rem"
              height="4.375rem"
              active={!rePassword}
              value={rePassword}
              name="rePassword"
              autoComplete="off"
              placeholder="비밀번호 재입력"
              type="password"
              onChange={inputsChange}
            />
          </InputWrapper>
          <Buttons width="28.75rem" height="4.375rem" active={!!(id && password && rePassword)}>회원가입</Buttons>
        </Form>
      </RegisterWrapper>
    </>
  );
};

export default RegisterComponent;
