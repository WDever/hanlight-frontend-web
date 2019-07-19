import * as React from 'react';

import { useInput } from 'lib/hooks';
import { Device } from 'lib/styles';
import styled from 'styled-components';
import { ModalProps, TitleWrapper, XButton } from '../ht-modal.component';

const { useEffect } = React;

const JoinTeamBox = styled.div`
  width: 27.5rem;
  height: 19.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #ffffff;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.2);

  position: relative;

  border-radius: 0.5rem;

  max-width: 27.5rem;

  @media ${Device.mobileL} {
    width: 18.875rem;
    height: 17.625rem;
  }
`;

const JoinTeamWrapper = styled.div`
  width: 90%;
  height: 85.4%;

  display: flex;
  flex-direction: column;
`;

const JoinJobLabel = styled.label``;

const JoinKeyLabel = styled.label`
  height: 5rem;

  margin-top: 1.25rem;

  @media ${Device.tabletL} {
    height: 4.375rem;

    margin-top: 1.575rem;
  }
`;

const JoinTeamForm = styled.form`
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

  select {
    width: 5.375rem;
    height: 1.9375rem;

    background-color: #ffffff;
    border-radius: 0;
    border-radius: 4px;
    border: solid 1px #707070;

    font-family: inherit;
    font-size: 0.875rem;

    @media ${Device.tabletL} {
      height: 1.6875rem;
    }
  }

  span {
    font-size: 0.8125rem;
    color: #ff0000;
    font-family: 'Open Sans';
    font-weight: normal;
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

    margin-top: 1.875rem;

    @media ${Device.tabletL} {
      width: 5rem;
      height: 1.75rem;

      margin-top: 1.25rem;

      font-size: 11px;
      font-weight: bold;
    }
  }
`;

const JoinTeamModal: React.FC<ModalProps> = ({
  putTeam,
  changeSelect,
  data,
  accessToken,
  modal,
  teamPk,
  putTeamStatus,
  deem,
  resetStatus,
  errMessage,
}) => {
  const [code, setCode] = useInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { job } = data;

    putTeam({
      accessToken,
      team_pk: teamPk,
      posiotion: job,
      code: Number(code),
    });
  };

  useEffect(() => {
    if (putTeamStatus === 'success') {
      modal('join-success');
    } else if (putTeamStatus === 'failure') {
      alert(errMessage);
      deem(false);
      modal('none');
      resetStatus();
    }
  }, [putTeamStatus]);

  return (
    <JoinTeamBox>
      <XButton
        onClick={() => {
          deem(false);
          modal('none');
        }}
      />
      <JoinTeamWrapper>
        <TitleWrapper>
          <div>쉬어가는 한세톤 : 休</div>
          <span>팀 참가</span>
        </TitleWrapper>
        <JoinTeamForm style={{ marginTop: '1.125rem' }} onSubmit={handleSubmit}>
          <JoinJobLabel>
            직군
            <select onChange={changeSelect}>
              <option value="기획">기획</option>
              <option value="개발">개발</option>
              <option value="디자인">디자인</option>
            </select>
          </JoinJobLabel>
          <JoinKeyLabel>
            참가 키
            <input type="text" placeholder="예) 1234" onChange={setCode} />
          </JoinKeyLabel>
          <button disabled={putTeamStatus === 'pending'}>참가</button>
        </JoinTeamForm>
      </JoinTeamWrapper>
    </JoinTeamBox>
  );
};

export default JoinTeamModal;
