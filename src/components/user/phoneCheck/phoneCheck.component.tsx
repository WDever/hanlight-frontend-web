import * as React from 'react';

import AccountKit, {
  ChildrenParams,
  FbAccountKitResType,
} from 'components/facebook-account-kit';
import ModalError from 'components/modal/error';
import ModalPhoneCheck from 'components/modal/phoneCheck';
import ModalRecovery from 'components/modal/recovery';
import { PhoneCheckMethod, PhoneCheckProps } from 'container/user/phoneCheck';
import {
  id as idRegExp,
  signKey as signKeyRegExp,
  tp as tpRegExp,
} from 'lib/RegExp/RegExp.json';
import {
  Button,
  Device,
  Input,
  InputsGroup,
  WrongMessageWrapper,
} from 'lib/styles';
import HanlightLogo from 'lib/svg/hanlight-logo.svg';
import queryString from 'query-string';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import uuid from 'uuid';

export type GetCodeStatus =
  | 'none'
  | 'PARTIALLY_AUTHENTICATED'
  | 'NOT_AUTHENTICATED'
  | 'BAD_PARAMS';

interface PhoneCheckTypeProps {
  component_type: string;
  component_key: string;
}

const PhoneCheckWrapper = styled.div<PhoneCheckTypeProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media ${Device.tabletL} {
    width: 85%;
    margin: 0;
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
  margin-bottom: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media ${Device.tabletS} {
    width: 100%;
  }
  @media ${Device.mobileL} {
    margin-bottom: 1rem;
  }
`;

const Form = styled.form<PhoneCheckTypeProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TermsBtnWrapper = styled.div`
  font-family: 'Spoqa Han Sans';
  color: black;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;

  @media ${Device.tabletL} {
    width: 100%;
  }
`;

const InputGroup = styled(InputsGroup)``;

const InputName = styled.span`
  width: 100%;
  max-width: 36.25rem;
  margin-left: 0.25rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-family: 'Spoqa Han Sans';

  @media ${Device.mobileL} {
    font-size: 0.75rem;
  }
`;

const TermWrapper = styled.div`
  color: #8e8e8e;
  font-family: 'Spoqa Han Sans';
  font-size: 0.9rem;

  @media ${Device.tabletS} {
    font-size: 0.8rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.5rem;
  }
`;

const TermShortCut = styled(Link)`
  text-decoration: underline;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
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
    this.props.resetUser();

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

  public componentWillUnmount() {
    this.props.resetError();
  }

  public signKeyCheck = (str: string) => new RegExp(signKeyRegExp).test(str);

  public tpCheck = (str: string) => new RegExp(tpRegExp).test(str);

  public idCheck = (str: string) => new RegExp(idRegExp).test(str);

  public handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;

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
    }
    if (type === 'recovery' && key === 'id') {
      return tpCheckResult;
    }
    if (type === 'recovery' && key === 'password') {
      return tpCheckResult && idCheckResult;
    }
    return false;
  };

  public pendingCheck = (): boolean => {
    const {
      idRecoveryStatus,
      pwRecoveryStatus,
      verifyPhoneStatus,
    } = this.props;

    return ![idRecoveryStatus, pwRecoveryStatus, verifyPhoneStatus].some(
      status => status === 'pending',
    );
  };

  public typingCheck = (): boolean => {
    const { type } = this.state.query;
    const { key } = this.state.query;
    const { id, tp, signKey } = this.state.inputs;

    if (type === 'register') {
      return !!tp.value.length && !!signKey.value.length;
    }
    if (type === 'recovery' && key === 'id') {
      return !!tp.value.length;
    }
    if (type === 'recovery' && key === 'password') {
      return !!id.value.length && !!tp.value.length;
    }
    return false;
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
      alert('핸드폰 인증 실패 (BAD_PARAMS)');
    }
  };

  public render() {
    const {
      handleChecked,
      handleInputs,
      pendingCheck,
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
    const { signKey } = inputs;
    const { id } = inputs;
    const { tp } = inputs;
    const { type } = query;
    const { key } = query;

    return (
      <>
        {idRecoveryStatus === 'success' && (
          <ModalRecovery
            type='id'
            id={recoveryId}
            click={() => {
              this.props.resetUser();
              history.push('/user/login');
            }}
          />
        )}
        {(pwRecoveryStatus === 'success' ||
          verifyPhoneStatus === 'success') && (
          <ModalPhoneCheck
            click={() => {
              type === 'recovery'
                ? history.push('/user/recovery/password')
                : history.push('/user/register');
            }}
          />
        )}
        {(idRecoveryStatus === 'failure' ||
          pwRecoveryStatus === 'failure' ||
          verifyPhoneStatus === 'failure') && (
          <ModalError
            message={errorMessage}
            click={() => {
              this.props.resetError();
              this.props.resetUser();
              history.push('/user/login');
            }}
          />
        )}
        {query.validation ? (
          <PhoneCheckWrapper component_type={type} component_key={key}>
            <GreetingDiv>
              <HanlightLogoImg src={HanlightLogo} />
              <Title>
                {type === 'register' && '회원가입'}
                {type === 'recovery' && key === 'id' && '아이디 찾기'}
                {type === 'recovery' && key === 'password' && '비밀번호 찾기'}
              </Title>
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
                  <InputGroup>
                    <InputName>회원가입 키</InputName>
                    <Input
                      wrong={!signKey.checked}
                      value={signKey.value}
                      type='text'
                      placeholder='제공된 핀 번호를 입력해주세요'
                      name='signKey'
                      autoComplete='off'
                      onChange={handleInputs}
                    />
                    <WrongMessageWrapper>
                      {!signKey.checked &&
                        '회원가입 키가 올바른 형식이 아닙니다.'}
                    </WrongMessageWrapper>
                  </InputGroup>
                ) : (
                  <></>
                )}
                {type === 'recovery' && key === 'password' ? (
                  <InputGroup>
                    <InputName>아이디</InputName>
                    <Input
                      wrong={!id.checked}
                      value={id.value}
                      name='id'
                      onChange={handleInputs}
                      placeholder='아이디'
                      autoComplete='off'
                    />
                    <WrongMessageWrapper>
                      {!id.checked &&
                        '형식이 잘못되었거나 존재하지 않는 아이디 입니다!'}
                    </WrongMessageWrapper>
                  </InputGroup>
                ) : (
                  <></>
                )}
                <InputGroup>
                  <InputName>전화번호</InputName>
                  <Input
                    wrong={!tp.checked}
                    value={tp.value}
                    type='tel'
                    name='tp'
                    autoComplete='off'
                    placeholder='휴대폰 번호를 - 빼고 입력해주세요.'
                    onChange={handleInputs}
                  />
                  <WrongMessageWrapper>
                    {!tp.checked && '전화번호가 올바른 형식이 아닙니다.'}
                  </WrongMessageWrapper>
                </InputGroup>
              </InputWrapper>
              <TermsBtnWrapper>
                {typingCheck() ? (
                  <AccountKit
                    appId='265056484381541'
                    csrf={uuid.v4()}
                    debug={false}
                    version='v1.1'
                    phoneNumber={tp.value}
                    onResponse={handleFbResponse}
                    language='ko_KR'
                    validation={() =>
                      query.validation && pendingCheck() && handleChecked()
                    }
                  >
                    {(p: ChildrenParams) => (
                      <Button
                        active={
                          verifyPhoneStatus !== 'pending' &&
                          idRecoveryStatus !== 'pending' &&
                          pwRecoveryStatus !== 'pending'
                        }
                        {...p}
                      >
                        인증하기
                      </Button>
                    )}
                  </AccountKit>
                ) : (
                  <Button active={false}>인증하기</Button>
                )}
                {type === 'register' && (
                  <TermWrapper>
                    <span>전화번호 인증 시&nbsp;</span>
                    <TermShortCut to='/service/termsofuse'>
                      이용 약관
                    </TermShortCut>
                    과&nbsp;
                    <TermShortCut to='/service/privacypolicy'>
                      개인정보처리방침
                    </TermShortCut>
                    <span>에 동의하게 됩니다.</span>
                  </TermWrapper>
                )}
              </TermsBtnWrapper>
            </Form>
          </PhoneCheckWrapper>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default PhoneCheckComponent;
