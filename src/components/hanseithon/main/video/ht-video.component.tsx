import * as React from 'react';

import { Device } from 'lib/styles';
import styled from 'styled-components';

const Video = styled.video`
  width: 90%;
  margin-bottom: 15rem;

  outline: none;

  @media ${Device.mobileL} {
    width: 90%;

    margin-bottom: 8rem;
  }
`;

const HTVideoComponent: React.FC = () => {
  return (
    <Video
      src="https://hanlight.s3.ap-northeast-2.amazonaws.com/hanseithon/%E1%84%86%E1%85%A1%E1%84%86%E1%85%AE%E1%84%85%E1%85%B5.mp4"
      controls={true}
      autoPlay={true}
    >
      브라우저가 동영상을 지원하지 않습니다.
    </Video>
  );
};

export default HTVideoComponent;
