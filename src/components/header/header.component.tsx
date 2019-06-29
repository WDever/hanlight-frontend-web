import { HeaderMethod, HeaderProps } from 'container/header';
import LogoSvg from 'lib/svg/hanlight-logo.svg';
import * as React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 3.75rem;
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
  height: 1.875rem;
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

const StyledNavLink = styled(NavLink)<{ active: boolean }>`
  text-decoration: none;
  font-family: 'Spoqa Han Sans';
  font-size: 1rem;
  color: ${props => (props.active ? '#4460ff' : '#565656')};
  font-weight: ${props => (props.active ? 'bold' : 'none')};

  &:hover {
    color: #4460ff;
    font-weight: bold;
  }
`;

const Provider = styled.span`
  color: #d5d5d5;
  font-size: 1.5rem;
`;

const Buttons = styled.span`
  font-family: 'Spoqa Han Sans';
  font-size: 1rem;
`;

const NameSpan = styled.span`
  font-family: inherit;
  font-size: 1rem;
  font-weight: bold;
`;

const HeaderComponent: React.FC<
  HeaderProps & { name: string | null } & HeaderMethod & RouteComponentProps
> = ({ name, history, location, resetUser }) => {
  const logout = () => {
    resetUser();
    history.push('/user/login');
  };

  return (
    <HeaderWrapper>
      <InnerBox>
        <LogoImg
          onClick={() => history.push('/')}
          src={LogoSvg}
          alt="Hanlight Logo"
        />
        <BtnsWrapper>
          <StyledNavLink
            exact={true}
            to="/notice"
            active={location.pathname.includes('/notice')}
          >
            공지사항
          </StyledNavLink>
          <StyledNavLink
            exact={true}
            to="/meal"
            active={location.pathname.includes('/meal')}
          >
            급식
          </StyledNavLink>
          <StyledNavLink
            exact={true}
            to="/timetable"
            active={location.pathname.includes('/timetable')}
          >
            시간표
          </StyledNavLink>
          <StyledNavLink
            exact={true}
            to="/calendar"
            active={location.pathname.includes('/calendar')}
          >
            학사일정
          </StyledNavLink>
          <StyledNavLink
            exact={true}
            to="/board"
            active={location.pathname.includes('/board')}
          >
            대나무숲
          </StyledNavLink>
          <Provider>|</Provider>
          <Buttons>
            <NameSpan>{name}</NameSpan>
            &nbsp;님
          </Buttons>
          <Buttons>정보 수정</Buttons>
          <Buttons onClick={logout}>로그아웃</Buttons>
        </BtnsWrapper>
      </InnerBox>
    </HeaderWrapper>
  );
};

export default HeaderComponent;
