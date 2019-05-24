import * as React from 'react';
import styled from 'styled-components';
import AccountKit, { ChildrenParams } from 'components/facebook-account-kit';
import uuid from 'uuid';
import { RouteComponentProps } from 'react-router-dom';
import {
  Inputs, Buttons, WrongLabel, InputsGroup,
} from 'lib/styles';
import { useInputs } from 'lib/hooks';
import { PhoneCheckResType } from 'store/action';
import { GetCodeStatus } from 'components/auth/phoneCheck';
import Modal from 'components/modal';
import { PwFindProps, PwFindMethod } from 'container/auth/pwFind';
import {
  tp as tpRegExp,
  password as passwordRegExp,
  id as idRegExp,
} from 'lib/RegExp/RegExp.json';

const {
  useRef, useState, useEffect, useCallback,
} = React;

const PwFindWrapper = styled.div`
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

const PwFindComponent: React.FC<
PwFindProps & PwFindMethod & RouteComponentProps
> = ({
  tpExistStatus,
  idExistStatus,
  tpExist,
  idExist,
  pwRecovery,
  pwRecoveryStatus,
  history,
  resetExist,
  resetUser,
  match,
  location,
}) => {
  const [inputs, setInputs] = useInputs({
    tp: '',
    id: '',
    password: '',
    rePassword: '',
  });
  const [idValidation, setIdValidation] = useState<boolean>(true);
  const [tpValidation, setTpValidation] = useState<boolean>(true);
  const [modalValidation, setModalValidation] = useState<boolean>(false);
  const [viewReset, setViewReset] = useState<boolean>(false);
  const [pwValidation, setPwValidation] = useState<boolean>(true);
  const [rpwValidation, setRpwValidation] = useState<boolean>(true);
  const codeRef = useRef<string>('');
  const getCodeStatus = useRef<GetCodeStatus>('none');

  const setGetCodeStatus = async (resStatus: GetCodeStatus) => {
    getCodeStatus.current = resStatus;
  };

  const setCodeRef = async (resCode: string) => {
    codeRef.current = resCode;
  };

  const {
    tp, id, password, rePassword,
  } = inputs;

  const idCheck = (str: string): boolean => new RegExp(idRegExp).test(str);

  const tpCheck = (str: string): boolean => new RegExp(tpRegExp).test(str);

  const pwCheck = (str: string): boolean => new RegExp(passwordRegExp).test(str);

  const rpwCheck = useCallback(
    (str: string): boolean => str === password || str === '',
    [password],
  );

  const tpFunc = async () => {
    setTpValidation(tpCheck(tp));
    tpExist(tp);
  };

  const idFunc = async () => {
    setIdValidation(idCheck(id));
    idExist(id);
  };

  const pwFunc = async () => {
    await setRpwValidation(rpwCheck(rePassword));
    await setPwValidation(pwCheck(password));
  };

  const verifyTp = async () => {
    if (getCodeStatus.current === 'PARTIALLY_AUTHENTICATED') {
      console.log(codeRef.current);
      setModalValidation(true);
      setViewReset(true);
    } else if (getCodeStatus.current === 'BAD_PARAMS') {
      console.log(getCodeStatus);
      alert('핸드폰 인증 실패 (BAD_PARAMS)');
    } else if (getCodeStatus.current === 'NOT_AUTHENTICATED') {
      console.log(getCodeStatus);
      alert('핸드폰 인증 실패');
    }
  };

  const handleResponse = async (res: PhoneCheckResType) => {
    await setCodeRef(res.code);
    await setGetCodeStatus(res.status);
    await verifyTp();
  };

  const recoverySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await pwFunc();

    if (rpwCheck(rePassword) && pwCheck(password)) {
      await pwRecovery({ code: codeRef.current, id, password });
    }
  };

  useEffect(() => {
    if (pwRecoveryStatus === 'success') {
      history.push('/auth');
    } else if (pwRecoveryStatus === 'failure') {
      alert('실패!');
    }
  }, [history, pwRecoveryStatus]);

  useEffect(
    () => () => {
      resetUser();
      resetExist();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <React.Fragment>
      {modalValidation && (
        <Modal
          width="50.25rem"
          height="24.625rem"
          kind="certification"
          click={() => setModalValidation(false)}
        />
      )}
      {viewReset ? (
        <PwFindWrapper>
          <GreetingDiv>
            <ColoredSpan>재설정</ColoredSpan>
            할&nbsp;
            <ColoredSpan>비밀번호</ColoredSpan>
를 입력해주세요
          </GreetingDiv>
          <Form onSubmit={recoverySubmit}>
            <InputWrapper>
              <InputsGroup width="28.75rem" height="6.5rem">
                {!pwValidation && (
                  <WrongLabel>형식이 잘못되었습니다!</WrongLabel>
                )}
                <Inputs
                  type="password"
                  wrong={!pwValidation}
                  width="28.75rem"
                  height="4.375rem"
                  value={password}
                  name="password"
                  onChange={setInputs}
                  placeholder="새 비밀번호"
                  active={!!password}
                />
              </InputsGroup>
              <InputsGroup width="28.75rem" height="6.5rem">
                {!rpwValidation && (
                  <WrongLabel>형식이 잘못되었습니다!</WrongLabel>
                )}
                <Inputs
                  type="password"
                  wrong={!rpwValidation}
                  width="28.75rem"
                  height="4.375rem"
                  value={rePassword}
                  name="rePassword"
                  onChange={setInputs}
                  placeholder="확인"
                  active={!!rePassword}
                />
              </InputsGroup>
            </InputWrapper>
            <Buttons
              width="28.75rem"
              height="4.375rem"
              active={!!(password && rePassword)}
            >
              설정
            </Buttons>
          </Form>
        </PwFindWrapper>
      ) : (
        <PwFindWrapper>
          <GreetingDiv>
            <ColoredSpan>아이디</ColoredSpan>
            와&nbsp;
            <ColoredSpan>전화번호</ColoredSpan>
를 인증해주세요
          </GreetingDiv>
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()
            }
          >
            <InputWrapper>
              <InputsGroup width="28.75rem" height="6.5rem">
                {(!idValidation || idExistStatus === 'failure') && (
                  <WrongLabel>
                    형식이 잘못되었거나 없는 아이디 입니다!
                  </WrongLabel>
                )}
                <Inputs
                  wrong={!idValidation || idExistStatus === 'failure'}
                  width="28.75rem"
                  height="4.375rem"
                  value={id}
                  name="id"
                  onChange={setInputs}
                  placeholder="아이디"
                  active={!!id}
                />
              </InputsGroup>
              <InputsGroup width="28.75rem" height="6.5rem">
                {(!tpValidation || tpExistStatus === 'failure') && (
                  <WrongLabel>
                    형식이 잘못되었거나 가입되지 않은 전화번호 입니다!
                  </WrongLabel>
                )}
                <Inputs
                  wrong={!tpValidation || tpExistStatus === 'failure'}
                  width="28.75rem"
                  height="4.375rem"
                  value={tp}
                  name="tp"
                  onChange={setInputs}
                  placeholder="전화번호"
                  active={!!tp}
                />
              </InputsGroup>
            </InputWrapper>
            {id && tp ? (
              <AccountKit
                appId="265056484381541"
                csrf={uuid.v4()}
                debug
                version="v1.1"
                phoneNumber={tp}
                onResponse={handleResponse}
                language="ko_KR"
                optionalFunc={async () => {
                  await idFunc();
                  await tpFunc();
                }}
                validation={
                  tpExistStatus === 'success'
                  && tpValidation
                  && idExistStatus === 'success'
                  && idValidation
                }
              >
                {(p: ChildrenParams) => (
                  <Buttons width="28.75rem" height="4.375rem" active {...p}>
                    인증
                  </Buttons>
                )}
              </AccountKit>
            ) : (
              <Buttons width="28.75rem" height="4.375rem" active={!!(tp && id)}>
                인증
              </Buttons>
            )}
          </Form>
        </PwFindWrapper>
      )}
    </React.Fragment>
  );
};

export default PwFindComponent;
