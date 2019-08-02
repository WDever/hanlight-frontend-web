import * as React from 'react';

import HTVideoComponent from 'components/hanseithon/video';
import { HTMainMethod, HTMainProps } from 'container/hanseithon/main';
import GroupPicture from 'lib/png/group-pic.jpg';
import { Device } from 'lib/styles';
import BackgroundImg from 'lib/svg/ht-background.svg';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { gameTeams, livingTeams } from './participantData';
import HTParticipantItem from './participantItem';
import HTSponsor from './sponsor';

const { useState } = React;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-x: hidden;

  background-image: url(${BackgroundImg});
  background-size: 102.5%;
  background-position: center -1rem;
  background-repeat: no-repeat;
`;

const TitleWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  padding: 20% 0;
  margin-bottom: 45%;

  @media ${Device.laptopS} {
    padding-top: 9rem;
  }

  @media ${Device.mobileL} {
    padding-top: 4rem;
  }

  span {
    font-size: 4.5rem;
    color: #ffffff;

    @media ${Device.tabletL} {
      font-size: 3rem;
    }

    @media ${Device.mobileL} {
      font-size: 2rem;
    }

    @media ${Device.mobileS} {
      font-size: 1.5rem;
    }
  }
`;

const WinWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  margin-bottom: 50%;

  @media ${Device.laptopL} {
    margin-bottom: 45%;
  }

  div {
    width: 35%;
    font-family: 'yg-jalnan';
    font-size: 1.5rem;
    color: #ffffff;

    display: flex;
    align-items: center;
    flex-direction: column;

    span {
      font-family: 'Spoqa Han Sans';
      font-size: 2.25rem;
      font-weight: bold;
      color: #ff476c;
    }
  }
`;

const GroupImg = styled.img`
  background-color: #ffffff;

  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.46);
  border-radius: 0.25rem;

  margin-right: 10rem;

  width: 40%;

  @media ${Device.tabletS} {
    margin-bottom: 5rem;
    margin-right: 0;
    width: 90%;
  }
`;

const ContentWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  margin-bottom: 10rem;

  @media ${Device.tabletS} {
    flex-direction: column;

    font-size: 0.875rem;

    margin-bottom: 5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;

  font-size: 2.25rem;

  @media ${Device.mobileL} {
    font-size: 1rem;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 0;
      margin-bottom: 2.4rem;

      text-align: center;

      @media ${Device.mobileL} {
        margin-bottom: 0.9rem;
      }
    }
  }

  button {
    width: 15rem;
    height: 4rem;

    box-shadow: 0 21px 30px 0 rgba(95, 95, 95, 0.4);

    border-radius: 2rem;

    background-color: #000000;

    color: #ffffff;
    font-family: 'Nanum Myeongjo';
    font-size: 1.5rem;

    cursor: pointer;

    outline: none;
    border: none;
    padding: none;

    @media ${Device.mobileL} {
      width: 9.3125rem;
      height: 2.25rem;

      font-size: 0.875rem;
    }
  }

  input {
    display: none;
  }

  label {
    width: 15rem;
    height: 4rem;

    box-shadow: 0 21px 30px 0 rgba(95, 95, 95, 0.4);

    border-radius: 2rem;

    background-color: #000000;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #ffffff;
    font-family: 'Nanum Myeongjo';
    font-size: 1.5rem;

    cursor: pointer;

    outline: none;
    border: none;
    padding: none;

    @media ${Device.mobileL} {
      width: 9.3125rem;
      height: 2.25rem;

      font-size: 0.875rem;
    }
  }
`;

const ListWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 3rem;
    font-family: 'yg-jalnan';

    margin: 0;
    margin-bottom: 5rem;

    @media ${Device.tabletL} {
      margin-bottom: 2.5rem;

      font-size: 2rem;
    }

    @media ${Device.mobileL} {
      margin-bottom: 2.5rem;

      font-size: 1.5rem;
    }
  }

  margin-bottom: 15rem;

  @media ${Device.mobileL} {
    margin-bottom: 5rem;
  }
`;

const ListSeparator = styled.div`
  width: 90%;
  height: 4rem;

  background-color: #ffffff;

  display: flex;

  @media ${Device.tabletL} {
    height: 3rem;
  }

  @media ${Device.mobileL} {
    height: 2rem;
  }
`;

const ListCategory = styled.div<{ active: boolean }>`
  width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  border: 1px solid #000000;

  background-color: ${props => (props.active ? '#000000' : '#ffffff')};

  color: ${props => (props.active ? '#ffffff' : '#000000')};
  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 2rem;

  @media ${Device.tabletL} {
    font-size: 1.5rem;
  }

  @media ${Device.mobileL} {
    font-size: 1rem;
  }
`;

const List = styled.div`
  width: 90%;

  display: flex;
  justify-content: space-evenly;

  display: grid;
  grid-template-columns: repeat(auto-fill, 14.25rem);
  grid-column-gap: 1rem;
  grid-row-gap: 2.5rem;

  justify-content: space-between;

  margin-top: 2.5rem;
  margin-bottom: 3rem;

  @media ${Device.tabletL} {
    grid-template-columns: repeat(auto-fill, 13.56rem);
    grid-column-gap: 1.41rem;
    grid-row-gap: 1.62rem;
  }

  @media ${Device.tabletL} {
    grid-template-columns: repeat(auto-fill, 13.56rem);
    grid-column-gap: 0.7rem;
    grid-row-gap: 1.62rem;
  }

  @media ${Device.mobileL} {
    grid-row-gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, 9.375rem);
    justify-content: space-evenly;
    margin-top: 1.25rem;
    margin-bottom: 1.5rem;
  }

  @media ${Device.mobileS} {
    grid-column-gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, 8.5rem);
  }
`;

const ListLine = styled.div`
  width: 49%;

  display: grid;
  grid-template-columns: repeat(auto-fill, 14rem);
  grid-column-gap: 0.5rem;
  grid-row-gap: 2.5rem;

  justify-content: space-between;

  margin-top: 2.5rem;
  margin-bottom: 3rem;

  @media ${Device.tabletL} {
    grid-template-columns: repeat(auto-fill, 13.56rem);
    grid-column-gap: 1.41rem;
    grid-row-gap: 1.62rem;
  }
  @media ${Device.mobileL} {
    grid-row-gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, 9.375rem);
    justify-content: space-evenly;
    margin-top: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const HTMainComponent: React.FC<
  HTMainMethod & HTMainProps & RouteComponentProps
> = ({ userName, accessToken, history }) => {
  const [category, setCategory] = useState<'l' | 'g'>('l');

  const LivingParticipantList = livingTeams.map((item, i) => {
    return <HTParticipantItem key={i} team={item} />;
  });

  const GameParticipantList = gameTeams.map((item, i) => {
    return <HTParticipantItem key={i} team={item} />;
  });

  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <span>한세톤이 종료되었습니다.</span>
        </TitleWrapper>
        <HTVideoComponent />
        <ListWrapper>
          <p>쉬어가는 참가자들</p>
          <ListSeparator>
            <ListCategory
              active={category === 'l'}
              onClick={() => setCategory('l')}
            >
              생활 부문
            </ListCategory>
            <ListCategory
              active={category === 'g'}
              onClick={() => setCategory('g')}
            >
              게임 부문
            </ListCategory>
          </ListSeparator>
          <List>
            {category === 'l' ? LivingParticipantList : GameParticipantList}
          </List>
        </ListWrapper>
        <ContentWrapper>
          <GroupImg src={GroupPicture} alt="group picture" />
          <ButtonWrapper>
            <div>
              <p>사진 보고 가세요!</p>
              <button onClick={() => alert('사진 링크')}>눌러보게</button>
            </div>
          </ButtonWrapper>
        </ContentWrapper>
        <HTSponsor />
      </Wrapper>
    </>
  );
};

export default HTMainComponent;
