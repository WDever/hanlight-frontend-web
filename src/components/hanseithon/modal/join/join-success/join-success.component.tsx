import * as React from 'react';

import { Device } from 'lib/styles';
import JoinSuccessSvg from 'lib/svg/join-team-success.svg';
import { Deem, ModalTypes } from 'store';
import styled from 'styled-components';
import { TitleWrapper, XButton } from '../../ht-modal.component';

const JoinSuccessBox = styled.div`
  width: 27.5rem;
  height: 29rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  background-color: #ffffff;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.2);

  border-radius: 0.5rem;

  max-width: 27.5rem;

  @media ${Device.mobileL} {
    width: 18.925rem;
    height: 21.125rem;
  }
`;

const JoinSuccessWrapper = styled.div`
  width: 90%;
  height: 88.15%;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${Device.tabletL} {
    height: 90%;
  }
`;

const JoinSuccessImg = styled.img`
  width: 17.625rem;
  margin-top: 2.875rem;

  @media ${Device.tabletL} {
    width: 11.625rem;
    height: 9.1rem;

    margin-top: 2.65rem;
  }
`;

const JoinSuccessText = styled.div`
  font-family: 'Noto Sans KR';
  font-size: 1.25rem;
  font-weight: bold;

  margin-top: 0.25rem;

  @media ${Device.tabletL} {
    font-size: 0.875rem;

    margin-top: 3px;
  }
`;

const JoinSuccessBtn = styled.div`
  width: 8.75rem;
  height: 2.25rem;

  border-radius: 1rem;
  background-color: #000000;

  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 0.8125rem;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 2.675rem;

  @media ${Device.tabletL} {
    margin-top: 2.25rem;

    width: 5rem;
    height: 1.75rem;

    font-size: 11px;

    align-self: flex-end;
  }
`;

export interface JoinSuccessProps {
  teamName: string;

  resetStatus(): void;
  deem(payload: boolean): void;
  modal(payload: ModalTypes): void;
}
const JoinSuccessModal: React.FC<JoinSuccessProps> = ({
  teamName,
  resetStatus,
  deem,
  modal,
}) => {
  return (
    <JoinSuccessBox>
      <XButton
        onClick={() => {
          deem(false);
          modal('none');
        }}
      />
      <JoinSuccessWrapper>
        <TitleWrapper>
          <div>쉬어가는 한세톤 : 休</div>
          <span>팀 참가</span>
        </TitleWrapper>
        <JoinSuccessImg src={JoinSuccessSvg} alt="join success" />
        <JoinSuccessText>{teamName}팀에 참가하였습니다!</JoinSuccessText>
        <JoinSuccessBtn
          onClick={() => {
            deem(false);
            modal('none');
            resetStatus();
          }}
        >
          확인
        </JoinSuccessBtn>
      </JoinSuccessWrapper>
    </JoinSuccessBox>
  );
};

export default JoinSuccessModal;
