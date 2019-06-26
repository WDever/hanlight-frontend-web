import * as React from 'react';

import {
  BoardReportMethod,
  BoardReportOwnProps,
  BoardReportProps,
} from 'container/board/report';
import { useInput } from 'lib/hooks';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  /* height: ${window.innerHeight}px; */
  /* height: ${window.scrollY}; */
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  width: 100%;
  min-width: 475px;
  max-width: 700px;
  min-height: 13.375rem;
  margin-right: 1.25rem;
  position: absolute;
  /* top: 8.5rem; */
  top: 30%;
  z-index: 9;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #d1d1d1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Head = styled.div`
  width: 100%;
  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  background-color: #ffffff;
  border-bottom: solid 1px #e5e5e5;
  min-height: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FeedXButton = styled.span`
  position: absolute;
  right: 11px;
  height: 10px;
  width: 19px;
  /* height: 2px;
  width: 30px; */
  border-radius: 1.25rem;
  top: 17px;

  cursor: pointer;

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &::before,
  &::after {
    height: 2px;
    width: 19px;
    position: absolute;
    content: ' ';
    border-radius: 1.25rem;
    background-color: #9b9b9b;
  }
`;

const Title = styled.span`
  margin-left: 1.5rem;
`;

const Form = styled.form`
  width: 90%;
  height: 11rem;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  textarea {
    min-height: 73.07%;
    font-size: 0.875rem;
    width: 100%;
    outline: none;
    resize: none;
    border: none;
    padding: 0;
    border-bottom: solid 1px #e5e5e5;
  }

  button {
    width: 6.875rem;
    height: 2rem;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #4470ff;
    border-radius: 1rem;
    color: #e9ebee;
    font-size: 0.875rem;
    font-weight: bold;
    margin-bottom: 0.57rem;
    cursor: pointer;
  }
`;

const BoardReportComponent: React.FC<
  BoardReportProps & BoardReportMethod & BoardReportOwnProps
> = ({
  accessToken,
  reportData,
  report,
  reportActive,
  deemBoard,
  reportStatus,
  setReportToggle,
}) => {
  const [content, setContent] = useInput('');

  const submitReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reportData.type === 'board') {
      report({
        accessToken,
        type: reportData.type,
        board_pk: reportData.board_pk,
        content,
      });
    } else if (reportData.type === 'comment') {
      report({
        accessToken,
        type: reportData.type,
        board_pk: reportData.board_pk,
        comment_pk: reportData.comment_pk,
        content,
      });
    }
  };

  const close = () => {
    deemBoard(false);
    setReportToggle(false);
    reportActive({ active: false, type: 'none', board_pk: 0, comment_pk: 0 });
  };

  React.useEffect(() => {
    if (reportStatus === 'success') {
      close();
      alert('신고 성공');
    } else if (reportStatus === 'failure') {
      alert('신고 실패');
    }
  }, [reportStatus]);

  return (
    <>
      {reportData.active ? (
        <ModalWrapper>
          <Head>
            <Title>작성자 신고하기</Title>
            <FeedXButton onClick={close} />
          </Head>
          <Form onSubmit={submitReport}>
            <textarea
              minLength={1}
              maxLength={300}
              autoFocus={true}
              placeholder="신고사유를 작성해주세요. (최대 300자)  ex)풍기문란, 욕설, 성희롱"
              onChange={setContent}
            />
            <button>신고하기</button>
          </Form>
        </ModalWrapper>
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(BoardReportComponent);
