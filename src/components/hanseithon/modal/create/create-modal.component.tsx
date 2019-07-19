import * as React from 'react';

import { useInput } from 'lib/hooks';
import { Device } from 'lib/styles';
import styled from 'styled-components';
import {
  ModalProps,
  TeamForm,
  TitleWrapper,
  XButton,
} from '../ht-modal.component';

const { useEffect } = React;

const CreateTeamBox = styled.div`
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

const CreateTeamModal: React.FC<ModalProps> = ({
  changeSelect,
  postTeam,
  accessToken,
  data,
  postTeamStatus,
  errMessage,
  modal,
  deem,
  resetStatus,
}) => {
  const [teamName, setTeamName] = useInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postTeam({
      accessToken,
      teamName,
      userPosiotion: data.job,
      category: data.category,
    });
  };

  useEffect(() => {
    if (postTeamStatus === 'success') {
      modal('create-success');
    } else if (postTeamStatus === 'failure') {
      alert(errMessage);
      deem(false);
      modal('none');
      resetStatus();
    }
  }, [postTeamStatus]);

  return (
    <CreateTeamBox>
      <XButton
        onClick={() => {
          deem(false);
          modal('none');
        }}
      />
      <CreateTeamWrapper>
        <TitleWrapper>
          <div>쉬어가는 한세톤 : 休</div>
          <span>팀 생성</span>
        </TitleWrapper>
        <TeamForm style={{ marginTop: '1rem' }} onSubmit={handleSubmit}>
          <label style={{ marginTop: '0' }}>
            신청 부문
            <select name="category" onChange={changeSelect}>
              <option value="l">생활</option>
              <option value="g">게임</option>
            </select>
          </label>
          <label>
            팀명
            <input
              type="text"
              placeholder="팀명"
              value={teamName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTeamName(e.currentTarget.value)
              }
            />
          </label>
          <label>
            팀장 직군
            <select name="job" onChange={changeSelect}>
              <option>기획</option>
              <option>개발</option>
              <option>디자인</option>
            </select>
          </label>
          <button
            style={{ marginTop: '0.9375rem' }}
            disabled={postTeamStatus === 'pending'}
          >
            생성 시작
          </button>
        </TeamForm>
      </CreateTeamWrapper>
    </CreateTeamBox>
  );
};

export default CreateTeamModal;
