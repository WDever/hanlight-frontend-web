import * as React from 'react';

import ActiveStamp from 'lib/png/active-stamp@3x.png';
import EmptyStamp from 'lib/png/empty-stamp@3x.png';
import { DefaultBoxOpacity } from 'lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;

  background-color: ${DefaultBoxOpacity};

  border-radius: 0.375rem;

  display: flex;
`;

const StampWrapper = styled(Wrapper)`
  justify-content: center;
  margin-top: 0.625rem;

  img {
    width: 2.75rem;
    height: 3.375rem;

    margin: 15px 8.5px;

    :first-of-type {
      margin-left: 17px;
    }

    :last-of-type {
      margin-right: 17px;
    }
  }
`;

const ContentWrapper = styled(Wrapper)`
  flex-direction: column;
  margin-top: 15px;

  p {
    font-family: 'Spoqa Han Sans';
    font-size: 13px;
    color: #e4e4e4;

    margin: 3px 0 3px 0.625rem;

    :first-of-type {
      margin-top: 0.625rem;
    }

    :last-of-type {
      margin-bottom: 0.625rem;
    }

    span {
      font-weight: bold;
    }
  }
`;

const EX_STAMP_COUNT = 2;

const FSSTampComponent: React.FC = () => {
  const StampList = [...Array(5)].map((item, i) => (
    <img
      key={i}
      src={i + 1 <= EX_STAMP_COUNT ? ActiveStamp : EmptyStamp}
      alt="stamp"
    />
  ));

  return (
    <>
      <StampWrapper>{StampList}</StampWrapper>
      <ContentWrapper>
        <p>
          <span>Step1)</span> 부스에 참여하고 도장을 발급당한다.
        </p>
        <p>
          <span>Step2)</span> 도장 5개를 모아서 응모당한다.
        </p>
        <p>
          <span>Step3)</span> 추첨을 통해 당첨당하면 문화상품권.
        </p>
      </ContentWrapper>
    </>
  );
};

export default FSSTampComponent;
