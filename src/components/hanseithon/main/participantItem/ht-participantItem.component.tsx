import * as React from 'react';

import { Device } from 'lib/styles';
import styled from 'styled-components';

const Wrapper = styled.div<{ prize: number }>`
  width: calc(100% - 3.5rem);
  padding: 1.625rem 1.75rem 1.9rem 1.75rem;
  font-family: 'Open Sans';
  border-radius: 0.5rem;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.08);
  background-color: ${({ prize }) => {
    if (prize === 1) {
      return '#FFD700';
    } else if (prize === 2) {
      return '#C4CACE';
    } else if (prize === 3) {
      return '#d7995b';
    } else {
      return '#ffffff';
    }
  }};

  @media ${Device.tabletS} {
    width: calc(100% - 1.7rem);
    padding: 0.85rem;
  }

  @media ${Device.mobileL} {
    width: calc(100% - 2.625rem);
    padding: 1.125rem 1.3125rem 1.475rem 1.3125rem;
  }
`;

const Team = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Name = styled.div`
  width: 100%;
  display: inline-block;
  font-family: 'OpenSans';
  font-weight: bold;
  font-size: 1.25rem;
  text-align: center;
  word-break: keep-all;
  margin-bottom: 1.5rem;
  @media ${Device.mobileL} {
    font-size: 15px;
  }
`;

const TeamMembersWrapper = styled.div<{ leader?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Open Sans';
  div {
    font-size: 1rem;
    font-family: inherit;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    @media ${Device.mobileL} {
      font-size: 0.625rem;
    }
  }
`;

const TeamMembers = styled.div<{ leader: boolean }>`
  font-weight: ${props => (props.leader ? 'bold' : 'normal')};
  color: ${props => (props.leader ? '#000000' : '#6f6f6f')};
`;

export interface TeamMemberType {
  name: string;
  leader: boolean;
  studentId: string;
  position: string;
}

export interface TeamType {
  pk: number;
  name: string;
  prize: number;

  teamMember: TeamMemberType[];
}

interface ParticipantItemProps {
  team: TeamType;
}

const HTParticipantItemComponent: React.FC<ParticipantItemProps> = ({
  team,
}) => {
  const TeamMembersList = team.teamMember.map((item, i) => {
    return (
      <TeamMembers key={i} leader={item.leader}>
        {item.position} - {item.name}/{item.studentId}
      </TeamMembers>
    );
  });

  return (
    <Wrapper prize={team.prize}>
      <Team>
        <Name>{team.name}</Name>
        <TeamMembersWrapper>{TeamMembersList}</TeamMembersWrapper>
      </Team>
    </Wrapper>
  );
};

export default HTParticipantItemComponent;
