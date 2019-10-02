import * as React from 'react';

import { usePrevious } from 'lib/hooks';
import { CompletelyBoxOpacity, DefaultBoxOpacity } from 'lib/styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  ErrorModel,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  FSTimetableModel,
  UserModel,
} from 'store';
import styled from 'styled-components';

const { useState, useEffect } = React;

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

const TimetableTitle = styled.h1`
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

const FSTimetableComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { getFsTimetable } = festivalActions;

  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { message: errorMessage } = useSelector<AppState, ErrorModel>(
    state => state.error,
  );
  const { festivalStatus, fsTimetable } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );

  const { getFsTimetableStatus } = festivalStatus;

  const [period, setPeriod] = useState<number>(1);
  const prevStatus = usePrevious({ getFsTimetableStatus });

  const timetable = [...Array(3)].map((item, i) => (
    <>
      <TimetableTitle>{i + 1}부</TimetableTitle>
      <TableWrapper>
        <TimetableGrid>
          {fsTimetable.map((val: FSTimetableModel, idx: number) => {
            const time = val.time.split('~').map(str => str.trim());
            const now = moment(moment().format('kk : mm')).isBetween(
              moment(time[0], 'kk : mm'),
              moment(time[1], 'kk : mm'),
            );

            if (val.part !== i + 1) {
              return;
            }

            return (
              <>
                <ActivableDiv now={now}>{val.time}</ActivableDiv>
                <ActivableDiv now={now}>{val.detail}</ActivableDiv>
              </>
            );
          })}
        </TimetableGrid>
      </TableWrapper>
    </>
  ));

  useEffect(() => {
    dispatch(getFsTimetable({ accessToken }));
  }, [accessToken]);

  useEffect(() => {
    if (
      prevStatus &&
      prevStatus.getFsTimetableStatus === 'pending' &&
      getFsTimetableStatus === 'failure'
    ) {
      alert(errorMessage);
    }
  }, [prevStatus, getFsTimetableStatus]);

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
      {period === 1 && (
        <>
          {timetable[0]}
          {timetable[1]}
        </>
      )}
      {period === 2 && timetable[2]}
    </Wrapper>
  );
};

export default FSTimetableComponent;
