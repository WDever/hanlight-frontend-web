import * as React from 'react';

import DarkLogoSvg from 'lib/png/dark-logo@3x.png';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import styled from 'styled-components';
import FSHeaderComponent from '../header';
import { festivalReducerActions, festivalActions, AppState, FestivalModel, UserModel, FSStatus, FSUserModel } from 'store';
import { Dispatch } from 'redux';
import { usePrevious } from 'lib/hooks';
import * as jwt from 'jsonwebtoken';
import QRCode from 'qrcode.react';
import { number } from 'prop-types';
import { numberWithComma } from 'lib/functions';

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

const QrImg = styled(QRCode)`
  width: 8rem;
  height: 8rem;
  padding: 1rem;
  background-color: #ffffff;
}
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

interface DecodedToken {
  pk: string;
}

interface ChargeInfo { prevMoney: number, money: number, approval: string; }

enum PageType {
  page1 = 'page1',
  page2 = 'page2'
}

const ChargeComponent: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { accessToken, name, major, grade, classNum, studentNum } = useSelector<AppState, UserModel>(state => state.user);
  const { money, lastApproval } = useSelector<AppState, FSUserModel>(state => state.festival.user);
  const { getMoneyStatus } = useSelector<AppState, FSStatus>(state => state.festival.festivalStatus)
  const { getMoney } = festivalActions;

  const [animate, setAnimate] = useState<boolean>(false);
  const [page, setPage] = useState<PageType>(PageType.page1);
  const [intervalNum, setIntervalNum] = useState<number>();
  const prevMoney = usePrevious(money);
  const prevMoneyStatus = usePrevious(getMoneyStatus)
  const [chargeInfo, setChargeInfo] = useState<ChargeInfo>();

  const studentInfo: string = `${major}${grade}${classNum}${studentNum}`;
  const GetMoney = () => dispatch(getMoney({ accessToken }));

  useEffect(() => {
    if (prevMoneyStatus === 'pending' && getMoneyStatus === 'success' && prevMoney !== 0 && prevMoney !== undefined && prevMoney < money) {
      setChargeInfo({ prevMoney, money, approval: lastApproval });
      setPage(PageType.page2);
      clearInterval(intervalNum)

      console.log(lastApproval)
    }
  }, [money]);

  useEffect(() => {
    setIntervalNum(setInterval(GetMoney, 3000));

    if (history.action !== 'PUSH') {
      history.push('/festival');
    }

    setAnimate(true);

    return () => clearInterval(intervalNum);
  }, []);

  const { pk }: DecodedToken = jwt.decode(accessToken) as DecodedToken;

  return (
    <Transition
      in={animate}
      timeout={300}
      onExited={() => history.push('/festival', { pay: false })}
    >
      {state => (
        <Template state={state}>
          <Wrapper>
            <FSHeaderComponent setAnimate={setAnimate} onClick={() => clearInterval(intervalNum)} />
            {page === PageType.page1 ? (
              <>
                <Title>충전하기</Title>
                <QrImg value={pk} size={120} />
                <Name>{studentInfo} {name}</Name>
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
                    승인자 <span>{(chargeInfo as ChargeInfo).approval as string}</span> 님이
                  </h1>
                  <h2>
                    <span>{numberWithComma((chargeInfo as ChargeInfo).money - (chargeInfo as ChargeInfo).prevMoney)}원</span> 충전
                  </h2>
                </ChargerInfo>
                <MoneyWrapper>
                  <Separator />
                  <article>
                    <h1>충전 전 잔액</h1>
                    <h2>{numberWithComma((chargeInfo as ChargeInfo).prevMoney)}</h2>
                  </article>
                  <article>
                    <h1>충전 후 잔액</h1>
                    <h2>{numberWithComma(money)}</h2>
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
