import * as React from 'react';

import { Device } from 'lib/styles';
import { ModalTypes } from 'store';
import styled from 'styled-components';
import { TitleWrapper, XButton } from '../../ht-modal.component';

const CreateSuccessBox = styled.div`
  width: 27.5rem;
  height: 21rem;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #ffffff;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.2);

  border-radius: 0.5rem;

  max-width: 27.5rem;

  @media ${Device.mobileL} {
    width: 18.925rem;
    height: 21.125rem;
  }
`;

const CreateSuccessWrapper = styled.div`
  width: 90%;
  height: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreateSuccessContent = styled.div`
  font-size: 1rem;
  font-family: 'Noto Sans KR';
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 3.875rem;

  @media ${Device.tabletL} {
    margin-top: 3.375rem;
    font-size: 0.875rem;
  }

  div {
    font-size: 1.5rem;
    font-family: inherit;
    font-weight: bold;

    margin-top: 1rem;

    @media ${Device.tabletL} {
      font-size: 1.125rem;
    }

    span {
      font-weight: normal;
      font-size: inherit;
      font-family: inherit;
    }
  }

  p {
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: normal;

    margin-top: 1rem;
    margin-bottom: 0;

    text-align: center;

    @media ${Device.tabletL} {
      font-size: 13px;
    }
  }
`;

const CreateSuccessBtn = styled.div`
  width: 7.5rem;
  height: 2rem;

  border-radius: 1.1rem;
  background-color: #000000;

  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 0.8125rem;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;

  margin-top: 1.6875rem;

  @media ${Device.tabletL} {
    margin-top: 2.25rem;

    width: 5rem;
    height: 1.75rem;

    font-size: 11px;

    align-self: flex-end;
  }
`;

export interface CreateSuccessProps {
  teamName: string;
  code: number;

  resetStatus(): void;
  deem(payload: boolean): void;
  modal(payload: ModalTypes): void;
}

const CreateSuccessModal: React.FC<CreateSuccessProps> = ({
  teamName,
  code,
  deem,
  modal,
  resetStatus,
}) => {
  return (
    <CreateSuccessBox>
      <XButton
        onClick={() => {
          deem(false);
          modal('none');
        }}
      />
      <CreateSuccessWrapper>
        <TitleWrapper>
          <div>쉬어가는 한세톤 : 休</div>
          <span>팀 생성</span>
        </TitleWrapper>
        <CreateSuccessContent>
          {teamName} 팀 생성이 완료 되었습니다
          <div>
            <span>팀 참가 코드 : {code}</span>
          </div>
          <p>
            팀원이 팀 참가를 선택한 후,
            <br /> 해당 패스워드를 입력하시면
            <br /> 팀에 참가하실 수 있습니다
          </p>
        </CreateSuccessContent>
        <CreateSuccessBtn
          onClick={() => {
            deem(false);
            modal('none');
            resetStatus();
          }}
        >
          확인
        </CreateSuccessBtn>
      </CreateSuccessWrapper>
    </CreateSuccessBox>
  );
};

export default CreateSuccessModal;
