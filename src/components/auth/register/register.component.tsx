import * as React from 'react';
import styled from 'styled-components';
import {
  Inputs, Buttons, WrongLabel, InputsGroup,
} from 'lib/styles';
import { RouteComponentProps } from 'react-router-dom';
import { RegisterProps, RegisterMethod } from 'container/auth/register';
import { useInputs } from 'lib/hooks';

const { useEffect, useState } = React;

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
  const [idValidation, setIdValidation] = useState<boolean>(true);
  const [pwValidation, setPwValidation] = useState<boolean>(true);
  const [rpwValidation, setRpwValidation] = useState<boolean>(true);

  const { id, password, rePassword } = inputs;

  const registerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register({ id, password, signKey });
  };

  const idCheck = (str: string): boolean => /[a-z0-9-_]{5,20}$/.test(str);

  const pwCheck = (str: string): boolean => /^[a-zA-Z0-9!@#$%^&*()]{8,16}$/.test(str);

  const rpwCheck = (str: string): boolean => (str === password) || str === '';

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
        <GreetingDiv>회원가입</GreetingDiv>
        <Form onSubmit={registerSubmit}>
          <InputWrapper>
            <InputsGroup width="28.75rem" height="6.5rem" where={false}>
              {!idValidation && <WrongLabel>형식이 잘못되었습니다!</WrongLabel>}
              <Inputs
                wrong={!idValidation}
                width="28.75rem"
                height="4.375rem"
                active={!!id}
                value={id}
                type="text"
                placeholder="아이디"
                name="id"
                autoComplete="off"
                onChange={inputsChange}
                onBlur={() => setIdValidation(idCheck(id))}
              />
            </InputsGroup>
            <InputsGroup width="28.75rem" height="6.5rem" where={false}>
              {!pwValidation && <WrongLabel>형식이 잘못되었습니다!</WrongLabel>}
              <Inputs
                wrong={!pwValidation}
                width="28.75rem"
                height="4.375rem"
                active={!!password}
                value={password}
                type="password"
                name="password"
                autoComplete="off"
                placeholder="비밀번호"
                onChange={inputsChange}
                onBlur={() => {
                  setPwValidation(pwCheck(password));
                  setRpwValidation(rpwCheck(rePassword));
                }}
              />
            </InputsGroup>
            <InputsGroup width="28.75rem" height="6.5rem" where={false}>
              {!rpwValidation && <WrongLabel>비밀번호와 일치하지 않습니다!</WrongLabel>}
              <Inputs
                wrong={!rpwValidation}
                width="28.75rem"
                height="4.375rem"
                active={!!rePassword}
                value={rePassword}
                name="rePassword"
                autoComplete="off"
                placeholder="비밀번호 재입력"
                type="password"
                onChange={inputsChange}
                onBlur={() => setRpwValidation(rpwCheck(rePassword))}
              />
            </InputsGroup>
          </InputWrapper>
          <Buttons
            width="28.75rem"
            height="4.375rem"
            active={!!(id && password && rePassword)}
          >
            회원가입
          </Buttons>
        </Form>
      </RegisterWrapper>
    </>
  );
};

export default RegisterComponent;
