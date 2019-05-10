import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Logo from 'lib/svg/hanlight-logo.svg';

interface HeaderProps {
  name: string;
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 6rem;
  box-shadow: 0 6px 40px 0 rgba(129, 129, 129, 0.1);
  position: fixed;
  background-color: #ffffff;
  z-index: 10;
`;

const InnerBox = styled.div`
  display: flex;
  width: 83.7%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const LogoImg = styled.img`
  width: 5rem;
  height: 3rem;
  cursor: pointer;
`;

const BtnsWrapper = styled.div`
  width: 42.75rem;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-family: 'Noto Sans KR';
  font-size: 1.25rem;
  color: #565656;
`;

const Provider = styled.span`
  color: #d5d5d5;
  font-size: 1.5rem;
`;

const Buttons = styled.span`
  font-family: 'Noto Sans KR';
  font-size: 1.25rem;
`;

const NameSpan = styled.span`
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
`;

const HeaderComponent: React.FC<HeaderProps> = ({ name }) => (
  <HeaderWrapper>
    <InnerBox>
      <LogoImg src={Logo} alt="Hanlight Logo" />
      <BtnsWrapper>
        <StyledNavLink
          to="/"
          activeStyle={{
            color: '#4470ff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          메인
        </StyledNavLink>
        <StyledNavLink
          to="/timeTable"
          activeStyle={{
            color: '#4470ff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          시간표
        </StyledNavLink>
        <StyledNavLink
          to="/schedule"
          activeStyle={{
            color: '#4460ff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          학사일정
        </StyledNavLink>
        <StyledNavLink
          to="/board"
          activeStyle={{
            color: '#4460ff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          대나무숲
        </StyledNavLink>
        <Provider>|</Provider>
        <Buttons>
          <NameSpan>{name}</NameSpan>
          &nbsp;님
        </Buttons>
        <Buttons>정보 수정</Buttons>
        <Buttons>로그아웃</Buttons>
      </BtnsWrapper>
    </InnerBox>
  </HeaderWrapper>
);

export default HeaderComponent;
