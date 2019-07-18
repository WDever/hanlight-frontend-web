import * as React from 'react';

import { useInput } from 'lib/hooks';
import styled from 'styled-components';
import {
  ModalProps,
  TeamBox,
  TeamForm,
  TeamWrapper,
  TitleWrapper,
} from '../ht-modal.component';

const MatchTeamModal: React.FC<ModalProps> = ({
  changeSelect,
  postTeamMatch,
  data,
  accessToken,
}) => {
  const [introduction, setIntrodiction] = useInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postTeamMatch({
      accessToken,
      category: data.category,
      position: data.job,
      introduction,
    });
  };

  return (
    <TeamBox>
      <TeamWrapper>
        <TitleWrapper>
          <div>쉬어가는 한세톤 : 休</div>
          <span>팀 매칭</span>
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
            직군
            <select name="job" onChange={changeSelect}>
              <option value="기획">기획</option>
              <option value="개발">개발</option>
              <option value="디자인">디자인</option>
            </select>
          </label>
          <label>
            자기소개
            <input
              type="text"
              placeholder="자기소개"
              value={introduction}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIntrodiction(e.currentTarget.value)
              }
            />
          </label>
          <button style={{ marginTop: '0.9375rem' }}>매칭 시작</button>
        </TeamForm>
      </TeamWrapper>
    </TeamBox>
  );
};

export default MatchTeamModal;
