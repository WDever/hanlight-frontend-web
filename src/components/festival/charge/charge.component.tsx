import * as React from 'react';

import DarkLogoSvg from 'lib/png/dark-logo@3x.png';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import styled from 'styled-components';
import FSHeaderComponent from '../header';

const { useState, useEffect } = React;

const Template = styled.article<{ state: TransitionStatus }>`
  width: 100%;
  min-height: 100vh;

  transform: translateY(
    ${({ state }) =>
      state === 'entering' || state === 'entered' ? '0' : '100%'}
  );

  background-color: #313131;

  transition: 0.3s;

  position: absolute;
  top: 0;
  z-index: 11;

  display: flex;
  justify-content: center;
`;

const Wrapper = styled.section`
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  width: calc(100% - 2rem);

  font-family: 'yg-jalnan';
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.87);

  margin: 4.75rem 0 0 0;
`;

const QrImg = styled.img`
  width: 8rem;
  height: 8rem;

  margin: 5.125rem 0 1.5rem 0;
`;

const Name = styled.h1`
  margin: 0;

  font-family: 'Spoqa Han Sans';
  font-size: 1.25rem;
  font-weight: normal;
  color: rgba(255, 255, 255, 0.87);
`;

const Txt = styled.h2`
  margin: 2.5rem 0 0 0;

  font-family: 'Spoqa Han Sans';
  font-size: 1.25rem;
  font-weight: normal;
  color: rgba(255, 255, 255, 0.6);

  text-align: center;
`;

const ChargeEndWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3.75rem;

  position: absolute;
  top: 0%;

  background-color: #313131;

  z-index: 10;
`;

const ChargeEndInnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'yg-jalnan';
  font-size: 1.5rem;
  color: #e4e4e4;

  span {
    margin-left: 0.25rem;
  }

  position: relative;
`;

const LogoImg = styled.img`
  height: 1.775rem;

  cursor: pointer;
`;

const ChargeEndTxt = styled.h1`
  margin: 7.375rem 0 1.875rem 0;

  font-family: 'yg-jalnan';
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.87);
`;

const ChargerInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-family: 'Spoqa Han Sans';
    font-size: 1.25rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.87);

    margin: 0 0 0.625rem 0;
  }

  h2 {
    font-family: 'Spoqa Han Sans';
    font-size: 1.25rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.87);

    margin: 0;
  }

  span {
    color: #6488ff;
  }
`;

const Separator = styled.hr`
  width: 105%;

  opacity: 0.38;
  border: 0.5px solid #ffffff;

  margin: 0 0 1rem 0;
`;

const MoneyWrapper = styled.section`
  width: 86.6%;

  position: absolute;
  bottom: 3.125rem;

  margin-bottom: 2.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  article {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-family: 'Spoqa Han Sans';
    font-size: 1rem;
    font-weight: bold;

    :first-of-type {
      margin-bottom: 0.5rem;
    }

    h1 {
      margin: 0;

      color: rgba(255, 255, 255, 0.6);

      font-size: inherit;
    }

    h2 {
      margin: 0;

      color: #6488ff;

      font-size: inherit;
    }
  }
`;

const CheckBtn = styled.button`
  background-color: #6488ff;

  font-family: 'Spoqa Han Sans';
  font-size: 1.25rem;
  font-weight: bold;
  color: #ffffff;

  border: none;
  outline: none;

  width: 100%;
  height: 3.125rem;

  position: absolute;
  bottom: 0%;
`;

const Type = true;

const ChargeComponent: React.FC<RouteComponentProps> = ({ history }) => {
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    if (history.action !== 'PUSH') {
      history.push('/festival');
    }

    setAnimate(true);
  }, []);

  return (
    <Transition
      in={animate}
      timeout={300}
      onExited={() => history.push('/festival', { pay: false })}
    >
      {state => (
        <Template state={state}>
          <Wrapper>
            <FSHeaderComponent setAnimate={setAnimate} />
            {Type ? (
              <>
                <Title>충전하기</Title>
                <QrImg />
                <Name>H2221 최민규</Name>
                <Txt>
                  환전소에서 현금이나 계좌이체를
                  <br />
                  통해 충전하실 수 있습니다.
                </Txt>
              </>
            ) : (
              <>
                <ChargeEndWrapper>
                  <ChargeEndInnerBox>
                    <LogoImg src={DarkLogoSvg} alt="Hanlight Pay Logo" />
                    <span>Pay</span>
                  </ChargeEndInnerBox>
                </ChargeEndWrapper>
                <ChargeEndTxt>충전완료</ChargeEndTxt>
                <ChargerInfo>
                  <h1>
                    승인자 <span>홍재영</span> 님이
                  </h1>
                  <h2>
                    <span>10,000원 충전</span>
                  </h2>
                </ChargerInfo>
                <MoneyWrapper>
                  <Separator />
                  <article>
                    <h1>충전 전 잔액</h1>
                    <h2>12,000원</h2>
                  </article>
                  <article>
                    <h1>충전 후 잔액</h1>
                    <h2>25,000원</h2>
                  </article>
                </MoneyWrapper>
                <CheckBtn onClick={() => setAnimate(false)}>확인</CheckBtn>
              </>
            )}
          </Wrapper>
        </Template>
      )}
    </Transition>
  );
};

export default withRouter(ChargeComponent);
