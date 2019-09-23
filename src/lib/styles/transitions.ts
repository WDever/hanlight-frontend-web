import { keyframes } from 'styled-components';

const fadeIn = keyframes`
from { opacity: 0; }
to { opacity: 1; }
`;

const HeaderDarker = keyframes`
  from { background-color: rgba(255, 255, 255, 1)}
  to { background-color: rgba(255, 255, 255, 0.07)}
`;

export const transitions = {
  fadeIn,
  HeaderDarker,
};
