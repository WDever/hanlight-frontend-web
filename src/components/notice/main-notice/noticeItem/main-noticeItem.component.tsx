import { Device } from 'lib/styles';
import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface NoticeItemProps {
  title?: string;
  date?: string | number;
  read: boolean;
  onClick?: () => void;
}

/* eslint-disable @typescript-eslint/typedef */

const Wrapper = styled.article<{ read: boolean }>`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  width: 100%;
  height: 3.75rem;

  margin-bottom: 1rem;

  cursor: pointer;

  ::before {
    ${({ read }): string | FlattenSimpleInterpolation =>
      read === false
        ? css`
            position: absolute;

            content: ' ';

            width: 0.375rem;
            height: 0.375rem;

            border-radius: 50%;

            top: 0;
            left: -0.5rem;

            background-color: #ff5555;
          `
        : ''}
  }

  div {
    display: flex;
    flex-direction: column;
  }

  @media ${Device.tabletL} {
    height: 3rem;
    border-radius: 0.75rem;
  }

  @media ${Device.mobileL} {
    height: 2.25rem;
  }
`;

const Title = styled.h1`
  max-width: 31.25rem;

  font-family: 'Noto Sans KR';
  font-size: 17px;
  font-weight: normal;
  color: ${({ theme }): string => theme.mainCard.defaultFont};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  margin: 0;
  margin-bottom: 0.25rem;

  @media ${Device.mobileL} {
    width: 70%;
    font-size: 0.75rem;
    margin-left: 1.5rem;
  }
`;

const Content = styled.h2`
  max-width: 31.25rem;

  font-family: 'Noto Sans KR';
  font-size: 15px;
  font-weight: normal;
  color: ${({ theme }): string => theme.mainCard.notice.excerptFont};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  margin: 0;
`;

const Date = styled.h3`
  display: flex;
  justify-content: flex-end;

  font-family: 'Noto Sans KR';
  font-size: 15px;
  font-weight: normal;
  color: ${({ theme }): string => theme.mainCard.defaultFont};

  margin: 0;

  @media ${Device.tabletL} {
    font-size: 0.82rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.625rem;
  }
`;

/* eslint-enable @typescript-eslint/typedef */

const NoticeItem: React.FC<NoticeItemProps> = ({
  onClick,
  title,
  date,
  read,
}: NoticeItemProps) => (
  <Wrapper read={read} onClick={onClick}>
    <div>
      <Title>{title}</Title>
      <Content>
        한빛 업데이트 2.0에대한 업데이트 소식 및 한빛 플랫폼 확장에 대해
        안내드립니다.
      </Content>
    </div>
    <Date>{date}</Date>
  </Wrapper>
);

export default NoticeItem;
