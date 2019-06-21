import * as React from 'react';

import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  /* height: 2.5rem; */
  min-height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 2.5rem;
  margin-right: 0.75rem;
  vertical-align: middle;
`;

const Form = styled.form`
  width: calc(100% - 3rem);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: calc(100% - 4.5rem);
    min-height: 2rem;
    border-radius: 8px;
    border: solid 1px #d3d3d3;
    background-color: #f2f3f5;
    margin-bottom: 0.5rem;
    font-size: 0.8125rem;
    text-indent: 0.5rem;
  }

  button {
    width: 3.5rem;
    height: 2rem;
    border-radius: 0.5rem;
    background-color: #4470ff;
    font-family: 'spoqa han sans';
    font-weight: bold;
    font-size: 0.75rem;
    color: #e9ebee;
    margin-bottom: 0.5rem;
    cursor: pointer;
    outline: none;
    border: none;
  }
`;

const BoardCommentsForm: React.FC = () => {
  return (
    <Wrapper>
      <ProfileImg src={DefaultProfileImage} alt="Profile" />
      <Form>
        <input type="text" />
        <button>입력</button>
      </Form>
    </Wrapper>
  );
};

export default BoardCommentsForm;
