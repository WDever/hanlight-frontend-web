import * as React from 'react';
import styled from 'styled-components';
import AccoutKit from 'react-facebook-account-kit';
import uuid from 'uuid';
import { RouteComponentProps } from 'react-router-dom';
import { Inputs, Buttons } from 'lib/styles';
import { useInputs } from 'lib/hooks';
import { PhoneCheckResType, TP_EXIST, ID_EXIST } from 'store/action';
import { GetCodeStatus } from 'components/auth/phoneCheck';
import Modal from 'components/modal';
import { PwFindProps, PwFindMethod } from 'container/auth/pwFind';

const { useRef, useState, useEffect } = React;

const PwFindWrapper = styled.div`
  width: 38.125rem;
  height: 31.875rem;
  margin-top: 1rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
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
  existStatus,
  tpExistStatus,
  exist,
  pwRecovery,
  pwRecoveryStatus,
  history,
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

  const {
    tp, id, password, rePassword,
  } = inputs;

  const setCode = async (resCode: string) => {
    codeRef.current = resCode;
  };

  const setGetCodeStatus = async (resStatus: GetCodeStatus) => {
    getCodeStatus.current = resStatus;
  };

  const idCheck = (str: string): boolean => /[a-z0-9-_]{5,20}$/.test(str);

  const tpCheck = (str: string): boolean => /^[0-9]{10,11}$/.test(str);

  const pwCheck = (str: string): boolean => /^[a-zA-Z0-9!@#$%^&*()]{8,16}$/.test(str);

  const rpwCheck = (str: string): boolean => str === password || str === '';

  const tpFunc = () => {
    setTpValidation(tpCheck(tp));
    exist({ key: 'tp', value: tp, type: TP_EXIST });
  };

  const idFunc = () => {
    setIdValidation(idCheck(id));
    exist({ key: 'id', value: id, type: ID_EXIST });
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
    await setCode(res.code);
    await setGetCodeStatus(res.status);
    await verifyTp();
  };

  useEffect(() => {
    if (pwRecoveryStatus === 'success') {
      history.push('/auth');
    } else if (pwRecoveryStatus === 'failure') {
      alert('실패!');
    }
  }, [history, pwRecoveryStatus]);

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
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              pwRecovery({ code: codeRef.current, id, password });
            }}
          >
            <InputWrapper>
              <Inputs
                type="password"
                wrong={!pwValidation}
                width="28.75rem"
                height="4.375rem"
                value={password}
                name="password"
                onChange={setInputs}
                onBlur={() => setPwValidation(pwCheck(password))}
                placeholder="새 비밀번호"
                active={!!password}
              />
              <Inputs
                type="password"
                wrong={!rpwValidation}
                width="28.75rem"
                height="4.375rem"
                value={rePassword}
                name="rePassword"
                onChange={setInputs}
                onBlur={() => setRpwValidation(rpwCheck(rePassword))}
                placeholder="확인"
                active={!!rePassword}
              />
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
              <Inputs
                wrong={!idValidation}
                width="28.75rem"
                height="4.375rem"
                value={id}
                name="id"
                onChange={setInputs}
                onBlur={idFunc}
                placeholder="아이디"
                active={!!id}
              />
              <Inputs
                wrong={!tpValidation}
                width="28.75rem"
                height="4.375rem"
                value={tp}
                name="tp"
                onChange={setInputs}
                onBlur={tpFunc}
                placeholder="전화번호"
                active={!!tp}
              />
            </InputWrapper>
            {existStatus && tpExistStatus && tpValidation && idValidation ? (
              <AccoutKit
                appId="265056484381541"
                csrf={uuid.v4()}
                debug
                version="v1.1"
                phoneNumber={tp}
                onResponse={handleResponse}
                language="ko_KR"
                optionalFunc={() => console.log('test2')}
              >
                {(p: Function) => (
                  <Buttons width="28.75rem" height="4.375rem" active {...p}>
                    인증
                  </Buttons>
                )}
              </AccoutKit>
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
