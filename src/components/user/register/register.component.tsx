import * as React from 'react';

import ModalPhoneCheck from 'components/modal/phoneCheck';
import { RegisterMethod, RegisterProps } from 'container/user/register';
import { useInputs } from 'lib/hooks';
import {
  id as idRegExp,
  password as passwordRegExp,
} from 'lib/RegExp/RegExp.json';
import {
  Button,
  Device,
  Input,
  InputsGroup,
  WrongMessageWrapper,
} from 'lib/styles';
import HanlightLogo from 'lib/svg/hanlight-logo.svg';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const { useEffect, useState } = React;

interface RegisterState {
  id: string;
  password: string;
  rePassword: string;
}

const RegisterWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media ${Device.tabletL} {
    width: 85%;
  }
`;

const GreetingDiv = styled.div`
  width: 100%;
  margin-bottom: 2.56rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HanlightLogoImg = styled.img`
  width: 5.95rem;
  margin-bottom: 0.75rem;

  @media ${Device.mobileL} {
    width: 2.95rem;
  }
`;

const Title = styled.span`
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1.5rem;
  color: #000000;

  @media ${Device.mobileL} {
    font-size: 1.25rem;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const InputGroup = styled(InputsGroup)``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const IdInput = styled(Input)``;

const PwInput = styled(Input)``;

const RePwInput = styled(Input)``;

const InputName = styled.span`
  width: 100%;
  max-width: 36.25rem;
  margin-left: 0.25rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-family: 'Spoqa Han Sans';

  @media ${Device.mobileL} {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
`;

const RegisterComponent: React.FC<RegisterProps &
  RegisterMethod &
  RouteComponentProps> = ({
  registerStatus,
  signKey,
  register,
  history,
  resetUser,
  idExist,
  idExistStatus,
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

  const idCheck = (str: string): boolean => new RegExp(idRegExp).test(str);
  const pwCheck = (str: string): boolean =>
    new RegExp(passwordRegExp).test(str);
  const rPwCheck = (str: string): boolean => str === password;

  const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      idExistStatus !== 'pending' &&
      registerStatus !== 'pending' &&
      id &&
      password &&
      rePassword
    ) {
      const idCheckResult = idCheck(id);
      const pwCheckResult = pwCheck(password);
      const rpwCheckResult = rPwCheck(rePassword);

      setIdValidation(idCheckResult);
      setPwValidation(pwCheckResult);
      setRpwValidation(rpwCheckResult);

      if (idCheckResult && pwCheckResult && rpwCheckResult) {
        idExist({ id });
      }
    }
  };

  useEffect(() => {
    if (
      pwValidation &&
      rpwValidation &&
      idValidation &&
      idExistStatus === 'success-false'
    ) {
      register({ id, password, signKey });
    }
  }, [
    id,
    idExistStatus,
    idValidation,
    password,
    pwValidation,
    register,
    rpwValidation,
    signKey,
  ]);

  useEffect(() => {
    if (!signKey.length) {
      history.push('/user/login');
    }
  }, []);

  useEffect(
    () => () => {
      resetUser();
    },
    [],
  );

  return (
    <>
      {registerStatus === 'success' && (
        <ModalPhoneCheck
          message='회원가입 성공'
          click={() => {
            resetUser();
            history.push('/user/login');
          }}
        />
      )}

      <RegisterWrapper>
        <GreetingDiv>
          <HanlightLogoImg src={HanlightLogo} alt='' />
          <Title>회원가입</Title>
        </GreetingDiv>
        <Form onSubmit={registerSubmit}>
          <InputWrapper>
            <InputGroup>
              <InputName>아이디</InputName>
              <IdInput
                wrong={!idValidation || idExistStatus === 'success-true'}
                value={id}
                type='text'
                placeholder='5~20자의 영문 소문자, 숫자와 특수기호 _ , /만 사용가능'
                name='id'
                autoComplete='off'
                onChange={inputsChange}
              />
              <WrongMessageWrapper>
                {idExistStatus === 'success-true'
                  ? '중복되는 아이디입니다.'
                  : !idValidation
                  ? '5~20자의 영문 소문자, 숫자와 특수기호 _ , /만 사용가능합니다'
                  : ''}
              </WrongMessageWrapper>
            </InputGroup>
            <InputGroup>
              <InputName>비밀번호</InputName>
              <PwInput
                wrong={!pwValidation}
                value={password}
                type='password'
                name='password'
                autoComplete='off'
                placeholder='8~16자의 영문 대소문자, 숫자나 특수문자(키보드 1~0)'
                onChange={inputsChange}
              />
              <WrongMessageWrapper>
                {!pwValidation &&
                  '8~16자의 영문 대소문자, 숫자나 특수문자(키보드 1~0)를 사용해주세요'}
              </WrongMessageWrapper>
            </InputGroup>
            <InputGroup>
              <InputName>비밀번호 확인</InputName>
              <RePwInput
                wrong={!rpwValidation}
                value={rePassword}
                name='rePassword'
                autoComplete='off'
                placeholder='**********'
                type='password'
                onChange={inputsChange}
              />
              <WrongMessageWrapper>
                {!rpwValidation && '비밀번호와 일치하지 않습니다!'}
              </WrongMessageWrapper>
            </InputGroup>
          </InputWrapper>
          <Button
            active={
              !!id && !!password && !!rePassword && registerStatus !== 'pending'
            }
          >
            회원가입
          </Button>
        </Form>
      </RegisterWrapper>
    </>
  );
};

export default RegisterComponent;
