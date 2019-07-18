import * as React from 'react';

import { HTCurrentMethod, HTCurrentProps } from 'container/hanseithon/current';
import { CategoryType } from 'store';
import styled from 'styled-components';
import HTCurrentItem from './currentItem';

const { useEffect, useState } = React;

const Wrapper = styled.div`
  max-width: 66.25rem;
  width: 90%;
`;

const CategoryWrapper = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
`;

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const HTCurrentComponent: React.FC<HTCurrentMethod & HTCurrentProps> = ({
  teams,
  getTeam,
  getTeamStatus,
  accessToken,
}) => {
  const [category, setCategory] = useState<CategoryType>('l');
  const TeamsList =
    getTeamStatus === 'success'
      ? teams.map((item, i) => {
          return (
            <HTCurrentItem
              key={i}
              name={item.name}
              leaderName={item.leaderName}
              teamMember={item.teamMember}
            />
          );
        })
      : [];

  useEffect(() => {
    getTeam({ accessToken, category });
  }, []);

  return (
    <Wrapper>
      <CategoryWrapper />
      <ListWrapper>{TeamsList}</ListWrapper>
    </Wrapper>
  );
};

export default HTCurrentComponent;
