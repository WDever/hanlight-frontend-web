import * as React from 'react';

import AccountKit, {
  ChildrenParams,
  FbAccountKitResType,
} from 'components/facebook-account-kit';
import {
  ProfileMethod,
  ProfileProps,
} from 'container/profile/profile.container';
import { useInput, usePrevious } from 'lib/hooks';
import {
  password as passwordRegExp,
  tp as tpRegExp,
} from 'lib/RegExp/RegExp.json';
import DefaultProfileImg from 'lib/svg/default-profile-image.svg';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import uuid from 'uuid';

const { useEffect } = React;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #e9ebee;
  padding-top: 1.5rem;
  font-family: 'Spoqa Han Sans';

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ProfileWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Profile = styled.div`
  width: 42.75rem;
  height: 42.125rem;
`;

const TopWrapper = styled.div`
  height: 14rem;
  border-bottom: 1px solid #dadada;

  display: flex;
  justify-content: center;
`;

const Top = styled.div`
  width: 7.5rem;
  height: 10.85rem;
  margin-top: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopImg = styled.img`
  width: 7.5rem;
  height: 7.5rem;
`;

const TopName = styled.span`
  font-family: inherit;
  font-size: 1.25rem;
`;

const Bottom = styled.div`
  padding: 2rem;
  width: calc(100% - 4rem);
  height: calc(100% - 4rem - 14rem);
`;

const Title = styled.span`
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Row = styled.div`
  margin-top: 1.5rem;

  display: flex;
  flex-direction: column;
`;

const AttributeSpan = styled.span`
  color: #9f9f9f;
  margin-bottom: 0.25rem;
  font-family: inherit;
  font-size: 0.875rem;
`;

const ValueSpan = styled.span`
  font-size: 0.82rem;
  font-family: inherit;
  color: #000000;
`;

const ValueInputWrapper = styled.div`
  width: 100%;
  display: flex;

  form {
    width: 100%;
    display: flex;
  }
`;

const ValueInput = styled.input`
  width: 35.37rem;
  border: 0;
  border-bottom: solid 1px #c7c7c7;
  font-size: 0.82rem;
  font-family: inherit;
  color: #000000;
`;

const ValueBtn = styled.button`
  width: 3.5rem;
  height: 2rem;
  margin-left: 0.8rem;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background-color: #4470ff;
  color: #ffffff;
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
`;

const ProfileComponent: React.FC<
  ProfileProps & ProfileMethod & RouteComponentProps
> = ({
  accessToken,
  id,
  name,
  history,
  type,
  major,
  grade,
  classNum,
  errorMessage,
  errorCode,
  patchPasswordStatus,
  patchPhoneStatus,
  patchPassword,
  patchPhone,
  resetError,
}) => {
  const [password, setPassword] = useInput('');
  const [tp, setTp] = useInput('');
  const prevProps = usePrevious({ patchPasswordStatus, patchPhoneStatus });

  useEffect(() => () => resetError(), []);

  useEffect(() => {
    const statusProps = { patchPasswordStatus, patchPhoneStatus };
    if (prevProps) {
      if (prevProps.patchPasswordStatus === 'pending') {
        if (statusProps.patchPasswordStatus === 'success') {
          alert('성공적으로 변경되었습니다.');
          setPassword('');
        } else if (statusProps.patchPasswordStatus === 'failure') {
          alert(errorMessage);
        }
      } else if (prevProps.patchPhoneStatus === 'pending') {
        if (statusProps.patchPhoneStatus === 'success') {
          alert('성공적으로 변경되었습니다.');
          setTp('');
        } else if (
          statusProps.patchPhoneStatus === 'failure' &&
          errorCode < 500
        ) {
          alert(errorMessage);
        }
      }
    }
  }, [patchPhoneStatus, patchPasswordStatus]);

  const PatchPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      new RegExp(passwordRegExp).test(password) &&
      patchPasswordStatus !== 'pending'
    ) {
      patchPassword({ accessToken, password });
    }
  };

  const FbResponseHandle = (res: FbAccountKitResType) => {
    if (res.status === 'PARTIALLY_AUTHENTICATED') {
      patchPhone({ accessToken, code: res.code });
    } else if (res.status === 'BAD_PARAMS') {
      alert('핸드폰 인증 실패 (BAD_PARAMS)');
    }
  };

  return (
    <Wrapper>
      <ProfileWrapper>
        <Profile>
          <TopWrapper>
            <Top>
              <TopImg src={DefaultProfileImg} alt="" />
              <TopName>{name}</TopName>
            </Top>
          </TopWrapper>
          <Bottom>
            <Title>회원 정보</Title>
            <Row>
              <AttributeSpan>구분</AttributeSpan>
              <ValueSpan>{type}</ValueSpan>
            </Row>
            {type === 'student' && (
              <Row>
                <AttributeSpan>인적사항</AttributeSpan>
                <ValueSpan>{`${major}${grade}-${classNum}`}</ValueSpan>
              </Row>
            )}
            <Row>
              <AttributeSpan>아이디</AttributeSpan>
              <ValueSpan>{id}</ValueSpan>
            </Row>
            <Row>
              <AttributeSpan>비밀번호</AttributeSpan>
              <ValueInputWrapper>
                <form onSubmit={PatchPassword}>
                  <ValueInput
                    type="password"
                    placeholder="변경할 비밀번호를 입력해주세요."
                    onChange={setPassword}
                    value={password}
                  />
                  <ValueBtn>수정</ValueBtn>
                </form>
              </ValueInputWrapper>
            </Row>
            <Row>
              <AttributeSpan>전화번호</AttributeSpan>
              <ValueInputWrapper>
                <ValueInput
                  value={tp}
                  onChange={setTp}
                  placeholder="예) 01012345678"
                />
                <AccountKit
                  appId="265056484381541"
                  csrf={uuid.v4()}
                  debug={true}
                  version="v1.1"
                  phoneNumber={tp}
                  onResponse={FbResponseHandle}
                  language="ko_KR"
                  validation={() =>
                    patchPasswordStatus !== 'pending' &&
                    new RegExp(tpRegExp).test(tp)
                  }
                >
                  {(p: ChildrenParams) => <ValueBtn {...p}>수정</ValueBtn>}
                </AccountKit>
              </ValueInputWrapper>
            </Row>
          </Bottom>
        </Profile>
      </ProfileWrapper>
    </Wrapper>
  );
};

export default ProfileComponent;
