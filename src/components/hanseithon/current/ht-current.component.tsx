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
  justify-content: center;

  border: solid 1px #e8e8e8;

  margin-top: 1.5rem;
`;

const CategoryBox = styled.div<{ active: boolean }>`
  width: 50%;

  cursor: pointer;

  font-family: 'Opne Sans';
  font-size: 1.375rem;
  font-weight: bold;
  color: ${props => (props.active ? '#ffffff' : '#000000')};

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${props => (props.active ? '#000000' : '#ffffff')};
`;

const ListWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, 14.25rem);
  grid-column-gap: 0.5rem;
  grid-row-gap: 2.5rem;
  justify-content: space-between;

  margin-top: 2.5rem;
  margin-bottom: 3rem;
`;

const HTCurrentComponent: React.FC<HTCurrentMethod & HTCurrentProps> = ({
  teams,
  getTeam,
  getTeamStatus,
  accessToken,
  modal,
}) => {
  const [category, setCategory] = useState<CategoryType>('l');
  const TeamsList =
    getTeamStatus === 'success'
      ? teams.map((item, i) => {
          return (
            <HTCurrentItem
              key={i}
              name={item.name}
              leaderName={item.leader_name}
              teamMember={item.teamMember}
              category={category}
              modal={modal}
            />
          );
        })
      : [];

  useEffect(() => {
    getTeam({ accessToken, category });
  }, [category]);

  return (
    <Wrapper>
      <CategoryWrapper>
        <CategoryBox active={category === 'l'} onClick={() => setCategory('l')}>
          생활 부문
        </CategoryBox>
        <CategoryBox active={category === 'g'} onClick={() => setCategory('g')}>
          게임 부문
        </CategoryBox>
      </CategoryWrapper>
      <ListWrapper>{TeamsList}</ListWrapper>
    </Wrapper>
  );
};

export default HTCurrentComponent;
