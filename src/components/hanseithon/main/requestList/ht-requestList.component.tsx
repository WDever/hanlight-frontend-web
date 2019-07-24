import * as React from 'react';

import { Device } from 'lib/styles';
import BackgroundImg from 'lib/svg/mentoring-background.svg';
import styled from 'styled-components';
import HTRequestItemComponent, { RequestListItemProps } from './requestItem';

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  margin-bottom: 8rem;

  @media ${Device.mobileL} {
    margin-bottom: 1.55rem;
  }
`;

const Background = styled.img`
  position: absolute;
  z-index: -1;

  @media ${Device.mobileL} {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  font-size: 2.25rem;

  margin-bottom: 2.3rem;

  @media ${Device.mobileL} {
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
`;

const ContentWrapper = styled.div`
  width: 43.125rem;

  font-family: 'Open Sans';

  @media ${Device.mobileL} {
    width: 100%;
  }

  p {
    margin: 0;

    width: 100%;
    height: 4rem;

    font-weight: bold;
    font-size: 19px;
    color: #ffffff;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #000000;

    @media ${Device.mobileL} {
      height: 2.125rem;

      font-size: 13px;
    }
  }
`;

interface RequestListProps extends RequestListItemProps {}

const HTRequestList: React.FC<RequestListProps> = ({ deem, modal }) => {
  return (
    <Wrapper>
      <Background src={BackgroundImg} alt="Mentor list background" />
      <TitleWrapper>실시간 멘토링 요청 현황</TitleWrapper>
      <ContentWrapper>
        <p>실시간 요청 체크</p>
        <HTRequestItemComponent deem={deem} modal={modal} />
      </ContentWrapper>
    </Wrapper>
  );
};

export default HTRequestList;
