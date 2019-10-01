import * as React from 'react';

import { Device } from 'lib/styles';
import styled, { css } from 'styled-components';

import {
  HeaderMenuMethod,
  HeaderMenuOwnProps,
  HeaderMenuProps,
} from 'container/header/menu/headerMenu.container';
import BambooIcon from 'lib/svg/bamboo-icon.svg';
import CalendarIcon from 'lib/svg/calendar-icon.svg';
import DefaultProfileImg from 'lib/svg/default-profile-image.svg';
import FestivalBat from 'lib/svg/festival-bat.svg';
import FestivalIcon from 'lib/svg/festival-icon.svg';
import HanseithonIcon from 'lib/svg/hanseithon-main-title.svg';
import Circle1 from 'lib/svg/header-menu-circle1.svg';
import Circle2 from 'lib/svg/header-menu-circle2.svg';
import Circle3 from 'lib/svg/header-menu-circle3.svg';
import InfoEditIcon from 'lib/svg/infoedit-icon.svg';
import LogoutIcon from 'lib/svg/logout-icon.svg';
import MealIcon from 'lib/svg/meal-icon.svg';
import NoticeIcon from 'lib/svg/notice-icon.svg';
import TimetableIcon from 'lib/svg/timetable-icon.svg';
import { RouteComponentProps } from 'react-router';

const Wrapper = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 11;
  top: 0;
  left: 0;
  font-family: 'Spoqa Han Sans';

  transform: translateX(-100%);
  animation: slide-in 0.2s forwards;

  @keyframes slide-in {
    100% {
      transform: translateX(0%);
    }
  }

  @media ${Device.tabletL} {
    display: flex;
    justify-content: space-between;
  }
`;

const LeftWrapper = styled.div<{ dark: boolean }>`
  height: 100%;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: ${({ dark }) => (dark ? '#484848' : '#ffffff')};
  color: ${({ dark }) => (dark ? '#e4e4e4' : '#000000')};

  @media ${Device.tabletL} {
    width: 70%;
  }
  @media ${Device.mobileL} {
    width: 80%;
  }
`;

const Upside = styled.div<{ dark: boolean }>`
  position: relative;
  width: 100%;
  height: 6.5rem;
  border-bottom: solid 1px ${({ dark }) => (dark ? '#515151' : '#e8e8e8')};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Profile = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-start;
`;

const ProfileImg = styled.img<{ image: boolean }>`
  @media ${Device.tabletL} {
    width: 3.25rem;
    margin-left: 1.25rem;

    ${({ image }) =>
      image &&
      css`
        height: 3.25rem;
        margin-bottom: 0.71rem;
        border-radius: 100%;
      `}
  }
  @media ${Device.mobileL} {
    width: 2.75rem;
    margin-left: 1rem;

    ${({ image }) =>
      image &&
      css`
        height: 2.75rem;
        margin-bottom: 0.56rem;
      `}
  }
`;

const Info = styled.div`
  margin-left: 0.75rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Name = styled.span`
  font-family: inherit;
  font-weight: bold;

  @media ${Device.tabletL} {
    font-size: 1.25rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.875rem;
  }
`;

const UserType = styled.span`
  @media ${Device.tabletL} {
    font-size: 1rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.75rem;
  }
`;

const RightWrapper = styled.div`
  width: calc(100% - 70% - 0.375rem);
  height: 100%;
  opacity: 100;
`;

const CircleIcon = styled.img`
  position: absolute;
`;

const ItemWrapper = styled.div<{ dark: boolean }>`
  width: 66%;
  margin-top: 1rem;
  position: absolute;
  z-index: 1;

  @media ${Device.tabletL} {
    margin-left: 1.375rem;
  }
  @media ${Device.mobileL} {
    margin-left: 1.125rem;
  }

  button {
    border-bottom: solid 0.5px ${({ dark }) => (dark ? '#515151' : '#e8e8e8')};
    color: ${({ dark }) => (dark ? '#e4e4e4' : '#000000')};
  }
`;

const Item = styled.button`
  width: 100%;
  height: 3rem;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: rgba(255, 255, 255, 0);

  display: flex;
  align-items: center;
`;

const ItemSpan = styled.span`
  font-family: inherit;
  font-weight: bold;

  @media ${Device.tabletL} {
    font-size: 1rem;
    margin-left: 1.25rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.75rem;
    margin-left: 1rem;
  }
`;

const ItemIcon = styled.img`
  @media ${Device.tabletL} {
    width: 1.25rem;
  }
  @media ${Device.mobileL} {
    width: 1.1rem;
  }
`;

const DownSide = styled.div`
  position: relative;
  height: calc(100% - 6.5rem);
`;

const HeaderMenuComponent: React.FC<
  HeaderMenuProps & HeaderMenuMethod & HeaderMenuOwnProps & RouteComponentProps
> = ({ name, image, type, toggleMenu, logout, history, location }) => {
  const isDark = location.pathname.includes('/festival');

  const handleShortCut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    toggleMenu(false);
    if (e.currentTarget.name === 'logout') {
      logout();
      history.push('/user/login');
    } else {
      history.push(`/${e.currentTarget.name}`);
    }
  };

  const userType = (): string => {
    if (type === 'student') {
      return '학생';
    } else if (type === 'teacher') {
      return '선생님';
    } else if (type === 'graduate') {
      return '졸업생';
    } else if (type === 'parent') {
      return '부모님';
    } else {
      return '';
    }
  };

  return (
    <Wrapper>
      <LeftWrapper dark={isDark}>
        <Upside dark={isDark}>
          <Profile>
            <ProfileImg
              image={!!image}
              src={image || DefaultProfileImg}
              alt=""
            />
            <Info>
              <Name>{name}님, 안녕하세요 ✨</Name>
              <UserType>{userType()}</UserType>
            </Info>
          </Profile>
          {!isDark && (
            <CircleIcon
              src={Circle1}
              style={{ top: '-50%', left: '54%' }}
              alt=""
            />
          )}
          <CircleIcon
            src={isDark ? FestivalBat : Circle2}
            style={{ right: '0', bottom: 0 }}
            alt=""
          />
        </Upside>
        <DownSide>
          <ItemWrapper dark={isDark}>
            <Item name="festival" onClick={handleShortCut}>
              <ItemIcon src={FestivalIcon} alt="" />
              <ItemSpan>한마당</ItemSpan>
            </Item>
            <Item name="notice" onClick={handleShortCut}>
              <ItemIcon src={NoticeIcon} alt="" />
              <ItemSpan>공지사항</ItemSpan>
            </Item>
            <Item name="timetable" onClick={handleShortCut}>
              <ItemIcon src={TimetableIcon} alt="" />
              <ItemSpan>시간표</ItemSpan>
            </Item>
            <Item name="calendar" onClick={handleShortCut}>
              <ItemIcon src={CalendarIcon} alt="" />
              <ItemSpan>학사일정</ItemSpan>
            </Item>
            <Item name="board" onClick={handleShortCut}>
              <ItemIcon src={BambooIcon} alt="" />
              <ItemSpan>대나무숲</ItemSpan>
            </Item>
            <Item name="meal" onClick={handleShortCut}>
              <ItemIcon src={MealIcon} alt="" />
              <ItemSpan>급식표</ItemSpan>
            </Item>
            <Item name="profile" onClick={handleShortCut}>
              <ItemIcon src={InfoEditIcon} alt="" />
              <ItemSpan>정보수정</ItemSpan>
            </Item>
            <Item name="logout" onClick={handleShortCut}>
              <ItemIcon src={LogoutIcon} alt="" />
              <ItemSpan>로그아웃</ItemSpan>
            </Item>
          </ItemWrapper>
          {!isDark && (
            <CircleIcon
              src={Circle3}
              style={{ width: '100%', bottom: 0 }}
              alt=""
            />
          )}
        </DownSide>
      </LeftWrapper>
      <RightWrapper onClick={() => toggleMenu(false)} />
    </Wrapper>
  );
};

export default HeaderMenuComponent;
