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
import { Device } from 'lib/styles';
import DefaultProfileImg from 'lib/svg/default-profile-image.svg';
import { RouteComponentProps } from 'react-router';
import styled, { css } from 'styled-components';
import uuid from 'uuid';

const { useEffect, useCallback } = React;

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh);
  background-color: #e9ebee;
  padding-top: 1.5rem;
  font-family: 'Spoqa Han Sans';

  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media ${Device.tabletS} {
    padding: 0;
    background-color: #ffffff;
  }
`;

const ProfileWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${Device.tabletS} {
    width: 100%;
    height: 100%;
    border: none;
    box-shadow: none;
  }
`;

const Profile = styled.div`
  width: 42.75rem;
  height: 42.125rem;

  @media ${Device.tabletS} {
    width: 100%;
    height: 100%;
  }
`;

const TopWrapper = styled.div`
  height: 14rem;
  border-bottom: 1px solid #dadada;

  display: flex;
  justify-content: center;

  @media ${Device.tabletS} {
    border-bottom: 2px solid #dadada;
  }
  @media ${Device.mobileL} {
    height: 8.25rem;
  }
`;

const Top = styled.div`
  width: 7.5rem;
  height: 10.85rem;
  margin-top: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${Device.tabletS} {
    height: unset;
    margin: 0;
  }
`;

const TopImg = styled.img<{ image: boolean }>`
  width: 7.5rem;
  margin-bottom: -2rem;

  ${({ image }) =>
    image &&
    css`
      border: 1px solid #d1d1d1;
      border-radius: 100%;
      margin-bottom: 0;
    `}

  @media ${Device.tabletS} {
    width: 6.25rem;
    margin-bottom: -1.5rem;
  }
  @media ${Device.mobileL} {
    width: 4rem;
    margin-bottom: -0.25rem;
  }
`;

const ProfileBtn = styled.label`
  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  color: #4470ff;

  margin-top: 0.5rem;
  margin-bottom: 0.25rem;

  cursor: pointer;

  @media ${Device.mobileL} {
    font-size: 0.7rem;
  }

  input {
    display: none;
  }
`;

const TopName = styled.span`
  font-family: inherit;
  font-size: 1.25rem;

  @media ${Device.tabletS} {
    font-size: 1.125rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.875rem;
  }
`;

const Bottom = styled.div`
  padding: 2rem;

  @media ${Device.tabletS} {
    padding: 2.2rem;
  }
`;

const Title = styled.span`
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1.5rem;

  @media ${Device.tabletS} {
    font-size: 1.25rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.875rem;
  }
`;

const Row = styled.div`
  width: 100%;
  margin-top: 1.5rem;

  display: flex;
  flex-direction: column;
`;

const AttributeSpan = styled.span`
  color: #9f9f9f;
  margin-bottom: 0.25rem;
  font-family: inherit;
  font-size: 0.875rem;

  @media ${Device.tabletS} {
    font-size: 1rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.813rem;
  }
`;

const ValueSpan = styled.span`
  font-size: 0.82rem;
  font-family: inherit;
  color: #000000;

  @media ${Device.tabletS} {
    font-size: 0.93rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.75rem;
  }
`;

const ValueInputWrapper = styled.div`
  width: 100%;
  display: flex;

  form {
    width: 100%;
    display: flex;
  }
`;

const ValueInput = styled.input<{ wrong: boolean }>`
  width: 100%;
  border: 0;
  border-radius: 0;
  border-bottom: solid 1px #c7c7c7;
  padding: 0;
  font-size: 0.82rem;
  font-family: inherit;
  color: #000000;

  @media ${Device.tabletS} {
    font-size: 0.93rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.75rem;
  }

  &:focus {
    border-bottom: solid 1px ${({ wrong }) => (wrong ? '#4470ff' : '#ff0000')};
  }
`;

const ValueBtn = styled.button`
  width: 3.5rem;
  height: 2rem;
  margin-left: 0.8rem;
  padding: 0;
  border: 0;
  border-radius: 0.5rem;
  background-color: #4470ff;
  color: #ffffff;
  font-size: 0.82rem;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;

  @media ${Device.tabletS} {
    width: 4rem;
    height: 2.25rem;
    font-size: 0.875rem;
  }
  @media ${Device.mobileL} {
    width: 3rem;
    height: 1.5rem;
    margin-left: 0.6rem;
    font-size: 0.69rem;
  }
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
  image,
  errorMessage,
  errorCode,
  patchPasswordStatus,
  patchPhoneStatus,
  patchPassword,
  patchPhone,
  resetError,
  postUserImg,
  postUserImgStatus,
  resetUser,
}) => {
  const [password, setPassword] = useInput('');
  const [tp, setTp] = useInput('');
  const prevProps = usePrevious({
    patchPasswordStatus,
    patchPhoneStatus,
    postUserImgStatus,
  });

  const logout = useCallback(() => {
    resetUser();
    history.push('/user/login/');
  }, []);

  useEffect(() => () => resetError(), []);

  useEffect(() => {
    const statusProps = {
      patchPasswordStatus,
      patchPhoneStatus,
      postUserImgStatus,
    };
    if (prevProps) {
      if (prevProps.patchPasswordStatus === 'pending') {
        if (statusProps.patchPasswordStatus === 'success') {
          alert('성공적으로 변경되었습니다.\n다시 로그인 해주세요.');
          setPassword('');
          logout();
        } else if (statusProps.patchPasswordStatus === 'failure') {
          alert(errorMessage);
        }
      } else if (prevProps.patchPhoneStatus === 'pending') {
        if (statusProps.patchPhoneStatus === 'success') {
          alert('성공적으로 변경되었습니다.\n다시 로그인 해주세요.');
          setTp('');
          logout();
        } else if (
          statusProps.patchPhoneStatus === 'failure' &&
          errorCode < 500
        ) {
          alert(errorMessage);
        }
      } else if (prevProps.postUserImgStatus === 'pending') {
        if (postUserImgStatus === 'success') {
          alert('성공적으로 변경되었습니다.');
        } else if (postUserImgStatus === 'failure') {
          alert(errorMessage);
        }
      }
    }
  }, [patchPhoneStatus, patchPasswordStatus, postUserImgStatus]);

  const PatchPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (new RegExp(passwordRegExp).test(password)) {
      if (
        patchPasswordStatus !== 'pending' &&
        window.confirm('비밀번호를 변경하시겠습니끼?')
      ) {
        patchPassword({ accessToken, password });
      }
    } else {
      alert(
        '비밀번호는 8~16자의 영문 대소문자, 숫자 및 특수문자(키보드 1~0)만을 사용하실 수 있습니다.',
      );
    }
  };

  const FbResponseHandle = (res: FbAccountKitResType) => {
    if (res.status === 'PARTIALLY_AUTHENTICATED') {
      patchPhone({ accessToken, code: res.code });
    } else if (res.status === 'BAD_PARAMS') {
      alert('핸드폰 인증 실패 (BAD_PARAMS)');
    }
  };

  const submitProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;

    if (files && files.length > 0 && postUserImgStatus !== 'pending') {
      if (window.confirm('프로필 사진을 변경하시겠습니까?')) {
        postUserImg({ accessToken, file: files[0] });
      }
    }

    e.target.value = '';
  };

  return (
    <Wrapper>
      <ProfileWrapper>
        <Profile>
          <TopWrapper>
            <Top>
              <TopImg image={!!image} src={image || DefaultProfileImg} alt="" />
              <ProfileBtn>
                사진 변경
                <input
                  type="file"
                  onChange={submitProfileImg}
                  accept="image/*"
                />
              </ProfileBtn>
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
                    autoComplete="false"
                    placeholder="변경할 비밀번호를 입력해주세요."
                    onChange={setPassword}
                    value={password}
                    wrong={new RegExp(passwordRegExp).test(password)}
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
                  wrong={new RegExp(tpRegExp).test(tp)}
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
