import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 88%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreateBtn = styled.button`
  color: #ffffff;
  background-color: #bdbdbd;
  margin-top: 1.5rem;
`;

const CommonBtn = styled.button`
  background-color: #ffffff;
  margin-top: 2rem;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 10.625rem;
    height: 13.625rem;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.08);
    border-radius: 0.25rem;
    outline: none;
    border: none;

    font-family: 'yg-jalnan';
    font-size: 0.875rem;
  }
`;

const JoinComponent: React.FC = () => {
  return (
    <Wrapper>
      <Form>
        <CreateBtn>팀 생성</CreateBtn>
        <CommonBtn>팀 참가</CommonBtn>
        <CommonBtn style={{ marginBottom: '3.125rem' }}>팀 매칭</CommonBtn>
      </Form>
    </Wrapper>
  );
};

export default JoinComponent;
