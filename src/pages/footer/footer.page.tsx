import * as React from 'react';

import { Device } from 'lib/styles';
import HatLogoSvg from 'lib/svg/college-graduation.svg';
import FbLogoSvg from 'lib/svg/facebook-logo-button.svg';
import IgLogoSvg from 'lib/svg/instagram.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = styled.footer`
  width: 100%;
  height: 15rem;
  background-color: #f9f9f9;
  font-family: 'Spoqa Han Sans';

  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device.tabletL} {
    height: 11.1rem;
  }
  @media ${Device.mobileL} {
    height: 9.07rem;
  }
  @media ${Device.mobileS} {
    height: 10rem;
  }
`;

const FooterWrapper = styled.div`
  width: 90%;
  max-width: 81rem;
  margin-bottom: 2.5rem;

  @media ${Device.tabletL} {
    margin-bottom: 1.57rem;
  }
  @media ${Device.mobileL} {
    margin-bottom: 1rem;
  }
`;

const UpsideWrapper = styled.div`
  width: 100%;
  margin-top: 2.625rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${Device.tabletL} {
    margin-top: 1.625rem;
  }
  @media ${Device.mobileL} {
    margin-top: 1rem;
  }
`;

const TextWrapper = styled.div`
  display: grid;
  font-size: 0.75rem;
  font-family: inherit;
  line-height: 2;
  white-space: nowrap;

  @media ${Device.mobileL} {
    font-size: 0.625rem;
  }
`;

const Email = styled.span`
  font-size: inherit;
  font-family: inherit;
  margin-top: 1.375rem;
  margin-bottom: 1.375rem;

  @media ${Device.tabletL} {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }
  @media ${Device.mobileL} {
    margin-top: 0.5rem;
  }
`;

const RulesWrapper = styled.div`
  width: 11.5rem;
  display: flex;
  justify-content: space-between;

  @media ${Device.mobileL} {
    width: 10.5rem;
  }
`;

const Rules = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
`;

const LinksWrapper = styled.div`
  width: 23.5rem;
  display: flex;
  justify-content: space-between;

  @media ${Device.tabletL} {
    width: 11.375rem;
  }
  @media ${Device.mobileL} {
    width: 6.82rem;
  }
`;

const LinkBtn = styled.img`
  width: 2.375rem;

  @media ${Device.tabletL} {
    width: 1.875rem;
  }
  @media ${Device.mobileL} {
    width: 1.25rem;
  }
`;

const CopyRight = styled.span`
  font-size: 0.75rem;

  @media ${Device.mobileL} {
    font-size: 0.5rem;
  }
`;

const FooterPage: React.FC = () => {
  return (
    <Footer>
      <FooterWrapper>
        <UpsideWrapper>
          <TextWrapper>
            <span>[04129] 서울특별시 마포구 마포대로 11길 44-80</span>
            <span>한세사이버보안고등학교 총학생회 한울</span>
            <Email>E-Mail : stucon.hansei@gmail.com</Email>
            <RulesWrapper>
              <Rules to="/service/termsofuse">[이용약관]</Rules>
              <Rules to="/service/privacypolicy">[개인정보처리방침]</Rules>
            </RulesWrapper>
          </TextWrapper>
          <LinksWrapper>
            <LinkBtn
              src={FbLogoSvg}
              alt="facebook logo"
              onClick={() =>
                window.open('https://web.facebook.com/한빛-176560256619015/')
              }
            />
            <LinkBtn
              src={IgLogoSvg}
              alt="Instagram logo"
              onClick={() =>
                window.open('https://www.instagram.com/awes_____/')
              }
            />
            <LinkBtn
              src={HatLogoSvg}
              alt="Hat logo"
              onClick={() => window.open('https://github.com/hanlight')}
            />
          </LinksWrapper>
        </UpsideWrapper>
        <CopyRight>
          Copyright COPYTRIGHT HANSEI CYBER SECURITY HIGHSCHOOL. ALL RIGHT
          REVERSED
        </CopyRight>
      </FooterWrapper>
    </Footer>
  );
};

export default FooterPage;
