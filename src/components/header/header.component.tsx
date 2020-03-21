import { HeaderMethod, HeaderProps } from 'container/header';
import { Device } from 'lib/styles';
import LogoSvg from 'lib/svg/hanlight-logo.svg';
import * as React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 0 6px 40px 0 rgba(129, 129, 129, 0.1);
  width: 100%;
  height: 3.75rem;
  position: fixed;
  top: 0;
  background-color: #ffffff;
  z-index: 10;

  @media ${Device.tabletL} {
    border-bottom: 1px solid #e9e9e9;
    box-shadow: none;
  }
`;

const InnerBox = styled.div`
  display: flex;
  width: 83.7%;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  @media ${Device.tabletL} {
    width: 100%;
    justify-content: center;
  }
`;

const LogoImg = styled.img`
  width: 5rem;
  height: 1.775rem;
  cursor: pointer;
`;

const BtnsWrapper = styled.div`
  width: 42.75rem;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media ${Device.tabletL} {
    display: none;
  }
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

const SpanWrapper = styled.div`
  font-family: 'Spoqa Han Sans';
  font-size: 1rem;
`;

const NameSpan = styled.span`
  font-family: inherit;
  font-weight: bold;
`;

const SpanBtn = styled.span`
  font-family: inherit;
  cursor: pointer;

  &:hover {
    color: #4460ff;
    font-weight: bold;
  }
`;

const MenuIcon = styled.div`
  display: none;

  @media ${Device.tabletL} {
    width: 1.25rem;
    height: 1rem;
    position: absolute;
    left: 5%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const MenuSpan = styled.span`
  content: ${' '};
  width: 1.25rem;
  height: 0.125rem;
  background-color: #707070;
`;

const HanseiThon = styled.div`
  position: relative;
`;

const New = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.7rem;

  color: #765df6;
  font-size: 0.69rem;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
`;

const HeaderComponent: React.FC<HeaderProps &
  HeaderMethod &
  RouteComponentProps> = ({
  name,
  history,
  location,
  resetUser,
  toggleMenu,
}) => {
  const logout = () => {
    resetUser();
    history.push('/user/login');
  };

  return (
    <HeaderWrapper>
      <InnerBox>
        <MenuIcon onClick={() => toggleMenu(true)}>
          <MenuSpan />
          <MenuSpan style={{ width: '16px' }} />
          <MenuSpan />
        </MenuIcon>
        <LogoImg
          onClick={() => history.push('/')}
          src={LogoSvg}
          alt='Hanlight Logo'
        />
        <BtnsWrapper>
          <StyledNavLink
            exact
            to='/notice'
            active={location.pathname.includes('/notice')}
          >
            공지사항
          </StyledNavLink>
          <StyledNavLink
            exact
            to='/meal'
            active={location.pathname.includes('/meal')}
          >
            급식
          </StyledNavLink>
          <StyledNavLink
            exact
            to='/timetable'
            active={location.pathname.includes('/timetable')}
          >
            시간표
          </StyledNavLink>
          <StyledNavLink
            exact
            to='/calendar'
            active={location.pathname.includes('/calendar')}
          >
            학사일정
          </StyledNavLink>
          <StyledNavLink
            exact
            to='/board'
            active={location.pathname.includes('/board')}
          >
            대나무숲
          </StyledNavLink>
          <Provider>|</Provider>
          <SpanWrapper>
            <NameSpan>{name}</NameSpan>
            &nbsp;님
          </SpanWrapper>
          <SpanWrapper>
            <StyledNavLink
              exact
              to='/profile'
              active={location.pathname.includes('/user/profile')}
            >
              정보 수정
            </StyledNavLink>
          </SpanWrapper>
          <SpanWrapper onClick={logout}>
            <SpanBtn>로그아웃</SpanBtn>
          </SpanWrapper>
        </BtnsWrapper>
      </InnerBox>
    </HeaderWrapper>
  );
};

export default HeaderComponent;
