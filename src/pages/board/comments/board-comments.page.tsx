// import * as React from 'react';

// import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
// import Dotdotdot from 'lib/svg/dotdotdot.svg';
// import LikeIcon from 'lib/svg/like.svg';
// import styled from 'styled-components';

// const FeedCommentWrapper = styled.div`
//   width: 100%;
// `;

// const FeedCommentTittle = styled.p`
//   font-size: 0.875rem;
//   color: #1d2129;
// `;

// const CommentWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 0.3125rem;
// `;

// const Comment = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
// `;

// const CommentLeftWrapper = styled.div`
//   width: 95%;
//   display: flex;
// `;

// const CommentContentWrapper = styled.div``;

// const CommentBody = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const CommentName = styled.span`
//   font-size: 0.81rem;
//   color: #443898;
//   margin: 0.5rem;
// `;
// const CommentContent = styled.span`
//   font-size: 0.81rem;
//   color: #1d2129;
//   margin-right: 0.75rem;
// `;

// const CommentTooltip = styled.div`
//   height: 2rem;
//   border-radius: 8px;
//   background-color: #f2f3f5;

//   display: flex;
//   align-items: center;
// `;

// const CommentLikeBtn = styled.span`
//   font-size: 0.75rem;
//   color: #0055ff;
//   margin-left: 0.5rem;
//   cursor: pointer;
// `;

// const CommentDate = styled.span`
//   font-size: 0.75rem;
//   color: #616770;
// `;

// const CommentLikeWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: 0.25rem;
// `;
// const CommetLikeCount = styled.span`
//   font-size: 0.75rem;
//   color: #000000;
//   margin-left: 0.25rem;
// `;

// const BoardCommentsPage: React.FC<{ board_pk: number }> = () => (
//   <FeedCommentWrapper>
//     <FeedCommentTittle>댓글(7)</FeedCommentTittle>
//     <CommentWrapper>
//       <Comment>
//         <CommentLeftWrapper>
//           <img
//             src={DefaultProfileImage}
//             style={{ width: '40px', marginRight: '0.75rem' }}
//             alt=""
//           />
//           <CommentContentWrapper>
//             <CommentBody>
//               <CommentTooltip>
//                 <CommentName>이예준</CommentName>
//                 <CommentContent>팩트) 김우혁 병신</CommentContent>
//               </CommentTooltip>
//               <CommentLikeWrapper>
//                 <img
//                   src={LikeIcon}
//                   style={{ width: '12.9px', height: '12.5px' }}
//                   alt=""
//                 />
//                 <CommetLikeCount>1</CommetLikeCount>
//               </CommentLikeWrapper>
//             </CommentBody>
//             <div>
//               <CommentLikeBtn>좋아요</CommentLikeBtn>
//               &ensp;
//               <CommentDate>2019년 6월 18일 오후 7:04</CommentDate>
//             </div>
//           </CommentContentWrapper>
//         </CommentLeftWrapper>
//         <img
//           src={Dotdotdot}
//           style={{ width: '20px', height: '30px', cursor: 'pointer' }}
//           alt=""
//         />
//       </Comment>
//     </CommentWrapper>
//     <CommentWrapper>
//       <Comment>
//         <CommentLeftWrapper>
//           <img
//             src={DefaultProfileImage}
//             style={{ width: '40px', marginRight: '0.75rem' }}
//             alt=""
//           />
//           <CommentContentWrapper>
//             <CommentBody>
//               <CommentTooltip>
//                 <CommentName>이예준</CommentName>
//                 <CommentContent>팩트) 김우혁 병신</CommentContent>
//               </CommentTooltip>
//               <CommentLikeWrapper>
//                 <img
//                   src={LikeIcon}
//                   style={{ width: '12.9px', height: '12.5px' }}
//                   alt=""
//                 />
//                 <CommetLikeCount>1</CommetLikeCount>
//               </CommentLikeWrapper>
//             </CommentBody>
//             <div>
//               <CommentLikeBtn>좋아요</CommentLikeBtn>
//               &ensp;
//               <CommentDate>2019년 6월 18일 오후 7:04</CommentDate>
//             </div>
//           </CommentContentWrapper>
//         </CommentLeftWrapper>
//         <img
//           src={Dotdotdot}
//           style={{ width: '20px', height: '30px', cursor: 'pointer' }}
//           alt=""
//         />
//       </Comment>
//     </CommentWrapper>
//   </FeedCommentWrapper>
// );

// export default BoardCommentsPage;
import * as React from 'react';

import BoardCommentsContainer from 'container/board/comments';

const BoardCommentsPage: React.FC = () => {
  return (
    <BoardCommentsContainer board_pk={1} />
  )
};

export default BoardCommentsPage;
