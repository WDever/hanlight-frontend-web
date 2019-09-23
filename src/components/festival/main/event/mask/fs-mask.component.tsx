import * as React from 'react';

import { DefaultBoxOpacity } from 'lib/styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { festivalActions, festivalReducerActions } from 'store';
import styled from 'styled-components';

const Wrapper = styled.article`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 0.625rem;
`;

const NameBox = styled.section`
  width: 14.75rem;
  height: 2.875rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.375rem;

  background-color: ${DefaultBoxOpacity};

  h1 {
    font-family: 'yg-jalnan';
    font-size: 0.875rem;
    color: #e4e4e4;

    margin: 0;
  }
`;

const VoteBtn = styled.button<{ voted: boolean }>`
  width: 5rem;
  height: 2.875rem;

  font-family: 'Spoqa Han Sans';
  font-size: 13px;
  font-weight: bold;
  color: #454545;

  border-radius: 0.375rem;

  background-color: ${({ voted, disabled }) =>
    voted && disabled ? '#9f69e0' : disabled ? '#818181' : '#6488ff'};

  border: none;
  outline: none;
`;

const NotNowBox = styled.section`
  width: 100%;
  min-height: 15.625rem;

  border-radius: 0.375rem;

  background-color: ${DefaultBoxOpacity};

  margin-top: 0.625rem;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: 'yg-jalnan';
    font-size: 1rem;
    color: #e4e4e4;

    span {
      color: #ff5677;
    }
  }
`;

const ExData = [
  { name: '짧게는 이정도 길이', key: 0 },
  { name: '길어봤자 띄어쓰기 하면 이정도', key: 1 },
  { name: '별로 안답답해보이지 않나?', key: 2 },
  { name: '나 남소 받았다', key: 3 },
  { name: '얘 완전 귀여움ㅋㅋㅋㅋ', key: 4 },
];

const ExData2 = 0;
const isVoted = true;

const FSMaskComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();

  const available = 9000 <= Number(moment().format('Hmmss'));

  const participantList = ExData.map((item, i) => (
    <Wrapper key={i}>
      <NameBox>
        <h1>{item.name}</h1>
      </NameBox>
      <VoteBtn
        voted={item.key === ExData2}
        disabled={isVoted}
        onClick={() =>
          dispatch(
            festivalActions.toggleModal({
              status: true,
              data: {
                type: 'mask',
                content: item.name,
                acceptEvent: () => alert(`${item.name}에게 투표`),
              },
            }),
          )
        }
      >
        {item.key === ExData2 && isVoted ? '투표완료' : '투표하기'}
      </VoteBtn>
    </Wrapper>
  ));

  return (
    <>
      {available ? (
        participantList
      ) : (
        <NotNowBox>
          <h1>
            지금은 복면가왕 투표 시간이 <span>아닙니다.</span>
          </h1>
        </NotNowBox>
      )}
    </>
  );
};

export default FSMaskComponent;
