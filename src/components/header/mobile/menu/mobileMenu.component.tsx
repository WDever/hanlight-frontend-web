import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

interface MobileMenuProps {
  name: string;
  resetUser: () => void;
}

const MenuWrapper = styled.div`
  width: 80%;
  height: 100%;
  position: absolute;
  box-shadow: 0 5px 2px 0 rgba(41, 0, 0, 1);
  background-color: #ffffff;
  z-index: 11;
`;

const MobileMenuComponent: React.FC<MobileMenuProps & RouteComponentProps> = ({
  name,
  resetUser,
  history,
}) => {
  return <MenuWrapper />;
};

export default MobileMenuComponent;
