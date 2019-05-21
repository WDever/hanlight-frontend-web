import * as React from 'react';
import styled from 'styled-components';
import AccountKit, { ChildrenParams } from 'components/facebook-account-kit';
import uuid from 'uuid';
import { RouteComponentProps, NavLink } from 'react-router-dom';
import {
  Inputs, Buttons, WrongLabel, InputsGroup,
} from 'lib/styles';
import { useInput } from 'lib/hooks';
import { PhoneCheckResType, TP_EXIST } from 'store/action';
import { GetCodeStatus } from 'components/auth/phoneCheck';
import Modal from 'components/modal';
import { IdFindProps, IdFindMethod } from 'container/auth/idFind';
import { tp as tpRegExp } from 'lib/RegExp/RegExp.json';

const { useRef, useState, useEffect } = React;

const IdFindWrapper = styled.div`
  width: 38.1875rem;
  height: 24.5625rem;
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

interface ButtonsProps {
  width: string | number;
  height: string | number;
}

const StyledLink = styled(NavLink)<ButtonsProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 16px;
  border: solid 1px #4470ff;
  background-color: #4470ff;
  box-shadow: 0 3px 10px 0 rgba(68, 112, 255, 0.24);
  font-size: 1.25rem;
  font-weight: 900;
  color: white;
  font-family: 'Noto Sans', 'Noto Sans KR';
  outline: none;
  cursor: pointer;
`;

const IdFindComponent: React.FC<
IdFindProps & IdFindMethod & RouteComponentProps
> = ({
  idFind,
  idFindStatus,
  existStatus,
  tpExistStatus,
  exist,
  id,
  history,
  resetUser,
  resetExist,
  match,
  location,
}) => {
  const [tp, setTp] = useInput('');
  const [tpValidation, setTpValidation] = useState<boolean>(true);
  const codeRef = useRef<string>('');
  const getCodeStatus = useRef<GetCodeStatus>('none');

  const setCode = async (resCode: string) => {
    codeRef.current = resCode;
  };

  const setGetCodeStatus = async (resStatus: GetCodeStatus) => {
    getCodeStatus.current = resStatus;
  };

  const tpCheck = (str: string): boolean => new RegExp(tpRegExp).test(str);

  const tpFunc = async () => {
    setTpValidation(tpCheck(tp));
    exist({ key: 'tp', value: tp, type: TP_EXIST });
  };

  const verifyTp = async () => {
    if (getCodeStatus.current === 'PARTIALLY_AUTHENTICATED') {
      console.log(codeRef.current);
      idFind(codeRef.current);
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

  useEffect(
    () => () => {
      resetUser();
      resetExist();
      setTpValidation(true);
    },
    [resetExist, resetUser],
  );

  return (
    <React.Fragment>
      {idFindStatus === 'success' && (
        <Modal
          width="50.25rem"
          height="24.625rem"
          kind="check"
          id={id}
          click={() => history.push('/auth')}
        />
      )}
      <IdFindWrapper>
        <GreetingDiv>전화번호 인증</GreetingDiv>
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <InputWrapper>
            <InputsGroup width="28.75rem" height="6.5rem" where={false}>
              {!tpValidation && !tpExistStatus && (
                <WrongLabel>
                  형식이 잘못되었거나 등록되지 않은 전화번호 입니다!
                </WrongLabel>
              )}
              <Inputs
                wrong={!tpValidation}
                width="28.75rem"
                height="4.375rem"
                value={tp}
                name="tp"
                onChange={setTp}
                placeholder="전화번호"
                active={!!tp}
              />
            </InputsGroup>
          </InputWrapper>
          {tp ? (
            <AccountKit
              appId="265056484381541"
              csrf={uuid.v4()}
              debug
              version="v1.1"
              phoneNumber={tp}
              onResponse={handleResponse}
              language="ko_KR"
              optionalFunc={tpFunc}
              validation={tpExistStatus && tpValidation}
            >
              {(p: ChildrenParams) => (
                <Buttons width="28.75rem" height="4.375rem" active {...p}>
                  인증
                </Buttons>
              )}
            </AccountKit>
          ) : (
            <Buttons width="28.75rem" height="4.375rem" active={!tpValidation}>
              인증
            </Buttons>
          )}
        </Form>
      </IdFindWrapper>
    </React.Fragment>
  );
};

export default IdFindComponent;
