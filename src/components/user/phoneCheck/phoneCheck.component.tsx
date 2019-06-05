import * as React from 'react';

import AccountKit, {
  ChildrenParams,
  FbAccountKitResType,
} from 'components/facebook-account-kit';
import { PhoneCheckMethod, PhoneCheckProps } from 'container/user/phoneCheck';
import {
  id as idRegExp,
  signKey as signKeyRegExp,
  tp as tpRegExp,
} from 'lib/RegExp/RegExp.json';
import { Buttons, Inputs, InputsGroup, WrongLabel } from 'lib/styles';
import coloredIdSvg from 'lib/svg/colored-id.svg';
import coloredPhoneSvg from 'lib/svg/colored-phone.svg';
import coloredSignKeySvg from 'lib/svg/colored-signKey.svg';
import disabledIdSvg from 'lib/svg/disabled-id.svg';
import disabledPhoneSvg from 'lib/svg/disabled-phone.svg';
import disabledSignKeySvg from 'lib/svg/disabled-signKey.svg';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import uuid from 'uuid';
import Modal from '../../modal';

export type GetCodeStatus =
  | 'none'
  | 'PARTIALLY_AUTHENTICATED'
  | 'NOT_AUTHENTICATED'
  | 'BAD_PARAMS';

const PhoneCheckWrapper = styled.div<{
  component_type: string;
  component_key: string;
}>`
  width: ${props =>
    props.component_type === 'recovery' && props.component_key === 'id'
      ? 38.1875
      : 38.125}rem;
  height: ${props =>
    props.component_type === 'recovery' && props.component_key === 'id'
      ? 24.5625
      : 31.875}rem;
  margin-top: 1rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin-top: 3rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Form = styled.form<{
  component_type: string;
  component_key: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${props =>
    props.component_type === 'register' ||
    (props.component_type === 'recovery' && props.component_key === 'password')
      ? 76
      : 70}%;
`;

const TermsBtnWrapper = styled.div`
  font-family: 'NanumSquare';
  width: 28.125rem;
  color: black;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const ColoredSpan = styled.span`
  color: #4470ff;
  font-size: 1.5rem;
`;

const PhoneInput = styled(Inputs)<{ colored: boolean }>`
  background: url(${props =>
      props.colored ? coloredPhoneSvg : disabledPhoneSvg})
    no-repeat scroll 1.5rem;
  padding-left: 3rem;
`;

const IdInput = styled(Inputs)<{ colored: boolean }>`
  background: url(${props => (props.colored ? coloredIdSvg : disabledIdSvg)})
    no-repeat scroll 1.5rem;
  padding-left: 3rem;
`;

const SignKeyInput = styled(Inputs)<{ colored: boolean }>`
  background: url(${props =>
      props.colored ? coloredSignKeySvg : disabledSignKeySvg})
    no-repeat scroll 1.5rem;
  padding-left: 3rem;
`;

class PhoneCheckComponent extends React.Component<
  PhoneCheckProps & PhoneCheckMethod & RouteComponentProps,
  {
    query: {
      type: string;
      key: string;
      validation: boolean;
    };
    inputs: {
      tp: {
        value: string;
        checked: boolean;
      };
      signKey: {
        value: string;
        checked: boolean;
      };
      id: {
        value: string;
        checked: boolean;
      };
    };
  }
> {
  public state = {
    query: {
      type: '',
      key: '',
      validation: false,
    },
    inputs: {
      tp: {
        value: '',
        checked: true,
      },
      signKey: {
        value: '',
        checked: true,
      },
      id: {
        value: '',
        checked: true,
      },
    },
  };

  public codeRef = '';
  public getCodeStatus: GetCodeStatus = 'none';

  public componentDidMount() {
    this.props.reset();

    const parsedQuery = queryString.parse(this.props.location.search);
    const { type, key } = parsedQuery;
    if (type === 'register') {
      this.setState({
        query: {
          type,
          key: '',
          validation: true,
        },
      });
    } else if (type === 'recovery' && (key === 'id' || key === 'password')) {
      this.setState({
        query: {
          type,
          key,
          validation: true,
        },
      });
    } else {
      this.setState({
        query: {
          type: '',
          key: '',
          validation: false,
        },
      });
      this.props.history.push('/user/login');
    }
  }

  public componentDidUpdate(
    prevProps: PhoneCheckProps & PhoneCheckMethod & RouteComponentProps,
  ) {
    if (prevProps !== this.props) {
      if (prevProps.verifyPhoneStatus === 'pending') {
        if (this.props.verifyPhoneStatus === 'success') {
          this.props.history.push('/user/register');
        }
      } else if (prevProps.pwRecoveryStatus === 'pending') {
        if (this.props.pwRecoveryStatus === 'success') {
          this.props.history.push('/user/recovery/password');
        }
      }
    }
  }

  public signKeyCheck = (str: string) => new RegExp(signKeyRegExp).test(str);
  public tpCheck = (str: string) => new RegExp(tpRegExp).test(str);
  public idCheck = (str: string) => new RegExp(idRegExp).test(str);

  public handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'id' || name === 'tp' || name === 'signKey') {
      this.setState({
        inputs: {
          ...this.state.inputs,
          [name]: {
            ...this.state.inputs[name],
            value,
          },
        },
      });
    }
  };

  public handleChecked = () => {
    const { type, key } = this.state.query;
    const idCheckResult = this.idCheck(this.state.inputs.id.value);
    const tpCheckResult = this.tpCheck(this.state.inputs.tp.value);
    const signKeyCheckResult = this.signKeyCheck(
      this.state.inputs.signKey.value,
    );

    this.setState({
      inputs: {
        id: {
          ...this.state.inputs.id,
          checked: idCheckResult,
        },
        tp: {
          ...this.state.inputs.tp,
          checked: tpCheckResult,
        },
        signKey: {
          ...this.state.inputs.signKey,
          checked: signKeyCheckResult,
        },
      },
    });

    if (type === 'register') {
      return tpCheckResult && signKeyCheckResult;
    } else if (type === 'recovery' && key === 'id') {
      return tpCheckResult;
    } else if (type === 'recovery' && key === 'password') {
      return tpCheckResult && idCheckResult;
    } else {
      return false;
    }
  };

  public typingCheck = (): boolean => {
    const type = this.state.query.type;
    const key = this.state.query.key;
    const { id, tp, signKey } = this.state.inputs;

    if (type === 'register') {
      return !!tp.value.length && !!signKey.value.length;
    } else if (type === 'recovery' && key === 'id') {
      return !!tp.value.length;
    } else if (type === 'recovery' && key === 'password') {
      return !!id.value.length && !!tp.value.length;
    } else {
      return false;
    }
  };

  public handleFbResponse = (res: FbAccountKitResType) => {
    const { type, key } = this.state.query;
    const { id, signKey } = this.state.inputs;
    const {
      setSignKey,
      verifyPhone,
      idRecovery,
      history,
      pwRecovery,
    } = this.props;
    this.getCodeStatus = res.status;
    this.codeRef = res.code;

    if (this.getCodeStatus === 'PARTIALLY_AUTHENTICATED') {
      if (type === 'register') {
        setSignKey(signKey.value);
        verifyPhone({ code: this.codeRef, signKey: signKey.value });
      } else if (type === 'recovery' && key === 'id') {
        idRecovery({ code: this.codeRef });
      } else if (type === 'recovery' && key === 'password') {
        pwRecovery({ code: this.codeRef, id: id.value });
      }
    } else if (this.getCodeStatus === 'BAD_PARAMS') {
      console.log(res);
      alert('핸드폰 인증 실패 (BAD_PARAMS)');
    }
  };

  public render() {
    const {
      handleChecked,
      handleInputs,
      idCheck,
      tpCheck,
      signKeyCheck,
      typingCheck,
      handleFbResponse,
    } = this;
    const {
      idRecoveryStatus,
      pwRecoveryStatus,
      verifyPhoneStatus,
      recoveryId,
      history,
      errorName,
      errorMessage,
    } = this.props;
    const { query, inputs } = this.state;
    const signKey = inputs.signKey;
    const id = inputs.id;
    const tp = inputs.tp;
    const type = query.type;
    const key = query.key;

    return (
      <React.Fragment>
        {idRecoveryStatus === 'success' && (
          <Modal
            width="50.25rem"
            height="24.625rem"
            type="recovery"
            id={recoveryId}
            click={() => {
              this.props.reset();
              history.push('/user/login');
            }}
          />
        )}
        {(idRecoveryStatus === 'failure' ||
          pwRecoveryStatus === 'failure' ||
          verifyPhoneStatus === 'failure') && (
          <Modal
            width="50.25rem"
            height="22.625rem"
            type="error"
            message={errorMessage}
            click={() => {
              this.props.resetError();
              this.props.reset();
            }}
          />
        )}
        {query.validation ? (
          <PhoneCheckWrapper component_type={type} component_key={key}>
            <GreetingDiv>
              {type === 'register' && (
                <React.Fragment>
                  <ColoredSpan>등록키</ColoredSpan>
                  와&nbsp;
                </React.Fragment>
              )}
              {type === 'recovery' && key === 'password' && (
                <React.Fragment>
                  <ColoredSpan>아이디</ColoredSpan>
                  와&nbsp;
                </React.Fragment>
              )}
              <ColoredSpan>전화번호</ColoredSpan>
              를&nbsp; 입력해주세요
            </GreetingDiv>
            <Form
              component_type={type}
              component_key={key}
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                e.preventDefault()
              }
            >
              <InputWrapper>
                {type === 'register' ? (
                  <InputsGroup width="28.75rem" height="6.5rem">
                    {!signKey.checked && (
                      <WrongLabel>
                        형식이 잘못되었거나 존재하지 않는 회원가입 키 입니다!
                      </WrongLabel>
                    )}
                    <SignKeyInput
                      wrong={!signKey.checked}
                      width="25.75rem"
                      height="4.375rem"
                      active={!!signKey.value}
                      value={signKey.value}
                      type="text"
                      placeholder="제공된 핀 번호를 입력해주세요"
                      name="signKey"
                      autoComplete="off"
                      onChange={handleInputs}
                      colored={!!signKey.value}
                    />
                  </InputsGroup>
                ) : (
                  <React.Fragment />
                )}
                {type === 'recovery' && key === 'password' ? (
                  <InputsGroup width="28.75rem" height="6.5rem">
                    {!id.checked && (
                      <WrongLabel>
                        형식이 잘못되었거나 존재하지 않는 아이디 입니다!
                      </WrongLabel>
                    )}
                    <IdInput
                      wrong={!id.checked}
                      width="25.75rem"
                      height="4.375rem"
                      value={id.value}
                      name="id"
                      onChange={handleInputs}
                      placeholder="아이디"
                      active={!!id.value}
                      colored={!!id.value}
                    />
                  </InputsGroup>
                ) : (
                  <React.Fragment />
                )}
                <InputsGroup width="28.75rem" height="6.5rem">
                  {!tp.checked && (
                    <WrongLabel>
                      형식이 잘못되었거나 존재하지 않는 전화번호 입니다!
                    </WrongLabel>
                  )}
                  <PhoneInput
                    wrong={!tp.checked}
                    width="25.75rem"
                    height="4.375rem"
                    active={!!tp.value}
                    value={tp.value}
                    type="tel"
                    name="tp"
                    autoComplete="off"
                    placeholder="휴대폰 번호를 - 빼고 입력해주세요."
                    onChange={handleInputs}
                    colored={!!tp.value}
                  />
                </InputsGroup>
              </InputWrapper>
              <TermsBtnWrapper>
                {typingCheck() ? (
                  <AccountKit
                    appId="265056484381541"
                    csrf={uuid.v4()}
                    debug={true}
                    version="v1.1"
                    phoneNumber={tp.value}
                    onResponse={handleFbResponse}
                    language="ko_KR"
                    validation={() => query.validation && handleChecked()}
                  >
                    {(p: ChildrenParams) => (
                      <Buttons
                        width="28.75rem"
                        height="4.375rem"
                        active={true}
                        {...p}
                      >
                        인증
                      </Buttons>
                    )}
                  </AccountKit>
                ) : (
                  <Buttons width="28.75rem" height="4.375rem" active={false}>
                    인증
                  </Buttons>
                )}
              </TermsBtnWrapper>
            </Form>
          </PhoneCheckWrapper>
        ) : (
          <React.Fragment />
        )}
      </React.Fragment>
    );
  }
}

export default PhoneCheckComponent;
