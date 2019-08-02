import * as React from 'react';

import { Device } from 'lib/styles';
import styled from 'styled-components';

const Video = styled.video`
  width: 90%;
  margin-bottom: 15rem;

  @media ${Device.mobileL} {
    width: 90%;

    margin-bottom: 8rem;
  }
`;

const HTVideoComponent: React.FC = () => {
  return (
    <Video
      src="http://media.w3.org/2010/05/video/movie_300.mp4"
      controls={true}
      autoPlay={true}
      muted={true}
    >
      브라우저가 동영상을 지원하지 않습니다.
    </Video>
  );
};

export default HTVideoComponent;