import * as React from 'react';

import { CompletelyBoxOpacity, DefaultBoxOpacity } from 'lib/styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const { useState } = React;

const Wrapper = styled.article`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SeparatorWrapper = styled.div`
  width: 100%;
`;

const SeparatorBtn = styled.button<{ active: boolean }>`
  width: 50%;

  background-color: ${CompletelyBoxOpacity};

  font-size: 0.875rem;
  font-weight: bold;
  font-family: 'Spoqa Han Sans';
  color: #e4e4e4;

  border: none;
  border-bottom: ${({ active }) =>
    active ? 'solid 2px #6488ff' : 'solid 2px transparent'};
  outline: none;
`;

const TimetablaTitle = styled.h1`
  font-size: 0.875rem;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  color: #e4e4e4;

  width: 100%;

  margin: 0.625rem 0 5px 0;
`;

const TableWrapper = styled.section`
  width: 100%;

  border-radius: 0.375rem;

  display: flex;
  justify-content: center;

  font-family: 'Spoqa Han Sans';
  font-size: 13px;
  color: #b1b1b1;

  background-color: ${DefaultBoxOpacity};
`;

const TimetableGrid = styled.article`
  width: calc(100% - 1.25rem);

  display: grid;
  grid-template-columns: 5.875rem auto;
  grid-column-gap: 1.25rem;
  grid-row-gap: 3px;

  margin: 0.625rem;

  p {
    margin: 0;
  }
`;

const ActivableDiv = styled.div<{ now: boolean }>`
  color: ${({ now }) => (now ? '#90aaff' : 'inherit')};
`;

interface TableItemType {
  period: number;
  content: Array<{
    time: string;
    activity: string;
  }>;
}

const firstData: TableItemType[] = [
  {
    period: 1,
    content: [
      {
        time: '08 : 40 ~ 08 : 50',
        activity: '개회식',
      },
      {
        time: '08 : 50 ~ 09 : 00',
        activity: '반별 부스 홍보',
      },
      {
        time: '09 : 00 ~ 09 : 10',
        activity: '전자화폐 사용 방법 설명',
      },
      {
        time: '09 : 10 ~ 09 : 20',
        activity: '교장님 말씀',
      },
    ],
  },
  {
    period: 2,
    content: [
      {
        time: '09 : 20 ~ 12 : 00',
        activity: '반별 부스 활동',
      },
      {
        time: '12 : 00 ~ 12 : 30',
        activity: '교실 정돈',
      },
      {
        time: '12 : 30 ~ 13 : 20',
        activity: '점심시간',
      },
    ],
  },
];

const secondData: TableItemType[] = [
  {
    period: 3,
    content: [
      {
        time: '13 : 20 ~ 13 : 40',
        activity: '장기자랑',
      },
      {
        time: '13 : 30 ~ 14 : 00',
        activity: '패션쇼',
      },
      {
        time: '14 : 00 ~ 14 : 05',
        activity: '패션쇼 평가 및 수상',
      },
      {
        time: '14 : 05 ~ 14 : 15',
        activity: '찬조 1팀 공연',
      },
      {
        time: '14 : 15 ~ 15 : 00',
        activity: '한챔스 결승',
      },
      {
        time: '15 : 00 ~ 15 : 05',
        activity: '한챔스 우승 소감 발표',
      },
      {
        time: '15 : 05 ~ 15 : 30',
        activity: '복면가왕',
      },
      { time: '15 : 30 ~ 15 : 35', activity: '복면가왕 우승자 발표' },
      {
        time: '15 : 35 ~ 15 : 45',
        activity: '찬조 2팀 공연',
      },
      {
        time: '15 : 45 ~ 16 : 10',
        activity: '밴드부',
      },
      {
        time: '16 : 10 ~ 16 : 20',
        activity: '시상식 및 폐회식',
      },
      {
        time: '16 : 20 ~ 16 : 30',
        activity: '종례 및 귀가',
      },
    ],
  },
];

const FSTimetableComponent: React.FC = () => {
  const [period, setPeriod] = useState<number>(1);

  const timetableFunc = (
    item: TableItemType,
    i: number,
    org: TableItemType[],
  ) => (
    <>
      <TimetablaTitle>{item.period}부</TimetablaTitle>
      <TableWrapper>
        <TimetableGrid>
          {item.content.map((val, idx) => {
            const time = val.time.split('~').map(str => str.trim());

            const now = moment(moment().format('kk : mm')).isBetween(
              moment(time[0], 'kk : mm'),
              moment(time[1], 'kk : mm'),
            );

            return (
              <>
                <ActivableDiv now={now}>{val.time}</ActivableDiv>
                <ActivableDiv now={now}>{val.activity}</ActivableDiv>
              </>
            );
          })}
        </TimetableGrid>
      </TableWrapper>
    </>
  );

  const timetable = [
    firstData.map(timetableFunc),
    secondData.map(timetableFunc),
  ];

  return (
    <Wrapper>
      <SeparatorWrapper>
        <SeparatorBtn onClick={() => setPeriod(1)} active={period === 1}>
          1~2부
        </SeparatorBtn>
        <SeparatorBtn onClick={() => setPeriod(2)} active={period === 2}>
          3부
        </SeparatorBtn>
      </SeparatorWrapper>
      {timetable[period - 1]}
    </Wrapper>
  );
};

export default FSTimetableComponent;
