import * as React from 'react';

import { HTModalProps } from 'container/hanseithon/modal';
import { useInputs } from 'lib/hooks';
import { Device } from 'lib/styles';
import styled from 'styled-components';

const JoinTeamBox = styled.div`
  width: 27.5rem;
  height: 19.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #ffffff;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.2);

  border-radius: 0.5rem;

  @media ${Device.tabletL} {
    width: 18.875rem;
    height: 16.625rem;
  }
`;

const JoinTeamWrapper = styled.div`
  width: 90%;
  height: 85.4%;

  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  font-family: 'Noto Sans KR';

  div {
    font-family: inherit;
    font-size: 1.25rem;
    font-weight: bold;
  }

  span {
    font-family: inherit;
    font-size: 0.875rem;
  }
`;

const TeamForm = styled.div<{ join?: boolean }>`
  width: 100%;

  font-family: 'Noto Sans KR';

  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;

    font-family: inherit;
    font-size: 1rem;
    font-weight: bold;

    margin-top: 1.25rem;

    @media ${Device.tabletL} {
      margin-top: 1.575rem;
    }
  }

  input {
    border: none;
    border-top: solid 1px #e9e9e9;
    border-bottom: solid 1px #e9e9e9;

    height: 1.9375rem;

    font-family: inherit;
    font-size: 0.875rem;

    background-color: #ffffff;

    @media ${Device.tabletL} {
      height: 1.6875rem;
    }
  }

  button {
    width: 7.5rem;
    height: 2rem;

    align-self: flex-end;

    font-family: 'Open Sans';
    font-size: 0.8125rem;

    background-color: #000000;

    color: #ffffff;

    border-radius: 1rem;

    margin-top: 3.25rem;

    @media ${Device.tabletL} {
      width: 5rem;
      height: 1.75rem;

      margin-top: ${props => (props.join ? '1.6rem' : '1.25rem')};

      font-size: 11px;
      font-weight: bold;
    }
  }
`;

const JoinTeamModal: React.FC = () => {
  return (
    <JoinTeamBox>
      <JoinTeamWrapper>
        <TitleWrapper>
          <div>쉬어가는 한세톤 : 休</div>
          <span>팀 참가</span>
        </TitleWrapper>
        <TeamForm join={true} style={{ marginTop: '1.125rem' }}>
          <label style={{ marginTop: '0' }}>
            직군
            <input
              type="text"
              placeholder="ex) 백엔드 개발자 , 프론트 개발자 , 디자이너 , 기획자"
            />
          </label>
          <label>
            참가 키
            <input type="text" placeholder="ex) FFFFFFFFF" />
          </label>
          <button>참가</button>
        </TeamForm>
      </JoinTeamWrapper>
    </JoinTeamBox>
  );
};

const CreateTeamBox = styled.div`
  width: 27.5rem;
  height: 21rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #ffffff;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.2);

  border-radius: 0.5rem;

  @media ${Device.tabletL} {
    width: 18.875rem;
    height: 21.125rem;
  }
`;

const CreateTeamWrapper = styled.div`
  width: 90%;
  height: 90%;

  display: flex;
  flex-direction: column;
`;

const CreateTeamModal: React.FC = () => {
  return (
    <CreateTeamBox>
      <CreateTeamWrapper>
        <TitleWrapper>
          <div>쉬어가는 한세톤 : 休</div>
          <span>팀 생성</span>
        </TitleWrapper>
        <TeamForm style={{ marginTop: '1rem' }}>
          <label style={{ marginTop: '0' }}>
            신청 부문
            <input type="text" placeholder="생활 부문, 게임 부문" />
          </label>
          <label>
            팀명
            <input type="text" placeholder="팀명" />
          </label>
          <label>
            팀장 직군
            <input type="text" placeholder="직군" />
          </label>
          <button style={{ marginTop: '0.9375rem' }}>생성 시작</button>
        </TeamForm>
      </CreateTeamWrapper>
    </CreateTeamBox>
  );
};

const MatchTeamBox = CreateTeamBox;

const MatchTeamWrapper = CreateTeamWrapper;

const MatchTeamModal: React.FC = () => {
  return (
    <MatchTeamBox>
      <MatchTeamWrapper>
        <TitleWrapper>
          <div>쉬어가는 한세톤 : 休</div>
          <span>팀 매칭</span>
        </TitleWrapper>
        <TeamForm style={{ marginTop: '1rem' }}>
          <label style={{ marginTop: '0' }}>
            신청 부문
            <input type="text" placeholder="생활 부문, 게임 부문" />
          </label>
          <label>
            직군
            <input type="text" placeholder="직군" />
          </label>
          <label>
            자기소개
            <input type="text" placeholder="자기소개" />
          </label>
          <button style={{ marginTop: '0.9375rem' }}>매칭 시작</button>
        </TeamForm>
      </MatchTeamWrapper>
    </MatchTeamBox>
  );
};

const HTModalComponent: React.FC<HTModalProps> = ({ modalType }) => {
  if (modalType === 'create') {
    return <CreateTeamModal />;
  } else if (modalType === 'join') {
    return <JoinTeamModal />;
  } else if (modalType === 'match') {
    return <MatchTeamModal />;
  } else {
    return <></>;
  }
};

export default HTModalComponent;
