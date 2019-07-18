import * as React from 'react';

import { HTCurrentMethod, HTCurrentProps } from 'container/hanseithon/current';
import { Device } from 'lib/styles';
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

  @media ${Device.mobileL} {
    height: 2.25rem;
  }
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

  @media ${Device.mobileL} {
    font-size: 1.12rem;
  }
`;

const CurrentCategoryBox = styled.div<{ active: boolean }>`
  width: 25%;

  cursor: pointer;

  font-family: 'Opne Sans';
  font-size: 1.375rem;
  font-weight: bold;
  color: ${props => (props.active ? '#ffffff' : '#000000')};

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${props => (props.active ? '#000000' : '#ffffff')};

  @media ${Device.mobileL} {
    font-size: 1.12rem;
  }
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

  @media ${Device.tabletL} {
    grid-template-columns: repeat(auto-fit, 9.33rem);
    grid-column-gap: 1.41rem;
    grid-row-gap: 1.62rem;
  }

  @media ${Device.mobileL} {
    grid-row-gap: 1.49rem;

    margin-top: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

type MatchType = 'match-l' | 'match-g';

const HTCurrentComponent: React.FC<
  HTCurrentMethod & HTCurrentProps & { isModal?: boolean }
> = ({
  teams,
  getTeam,
  getTeamStatus,
  accessToken,
  modal,
  setTeamPk,
  isModal,
}) => {
  const [category, setCategory] = useState<CategoryType | MatchType>('l');

  const TeamsList =
    getTeamStatus === 'success'
      ? teams.map((item, i) => {
          return (
            <HTCurrentItem
              key={i}
              name={item.name}
              leaderName={item.leader_name}
              teamMember={item.teamMember}
              team_pk={item.pk}
              category={category}
              modal={modal}
              setTeamPk={setTeamPk}
            />
          );
        })
      : [];

  const MatchList =
    getTeamStatus === 'success'
      ? teams.map((item, i) => {
          return (
            <HTCurrentItem
              key={i}
              name={item.name}
              leaderName={item.leader_name}
              teamMember={item.teamMember}
              team_pk={item.pk}
              category={category}
              modal={modal}
              setTeamPk={setTeamPk}
            />
          );
        })
      : [];

  useEffect(() => {
    if (category === 'l' || category === 'g') {
      getTeam({ accessToken, category });
    } else if (category === 'match-i' || category === 'match-g') {
      // 매칭 요청
    }
  }, [category]);

  return (
    <Wrapper>
      <CategoryWrapper>
        {isModal ? (
          <>
            <CategoryBox
              active={category === 'l'}
              onClick={() => setCategory('l')}
            >
              생활 부문
            </CategoryBox>
            <CategoryBox
              active={category === 'g'}
              onClick={() => setCategory('g')}
            >
              게임 부문
            </CategoryBox>
          </>
        ) : (
          <>
            <CurrentCategoryBox
              active={category === 'l'}
              onClick={() => setCategory('l')}
            >
              생활 부문
            </CurrentCategoryBox>
            <CurrentCategoryBox
              active={category === 'g'}
              onClick={() => setCategory('g')}
            >
              게임 부문
            </CurrentCategoryBox>
            <CurrentCategoryBox
              active={category === 'match-l'}
              onClick={() => setCategory('match-l')}
            >
              생활 - 매칭
            </CurrentCategoryBox>
            <CurrentCategoryBox
              active={category === 'match-g'}
              onClick={() => setCategory('match-g')}
            >
              게임 - 매칭
            </CurrentCategoryBox>
          </>
        )}
      </CategoryWrapper>
      <ListWrapper>
        {category === 'i' || category === 'g' ? TeamsList : MatchList}
      </ListWrapper>
    </Wrapper>
  );
};

export default HTCurrentComponent;
