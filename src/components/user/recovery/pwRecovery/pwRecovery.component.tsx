import * as React from 'react';

import ModalRecovery from 'components/modal/recovery';
import {
  PwRecoveryMethod,
  PwRecoveryProps,
} from 'container/user/recovery/pwRecovery';
import { useInputs } from 'lib/hooks';
import { password as passwordRegExp } from 'lib/RegExp/RegExp.json';
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

const { useState, useEffect } = React;

const PwRecoveryWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
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
  margin-bottom: 3.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media ${Device.tabletL} {
    height: unset;
  }
`;

const InputGroup = styled(InputsGroup)``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

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

const PwRecoveryComponent: React.FC<PwRecoveryProps &
  PwRecoveryMethod &
  RouteComponentProps> = ({
  match,
  history,
  location,
  resetUser,
  accessToken,
  patchPassword,
  patchPasswordStatus,
}) => {
  const [inputs, setInputs] = useInputs({
    password: '',
    rePassword: '',
  });
  const [pwValidation, setPwValidation] = useState<boolean>(true);
  const [rpwValidation, setRpwValidation] = useState<boolean>(true);

  const { password, rePassword } = inputs;

  const pwCheck = (str: string): boolean =>
    new RegExp(passwordRegExp).test(str);

  const rpwCheck = (str: string): boolean => str === password;

  const recoverySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      patchPasswordStatus !== 'pending' &&
      password.length &&
      rePassword.length
    ) {
      const pwCheckResult = pwCheck(password);
      const rpwCheckResult = rpwCheck(rePassword);

      setPwValidation(pwCheckResult);
      setRpwValidation(rpwCheckResult);

      if (pwCheckResult && rpwCheckResult) {
        patchPassword({ accessToken, password });
      }
    }
  };

  useEffect(() => {
    if (!accessToken.length) {
      history.push('/user/login');
    }
  }, [accessToken, history]);

  useEffect(
    () => () => {
      resetUser();
    },
    [],
  );

  return (
    <>
      {patchPasswordStatus === 'success' && (
        <ModalRecovery
          type='password'
          click={() => {
            resetUser();
            history.push('/user/login');
          }}
        />
      )}

      <PwRecoveryWrapper>
        <GreetingDiv>
          <HanlightLogoImg src={HanlightLogo} alt='' />
          <Title>비밀번호 재설정</Title>
        </GreetingDiv>

        <Form onSubmit={recoverySubmit}>
          <InputWrapper>
            <InputGroup>
              <InputName>비밀번호</InputName>
              <Input
                type='password'
                wrong={!pwValidation}
                value={password}
                name='password'
                onChange={setInputs}
                placeholder='8~16자의 영문 대소문자, 숫자 및 특수문자(키보드 1~0)'
              />
              <WrongMessageWrapper>
                {!pwValidation &&
                  '8~16자의 영문 대소문자, 숫자 및 특수문자(키보드 1~0)를 사용해주세요'}
              </WrongMessageWrapper>
            </InputGroup>
            <InputGroup>
              <InputName>비밀번호 확인</InputName>

              <Input
                type='password'
                wrong={!rpwValidation}
                value={rePassword}
                name='rePassword'
                onChange={setInputs}
                placeholder='확인'
              />
              <WrongMessageWrapper>
                {!rpwValidation && '비밀번호가 일치하지 않습니다.'}
              </WrongMessageWrapper>
            </InputGroup>
          </InputWrapper>
          <Button
            active={
              !!(password.length && rePassword.length) &&
              patchPasswordStatus !== 'pending'
            }
          >
            설정
          </Button>
        </Form>
      </PwRecoveryWrapper>
    </>
  );
};

export default PwRecoveryComponent;
