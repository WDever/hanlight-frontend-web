import * as React from 'react';

import Poster from 'lib/png/festival-poster@3x.png';
import ActiveLoLIcon from 'lib/png/lol-active-icon@3x.png';
import LoLIcon from 'lib/png/lol-icon@3x.png';
import { CompletelyBoxOpacity, DefaultBoxOpacity } from 'lib/styles';
import ActiveEventIcon from 'lib/svg/event-active-icon.svg';
import EventIcon from 'lib/svg/event-icon.svg';
import ActiveTimeTableIcon from 'lib/svg/fs-timetable-active-icon.svg';
import TimeTableIcon from 'lib/svg/fs-timetable-icon.svg';
import ActiveGraphIcon from 'lib/svg/graph-active-icon.svg';
import GraphIcon from 'lib/svg/graph-icon.svg';
import CoinIcon from 'lib/svg/woncoin.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppState,
  UserModel,
} from 'store';
import styled from 'styled-components';

import EsportsComponent from './eSports';
import FSEventComponent from './event';
import FSSalesComponent from './sales';
import FSTimetableComponent from './timetable';

const { useState, useMemo } = React;

const Template = styled.div`
  width: 100%;
  min-height: calc(100vh - 3.75rem);

  display: flex;
  justify-content: center;
`;

const Wrapper = styled.article`
  width: 91%;
  min-width: 20.5rem;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const FestivalTitle = styled.h2`
  font-size: 0.875rem;
  font-family: 'Spoqa Han Sans';
  color: #b1b1b1;

  margin: 0;
  margin-top: 25px;
`;

const Welcome = styled.h1`
  font-size: 1.125rem;
  font-family: 'Spoqa Han Sans';
  color: #e4e4e4;

  margin: 0;
  margin-bottom: 0.625rem;

  span {
    font-size: 1.25rem;
    font-weight: bold;
    color: #ffffff;
  }
`;

const PayBox = styled.section`
  width: 100%;
  height: 3.125rem;

  background-color: ${DefaultBoxOpacity};

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 0.375rem;

  margin-bottom: 1rem;

  h1 {
    font-family: 'yg-jalnan';
    font-size: 1rem;
    color: #e4e4e4;

    height: 100%;

    margin: 0;
    margin-left: 1.25rem;

    display: flex;
    align-items: center;

    img {
      width: 1.25rem;
      height: 1.25rem;

      margin-right: 0.5rem;
    }

    span {
      margin-top: 0.2rem;
    }
  }
`;

const PayBtnWrapper = styled.section`
  display: flex;

  margin-right: 1.25rem;
`;

const PayBtn = styled(Link)<{ left: boolean }>`
  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  color: #e4e4e4;
  text-decoration: none;

  border: none;
  outline: none;

  background-color: transparent;

  height: 100%;

  margin: 0;
  margin-right: ${({ left }) => (left ? '1.375rem' : '0')};
`;

const BtnWrapper = styled.section`
  width: 100%;

  display: flex;

  margin-bottom: 15px;

  background-color: ${CompletelyBoxOpacity};
`;

const Btn = styled.button<{ selected: boolean }>`
  width: calc(100% / 4);
  height: 5.125rem;

  border: none;
  outline: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #e4e4e4;

  img {
    height: 2rem;

    margin-bottom: 5px;
  }

  background-color: ${({ selected }) =>
    selected ? CompletelyBoxOpacity : DefaultBoxOpacity};

  :first-of-type {
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
  }

  :last-of-type {
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }
`;

const PosterWrapper = styled.div`
  width: 100%;

  border-radius: 0.375rem;

  background-color: ${DefaultBoxOpacity};

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 17.9375rem;
    height: 25.25rem;

    margin: 1.25rem;
  }
`;

type btnType = '' | 'lol' | 'timetable' | 'event' | 'sales';

interface BtnDataType {
  name: string;
  key: btnType;
  img: string;
  activeImg: string;
}

const BtnData: BtnDataType[] = [
  { name: '한챔스', key: 'lol', img: LoLIcon, activeImg: ActiveLoLIcon },
  {
    name: '타임테이블',
    key: 'timetable',
    img: TimeTableIcon,
    activeImg: ActiveTimeTableIcon,
  },
  { name: '이벤트', key: 'event', img: EventIcon, activeImg: ActiveEventIcon },
  { name: '매출', key: 'sales', img: GraphIcon, activeImg: ActiveGraphIcon },
];

const FSMainComponent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<btnType>('');

  const { name } = useSelector<AppState, UserModel>(state => state.user);

  const BtnList = useMemo(
    () =>
      BtnData.map((item, idx) => (
        <Btn
          onClick={() => {
            if (selectedItem !== item.key) {
              setSelectedItem(item.key);
            } else {
              setSelectedItem('');
            }
          }}
          selected={selectedItem === item.key}
          key={idx}
        >
          <img
            src={selectedItem === item.key ? item.activeImg : item.img}
            alt="each icon"
          />
          {item.name}
        </Btn>
      )),
    [selectedItem, setSelectedItem],
  );

  return (
    <Template>
      <Wrapper>
        <FestivalTitle>한세 어울림 한마당</FestivalTitle>
        <Welcome>
          <span>{name}</span>님, 즐거운 축제 되세요 :)
        </Welcome>
        <PayBox>
          <h1>
            <img src={CoinIcon} alt="coin" />
            <span>30000</span>
          </h1>
          <PayBtnWrapper>
            <PayBtn
              to={{
                pathname: '/festival/pay',
                state: {
                  pay: true,
                },
              }}
              left={true}
            >
              결제
            </PayBtn>
            <PayBtn
              to={{
                pathname: '/festival/charge',
                state: {
                  pay: true,
                },
              }}
              left={false}
            >
              충전
            </PayBtn>
          </PayBtnWrapper>
        </PayBox>
        <BtnWrapper>{BtnList}</BtnWrapper>
        {selectedItem === 'lol' ? (
          <EsportsComponent />
        ) : selectedItem === 'timetable' ? (
          <FSTimetableComponent />
        ) : selectedItem === 'event' ? (
          <FSEventComponent />
        ) : selectedItem === 'sales' ? (
          <FSSalesComponent />
        ) : (
          <PosterWrapper>
            <img src={Poster} alt="hansei festival poster" />
          </PosterWrapper>
        )}
      </Wrapper>
    </Template>
  );
};

export default FSMainComponent;
