import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { Inputs, Buttons, WrongLabel, InputsGroup } from 'lib/styles';
import { useInputs } from 'lib/hooks';
import Modal from 'components/auth/recovery/recoveryModal';
import {
  PwRecoveryProps,
  PwRecoveryMethod,
} from 'container/auth/recovery/pwRecovery';
import { password as passwordRegExp } from 'lib/RegExp/RegExp.json';

const { useRef, useState, useEffect, useCallback } = React;

const PwRecoveryWrapper = styled.div`
  width: 38.125rem;
  height: 32.25rem;
  margin-top: 1rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.16);
`;

const GreetingDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-weight: bold;
`;

const ColoredSpan = styled.span`
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  color: #4470ff;
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

const PwRecoveryComponent: React.FC<
  PwRecoveryProps & PwRecoveryMethod & RouteComponentProps
> = ({
  pwRecovery,
  pwRecoveryStatus,
  history,
  match,
  location,
  fbCode,
  id,
  reset,
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

    if (!!(password.length && rePassword.length)) {
      const pwCheckResult = pwCheck(password);
      const rpwCheckResult = rpwCheck(rePassword);

      setPwValidation(pwCheckResult);
      setRpwValidation(rpwCheckResult);

      if (pwCheckResult && rpwCheckResult) {
        pwRecovery({ code: fbCode, id, password });
      }
    }
  };

  useEffect(() => {
    if (!fbCode.length || !id.length) {
      history.push('/auth');
    }
  }, []);

  useEffect(
    () => () => {
      reset();
    },
    [],
  );

  return fbCode.length && id.length ? (
    <React.Fragment>
      {pwRecoveryStatus === 'success' && (
        <Modal
          width='50.25rem'
          height='24.625rem'
          type='phoneCheck'
          click={() => history.push('/auth')}
        />
      )}

      <PwRecoveryWrapper>
        <GreetingDiv>
          <ColoredSpan>재설정</ColoredSpan>
          할&nbsp;
          <ColoredSpan>비밀번호</ColoredSpan>를 입력해주세요
        </GreetingDiv>
        <Form onSubmit={recoverySubmit}>
          <InputWrapper>
            <InputsGroup width='28.75rem' height='6.5rem'>
              {!pwValidation && <WrongLabel>형식이 잘못되었습니다!</WrongLabel>}
              <Inputs
                type='password'
                wrong={!pwValidation}
                width='28.75rem'
                height='4.375rem'
                value={password}
                name='password'
                onChange={setInputs}
                placeholder='새 비밀번호'
                active={!!password}
              />
            </InputsGroup>
            <InputsGroup width='28.75rem' height='6.5rem'>
              {!rpwValidation && (
                <WrongLabel>비밀번호가 일치하지 않습니다.</WrongLabel>
              )}
              <Inputs
                type='password'
                wrong={!rpwValidation}
                width='28.75rem'
                height='4.375rem'
                value={rePassword}
                name='rePassword'
                onChange={setInputs}
                placeholder='확인'
                active={!!rePassword}
              />
            </InputsGroup>
          </InputWrapper>
          <Buttons
            width='28.75rem'
            height='4.375rem'
            active={!!(password.length && rePassword.length)}
          >
            설정
          </Buttons>
        </Form>
      </PwRecoveryWrapper>
    </React.Fragment>
  ) : (
    <></>
  );
};

export default PwRecoveryComponent;
