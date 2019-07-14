import * as React from 'react';

import Role1 from 'lib/svg/1-role.svg';
import Role2 from 'lib/svg/2-role.svg';
import Role3 from 'lib/svg/3-role.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 35%;
  max-width: 32.5rem;
  min-width: 23.5rem;
  height: calc(85vh);
  min-height: 32rem;
  max-height: 39.375rem;
  top: 5.25rem;
  position: sticky;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Role = styled.div`
  width: 100%;
  height: 32%;
  border: 1px solid #d1d1d1;
  background-color: #ffffff;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RoleImg = styled.img`
  margin-left: 7%;
  width: 30%;
  max-width: 151px;
`;

const RoleContent = styled.div`
  width: 50%;
  max-width: 238px;
  margin-right: 7%;
  word-break: keep-all;
`;

const RoleContentStep = styled.div`
  font-family: 'yg-jalnan';
  font-size: 0.8rem;
  display: grid;
`;

const RoleContentString = styled.span`
  font-size: 0.75rem;
  font-family: 'Spoqa Han Sans';
  color: #3b3b3b;
`;

const BoardRolePage: React.FC = () => (
  <Wrapper>
    <Role>
      <RoleImg src={Role1} alt="" />
      <RoleContent>
        <RoleContentStep>
          <span>STEP 1.</span>
          <span>상대방을 비하하는 행동은 삼가해주세요.</span>
        </RoleContentStep>
        <RoleContentString>
          한빛 홈페이지 내에서의 다른 타인을 비하하는 내용의 글이나 이미지를
          절대 금지하고 있습니다. 모두 에티켓을 지켜주는 한세인이 되도록 합시다.
        </RoleContentString>
      </RoleContent>
    </Role>
    <Role>
      <RoleImg src={Role2} alt="" />
      <RoleContent>
        <RoleContentStep>
          <span>STEP 2.</span>
          <span>정치적 성향이 들어간 글을 자제해주세요.</span>
        </RoleContentStep>
        <RoleContentString>
          이곳은 학교내의 인트라넷 서비스입니다. 특정 대통령 및 사회의 정치적
          성향이 들어간 단어 및 발언을 자제해주시길 바랍니다.
        </RoleContentString>
      </RoleContent>
    </Role>
    <Role>
      <RoleImg src={Role3} alt="" />
      <RoleContent>
        <RoleContentStep>
          <span>STEP 3.</span>
          <span>여러분들이 재미있게 써주세요!</span>
        </RoleContentStep>
        <RoleContentString>
          규칙만 잘 지켜진다면 후배,선배들간의 재밌는 익명 커뮤니티로 자리잡을
          것 입니다. 부디 재미있게 대나무숲을 이용해주세요!
        </RoleContentString>
      </RoleContent>
    </Role>
  </Wrapper>
);

export default BoardRolePage;
