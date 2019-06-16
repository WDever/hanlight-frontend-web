import * as React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  font-family: 'Spoqa Han Sans';
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Notice = styled.div`
  width: 80%;
  max-width: 74.65rem;
`;

const BoardUpsideWrapper = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2.22rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const TitleWrapper = styled.div``;

const Title = styled.div`
  font-size: 1.75rem;
  font-family: 'yg-jalnan';
  font-weight: bold;
`;

const TitleSub = styled.div`
  font-size: 1rem;
`;

const SearchWrapper = styled.div``;

const SearchInput = styled.input`
  width: 12.23rem;
  line-height: 2.4rem;
  padding: 0;
  opacity: 0.5;
  border: solid 1px #bebebe;
  font-size: 1.12rem;
`;

const SearchButton = styled.button`
  width: 3.775rem;
  height: 2.5rem;
  border: 0;
  padding: 0;
  font-size: 0.875rem;
  color: #ffffff;
  background-color: #000000;
`;

const Table = styled.table`
  width: 100%;
  border-top: 2px solid #000000;
  text-align: center;
  font-size: 0.875rem;
`;

const Tr = styled.tr<{ head?: boolean }>`
  height: 3.5rem;
  border: ${props => (props.head ? 'none' : 'solid 1px #d1d1d1')};
`;

const TdTitle = styled.td<{ new: boolean }>`
  text-align: left;
  color: ${props => (props.new ? '#4470ff' : 'initial')};
`;

const TdTitleNew = styled.span`
  color: #ff4444;
  margin-left: 0.5rem;
`;

const TdPk = styled.td`
  width: 4.25rem;
`;

const TdPkString = styled.p`
  width: 3rem;
  line-height: 1.5rem;
  border-radius: 4px;
  border: solid 1px #4470ff;
  font-size: 0.75rem;
  color: #003cff;
  margin: auto;
`;

const TdCreatedAt = styled.td`
  width: 8rem;
`;

const PageNavigationWrapper = styled.div`
  width: 100%;
  margin-top: 2.375rem;
  margin-bottom: 7rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageNavigation = styled.div`
  width: 26.25rem;
  font-size: 0.875rem;

  display: flex;
  justify-content: space-between;
`;

const Page = styled.p<{ current?: boolean }>`
  color: ${props => (props.current ? '#4470ff' : '#000000')};
  font-weight: ${props => (props.current ? 'bold' : 'normal')};
`;

export default class NoticeComponent extends React.Component {
  public render() {
    return (
      <Wrapper>
        <Notice>
          <BoardUpsideWrapper>
            <TitleWrapper>
              <Title>공지사항</Title>
              <TitleSub>오늘의 공지사항을 확인해주세요!</TitleSub>
            </TitleWrapper>
            <SearchWrapper>
              <SearchInput />
              <SearchButton>검색</SearchButton>
            </SearchWrapper>
          </BoardUpsideWrapper>
          <Table>
            <thead>
              <Tr head={true}>
                <th>글번호</th>
                <th>제목</th>
                <th>작성일</th>
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <TdPk>
                  <TdPkString>1</TdPkString>
                </TdPk>
                <TdTitle new={true}>
                  다음주에 열리는 체육대회에 관한 공지사항입니다.
                  <TdTitleNew>NEW</TdTitleNew>
                </TdTitle>
                <TdCreatedAt>2019.06.02</TdCreatedAt>
              </Tr>
              <Tr>
                <TdPk>
                  <TdPkString>2</TdPkString>
                </TdPk>
                <TdTitle new={true}>
                  복장위반 공지사항 <TdTitleNew>NEW</TdTitleNew>
                </TdTitle>
                <TdCreatedAt>2019.06.02</TdCreatedAt>
              </Tr>
              <Tr>
                <TdPk>
                  <TdPkString>3</TdPkString>
                </TdPk>
                <TdTitle new={false}>
                  복장위반 공지사항인데 지금 새벽이고 치킨을 시켰는데 4강을 하고
                  있고 존나 피곤하다. 내일 학교를 가는데 사실 오늘이지만 무튼
                  졸업사진 준비를 하기로 했다.
                </TdTitle>
                <TdCreatedAt>2019.06.02</TdCreatedAt>
              </Tr>
              {Array(8)
                .fill(null)
                .map(() => (
                  <Tr>
                    <td />
                    <td />
                    <td />
                  </Tr>
                ))}
            </tbody>
          </Table>
          <PageNavigationWrapper>
            <PageNavigation>
              {Array(9)
                .fill(null)
                .map((_, i) => (
                  <Page current={i === 0}>{i + 1}</Page>
                ))}
              <Page>다음></Page>
            </PageNavigation>
          </PageNavigationWrapper>
        </Notice>
      </Wrapper>
    );
  }
}
