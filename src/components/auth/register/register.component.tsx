import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { RegisterProps, RegisterMethod } from 'container/auth/register';
import { useInputs } from 'lib/hooks';

const { useEffect } = React;

interface RegisterState {
  id: string;
  password: string;
  rePassword: string;
}

const RegisterWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  height: 95%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
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
  /* margin-bottom: 1rem; */
`;

const Img = styled.img`
  width: 7rem;
  height: 9rem;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 55%;
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
  height: 65%;
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
    <RegisterWrapper>
      <GreetingDiv>
        <Img src={''} alt="" />
        계정 생성
      </GreetingDiv>
      <Form onSubmit={registerSubmit}>
        <InputWrapper>
          <Inputs
            type="text"
            placeholder="아이디"
            name="id"
            autoComplete="off"
            onChange={inputsChange}
          />
          <Inputs
            type="password"
            name="password"
            autoComplete="off"
            placeholder="비밀번호"
            onChange={inputsChange}
          />
          <Inputs
            name="rePassword"
            autoComplete="off"
            placeholder="비밀번호 재입력"
            type="password"
            onChange={inputsChange}
          />
        </InputWrapper>
        <Btn active={!!(id && password && rePassword)}>회원가입</Btn>
      </Form>
    </RegisterWrapper>
  );
};

export default RegisterComponent;
