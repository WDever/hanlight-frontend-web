import * as React from 'react';

import Logos from 'lib/sponsor';
import { Device } from 'lib/styles';
import styled from 'styled-components';

const SponsorWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  color: #000000;
  font-family: 'Open Sans';
  padding-bottom: 2rem;

  @media ${Device.mobileL} {
    padding-bottom: 0;
  }

  box-shadow: 0 10px 15px 0 rgba(101, 101, 101, 0.66);
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

      @media ${Device.mobileL} {
        width: 3rem;
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

const GudakImg = styled.img`
  height: 6rem;

  @media ${Device.mobileL} {
    height: 3rem;
  }
`;

const InsightImg = styled.img`
  height: 2.5rem;

  @media ${Device.mobileL} {
    height: 1.5rem;
  }
`;

const MasoImg = styled.img`
  height: 2rem;

  @media ${Device.mobileL} {
    height: 0.8rem;
  }
`;

const GoormImg = styled.img`
  height: 1.5rem;

  @media ${Device.mobileL} {
    height: 0.8rem;
  }
`;

const JpubImg = styled.img`
  height: 3.5rem;

  @media ${Device.mobileL} {
    height: 2rem;
  }
`;

const UnityImg = styled.img`
  height: 2.2rem;

  @media ${Device.mobileL} {
    height: 1.2rem;
  }
`;

const LaftelImg = styled.img`
  height: 2.3rem;

  @media ${Device.mobileL} {
    height: 1.2rem;
  }
`;

const EasysPubImg = styled.img`
  height: 1.8rem;

  @media ${Device.mobileL} {
    height: 0.8rem;
  }
`;

const EbrainImg = styled.img`
  height: 3rem;

  @media ${Device.mobileL} {
    height: 1.8rem;
  }
`;

const HTSponsorComponent: React.FC = () => {
  return (
    <SponsorWrapper>
      <SponsorSeparator>
        <SponsorTitle>쉬어가는 스폰서</SponsorTitle>
        <Sponsors>
          <div>
            <GudakImg
              src={Logos.Gudak}
              alt="Gudak Logo"
              onClick={() => window.open('https://www.screw-bar.com/')}
            />
            <InsightImg
              src={Logos.Insight}
              alt="Insight Logo"
              onClick={() => window.open('https://blog.insightbook.co.kr/')}
            />
            <MasoImg
              src={Logos.Maso}
              alt="Maso Logo"
              onClick={() => window.open('https://www.imaso.co.kr/')}
            />
          </div>
          <div>
            <GoormImg
              src={Logos.Goorm}
              alt="Goorm Logo"
              onClick={() => window.open('https://www.goorm.io/')}
            />
            <JpubImg
              src={Logos.Jpub}
              alt="Jpub Logo"
              onClick={() => window.open('https://jpub.tistory.com/')}
            />
            <UnityImg
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
            <LaftelImg
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
