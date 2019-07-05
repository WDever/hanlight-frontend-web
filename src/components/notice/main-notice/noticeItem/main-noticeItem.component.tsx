import { Device } from 'lib/styles';
import * as React from 'react';
import styled from 'styled-components';

interface NoticeItemProps {
  title: string;
  date: string | number;
  read: boolean;
  onClick?: () => void;
}

const ItemBox = styled.div<{ read: boolean }>`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.4rem;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
  background: linear-gradient(
    90deg,
    ${props => (props.read ? '#ff5677' : '#4470ff')} 0.92rem,
    #ffffff 0%
  );

  @media ${Device.tablet} {
    height: 3rem;
    border-radius: 0.75rem;
    background: linear-gradient(
      90deg,
      ${props => (props.read ? '#ff5677' : '#4470ff')} 0.76rem,
      #ffffff 0%
    );
  }
  @media ${Device.mobileL} {
    height: 2.25rem;
  }
`;

const TitleBox = styled.span`
  width: 100%;
  font-family: 'Spoqa Han Sans';
  font-size: 1rem;
  margin-left: 2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media ${Device.mobileL} {
    width: 70%;
    font-size: 0.75rem;
    margin-left: 1.5rem;
  }
`;

const Date = styled.span`
  display: flex;
  justify-content: flex-end;
  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  font-weight: 300;
  margin-right: 1rem;
  width: 16.6%;

  @media ${Device.tablet} {
    font-size: 0.82rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.625rem;
  }
`;

const NoticeItem: React.FC<NoticeItemProps> = ({
  onClick,
  title,
  date,
  read,
}) => (
  <ItemBox read={read} onClick={onClick}>
    <TitleBox>{title}</TitleBox>
    <Date>{date}</Date>
  </ItemBox>
);

export default NoticeItem;
