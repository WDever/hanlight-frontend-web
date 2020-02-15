import * as React from 'react';

import {
  NoticeListMethod,
  NoticeListProps,
} from 'container/notice/detail-notice/detail-noticeList';
import { Device } from 'lib/styles';
import moment from 'moment';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
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

  @media ${Device.mobileL} {
    width: 90%;
  }
`;

const BoardUpsideWrapper = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2.22rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  @media ${Device.tabletL} {
    margin-top: 3.53rem;
    margin-bottom: 2.01rem;
  }
  @media ${Device.mobileL} {
    margin-top: 2.78rem;
    margin-bottom: 1.03rem;
  }
`;

const TitleWrapper = styled.div``;

const Title = styled.div`
  font-size: 1.75rem;
  font-family: 'yg-jalnan';
  font-weight: bold;
  white-space: nowrap;

  @media ${Device.mobileL} {
    font-size: 1rem;
  }
`;

const TitleSub = styled.div`
  font-size: 1rem;

  @media ${Device.tabletS} {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
`;

const SearchInput = styled.input`
  width: 12.23rem;
  line-height: 2.4rem;
  padding: 0;
  opacity: 0.5;
  border: solid 1px #bebebe;
  font-size: 1.12rem;
  border-radius: 0;

  @media ${Device.tabletL} {
    width: 100%;
    max-width: 13.39rem;
    line-height: 2.9rem;
    border: solid 0.5px #bebebe;
  }
  @media ${Device.mobileL} {
    width: 6.82rem;
    line-height: 1.4rem;
  }
`;

const SearchButton = styled.button`
  width: 3.775rem;
  height: 2.5rem;
  border: 0;
  padding: 0;
  font-size: 0.875rem;
  color: #ffffff;
  background-color: #000000;
  cursor: pointer;

  @media ${Device.tabletL} {
    width: 3.64rem;
    height: 3rem;
    font-size: 1.1rem;
  }
  @media ${Device.mobileL} {
    width: 1.85rem;
    height: 1.5rem;
    font-size: 0.63rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-top: 2px solid #000000;
  text-align: center;
  font-size: 0.875rem;
  table-layout: fixed;

  @media ${Device.tabletL} {
    font-size: 1.1rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.63rem;
  }
`;

const PkCol = styled.col`
  width: 4.525rem;

  @media ${Device.mobileL} {
    width: 2.875rem;
  }
`;

const TitleCol = styled.col``;

const DateCol = styled.col`
  width: 7rem;

  @media ${Device.mobileL} {
    width: 4rem;
  }
`;

const Tr = styled.tr<{ head?: boolean }>`
  height: 3.5rem;
  border: ${props => (props.head ? 'none' : 'solid 1px #d1d1d1')};
  cursor: pointer;

  th {
    font-weight: normal;
  }

  @media ${Device.mobileL} {
    height: 3rem;
  }
`;

const TdTitle = styled.td<{ new: boolean }>`
  text-align: left;
  color: ${props => (props.new ? '#4470ff' : '#000000')};
  vertical-align: middle;
  white-space: nowrap;
`;

const TdTitleStr = styled.span<{ new: boolean }>`
  max-width: ${props => (props.new ? '90%' : '100%')};
  line-height: calc(1.5rem + 2px);
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 0.5rem;

  @media ${Device.tabletL} {
    max-width: ${props => (props.new ? '85%' : '100%')};
  }
  @media ${Device.tabletS} {
    max-width: ${props => (props.new ? '80%' : '100%')};
  }
  @media ${Device.mobileL} {
    line-height: calc(1rem + 2px);
    margin-left: 0;
  }
  @media ${Device.mobileS} {
    max-width: ${props => (props.new ? '84%' : '100%')};
  }
`;

const TdTitleNew = styled.span`
  color: #ff4444;
  line-height: calc(1.5rem + 2px);
  margin-left: 0.5rem;

  @media ${Device.mobileL} {
    line-height: calc(1rem + 2px);
    margin-left: 0.25rem;
  }
`;

const TdPk = styled.td``;

const TdPkString = styled.p`
  width: 3rem;
  line-height: 1.5rem;
  border-radius: 0.25rem;
  border: solid 1px #4470ff;
  font-size: inherit;
  color: #003cff;
  margin: auto;

  @media ${Device.mobileL} {
    width: 1.6rem;
    line-height: 1rem;
    font-size: 0.5rem;
  }
`;

const TdCreatedAt = styled.td`
  width: 8rem;
  line-height: calc(1.5rem + 2px);

  @media ${Device.mobileL} {
    line-height: calc(1rem + 2px);
  }
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
  width: 29.25rem;
  font-size: 0.875rem;

  display: flex;
  justify-content: center;

  @media ${Device.tabletL} {
    width: 100%;
    font-size: 1.1rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.63rem;
  }
`;

const Page = styled(Link)<{ current: boolean }>`
  color: ${props => (props.current ? '#4470ff' : '#000000')};
  font-weight: ${props => (props.current ? 'bold' : 'normal')};
  margin-right: 2rem;
  cursor: pointer;
  text-decoration: none;
`;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;

interface NoticeListState {
  page: number;
  title?: string;
}

export default class NoticeListComponent extends React.Component<
  NoticeListProps & NoticeListMethod & RouteComponentProps
> {
  public state: NoticeListState = {
    page: 1,
    title: undefined,
  };

  public componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const page = query.page ? parseInt(query.page.toString(), 10) : 1;
    const title = query.title ? query.title.toString() : undefined;

    this.setState({
      page,
      title,
    });

    this.props.getNoticeList({
      accessToken: this.props.accessToken,
      page,
      title,
    });
  }

  public componentDidUpdate(
    prevProps: NoticeListProps & NoticeListMethod & RouteComponentProps,
    prevState: NoticeListState,
  ) {
    const query = queryString.parse(this.props.location.search);
    const page = query.page ? parseInt(query.page.toString(), 10) : 1;
    const title = query.title ? query.title.toString() : undefined;

    if (
      this.state.page !== page &&
      this.props.getNoticeListStatus !== 'pending'
    ) {
      this.setState({
        page,
        title,
      });

      this.props.getNoticeList({
        accessToken: this.props.accessToken,
        page,
        title,
      });
    } else if (
      page !== 1 &&
      prevProps.getNoticeListStatus === 'pending' &&
      this.props.getNoticeListStatus === 'success' &&
      !this.props.noticeList[0]
    ) {
      this.props.history.push('/notice?page=1');
    }
  }

  public newCheck = (date: string): boolean =>
    moment().valueOf() - moment(date).valueOf() < hour * 24;

  public handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      title: e.currentTarget.value,
    });

  public search = () => {
    this.props.history.push(`/notice?page=1&title=${this.state.title || ''}`);
    this.setState({ page: 0 });
  };

  public render() {
    const {
      getNoticeListStatus,
      noticeList,
      noticeCount,
      history,
    } = this.props;
    const { page, title } = this.state;
    const { newCheck, handleInput, search } = this;

    const tBody = Array(10)
      .fill(null)
      .map((_, i) => {
        const notice = noticeList[i];
        if (notice) {
          const NEW = newCheck(notice.createdAt);
          return (
            <Tr key={i} onClick={() => history.push(`/notice/${notice.pk}`)}>
              <TdPk>
                <TdPkString>{notice.pk}</TdPkString>
              </TdPk>
              <TdTitle new={NEW}>
                <TdTitleStr new={NEW}>{notice.title}</TdTitleStr>
                {NEW && <TdTitleNew>NEW</TdTitleNew>}
              </TdTitle>
              <TdCreatedAt>
                {moment(notice.createdAt).format('YYYY.MM.DD')}
              </TdCreatedAt>
            </Tr>
          );
        }
        return (
          <Tr key={i}>
            <td />
            <td />
            <td />
          </Tr>
        );
      });
    const phazeCount = Math.ceil(Math.ceil(noticeCount / 10) / 9);
    const phaze =
      phazeCount -
        Math.floor(noticeCount / ((Math.floor(page / 10) * 10 + 1) * 90)) || 1;
    const pagesCount =
      noticeCount <= 90
        ? Math.ceil(noticeCount / 10)
        : noticeCount / (90 * phaze) >= 1
        ? 9
        : Math.ceil((noticeCount - (Math.floor(page / 10) * 100 - 10)) / 10);

    return getNoticeListStatus === 'success' ? (
      <Wrapper>
        <Notice>
          <BoardUpsideWrapper>
            <TitleWrapper>
              <Title>공지사항</Title>
              <TitleSub>오늘의 공지사항을 확인해주세요!</TitleSub>
            </TitleWrapper>
            <SearchWrapper>
              <SearchInput value={this.state.title} onChange={handleInput} />
              <SearchButton onClick={search}>검색</SearchButton>
            </SearchWrapper>
          </BoardUpsideWrapper>
          <Table>
            <colgroup>
              <PkCol />
              <TitleCol />
              <DateCol />
            </colgroup>
            <thead>
              <Tr head>
                <th>글번호</th>
                <th>제목</th>
                <th>작성일</th>
              </Tr>
            </thead>
            <tbody>{tBody}</tbody>
          </Table>
          <PageNavigationWrapper>
            <PageNavigation>
              {phaze > 1 && (
                <Page
                  current={false}
                  to={`/notice?page=${page - 1}${
                    title ? `&title=${title}` : ''
                  }`}
                >
                  {'<이전'}
                </Page>
              )}
              {Array(pagesCount || 1)
                .fill(null)
                .map((_, i) => {
                  const to = i + ((phaze - 1) * 10 || 1);

                  return (
                    <Page
                      key={i}
                      current={to === page}
                      to={`/notice?page=${to}${title ? `&title=${title}` : ''}`}
                    >
                      {to}
                    </Page>
                  );
                })}
              {phazeCount - phaze > 0 && (
                <Page
                  current={false}
                  style={{ marginRight: 0 }}
                  to={`/notice?page=${Math.ceil(page / 10) * 10}${
                    title ? `&title=${title}` : ''
                  }`}
                >
                  다음>
                </Page>
              )}
            </PageNavigation>
          </PageNavigationWrapper>
        </Notice>
      </Wrapper>
    ) : (
      <Wrapper style={{ height: '100%' }} />
    );
  }
}
