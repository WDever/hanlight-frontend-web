import * as React from 'react';

import Logos from 'lib/sponsor';
import { Device } from 'lib/styles';
import styled from 'styled-components';

const SponsorWrapper = styled.div`
  width: 100%;
  background-color: #000000;
  color: #ffffff;
  font-family: 'Opne Sans';
  padding-bottom: 2rem;

  box-shadow: 0 10px 15px 0 rgba(101, 101, 101, 0.66);
  /* border-radius: 0.25rem; */
`;

const SponsorSeparator = styled.div`
  margin-left: 5%;
`;

const Sponsors = styled.div`
  width: 100%;

  display: flex;

  div {
    width: 33%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    img {
      margin-bottom: 3rem;

      cursor: pointer;

      transition: 0.1s ease-in-out;

      :hover {
        opacity: 1;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
      }
    }
  }
`;

const SponsorTitle = styled.div`
  font-family: inherit;
  font-size: 2.25rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 3rem;

  @media ${Device.tabletL} {
    font-size: 1.5rem;
  }
  @media ${Device.mobileL} {
    font-size: 1.125rem;
    margin-bottom: 2.31rem;
  }
`;

const EasysPubImg = styled.img`
  width: 9.25rem;
  height: 2.25rem;
`;

const EbrainImg = styled.img`
  width: 7.25rem;
  height: 3.25rem;
`;

const HTSponsorComponent: React.FC = () => {
  return (
    <SponsorWrapper>
      <SponsorSeparator>
        <SponsorTitle>쉬어가는 스폰서</SponsorTitle>
        <Sponsors>
          <div>
            <img
              src={Logos.Gudak}
              alt="Gudak Logo"
              onClick={() => window.open('https://www.screw-bar.com/')}
            />
            <img
              src={Logos.Insight}
              alt="Insight Logo"
              onClick={() => window.open('https://blog.insightbook.co.kr/')}
            />
            <img
              src={Logos.Maso}
              alt="Maso Logo"
              onClick={() => window.open('https://www.imaso.co.kr/')}
            />
          </div>
          <div>
            <img
              src={Logos.Goorm}
              alt="Goorm Logo"
              onClick={() => window.open('https://www.goorm.io/')}
            />
            <img
              src={Logos.Jpub}
              alt="Jpub Logo"
              onClick={() => window.open('https://jpub.tistory.com/')}
            />
            <img
              src={Logos.Unity}
              alt="Unity Logo"
              onClick={() => window.open('https://unity.com/kr')}
            />
          </div>
          <div>
            <EbrainImg
              src={Logos.Ebrain}
              alt="Ebrain Logo"
              onClick={() => window.open('http://www.ebrain.kr/')}
            />
            <img
              src={Logos.Laftel}
              alt="Laftel Logo"
              onClick={() => window.open('https://laftel.net/')}
            />
            <EasysPubImg
              src={Logos.Easyspub}
              alt="EasysPub Logo"
              onClick={() => window.open('http://www.easyspub.co.kr/Main/pub')}
            />
          </div>
        </Sponsors>
      </SponsorSeparator>
    </SponsorWrapper>
  );
};

export default HTSponsorComponent;
