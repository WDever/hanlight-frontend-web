import * as React from 'react';

import HTMentorCommentContainer from 'container/hanseithon/mentorComment';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const HTMentorCommentPage: React.FC = () => {
  return (
    <Template>
      <HTMentorCommentContainer />
    </Template>
  );
};

export default HTMentorCommentPage;
