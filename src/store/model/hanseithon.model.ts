export type ModalTypes = 'none' | 'request' | 'detail-view' | 'submit' | 'mentor-comment';

export type CategoryType = string | 'l' | 'g';

export type JobType = '기획' | '개발' | '디자인' | string;

export interface TeamMemberType {
  name: string;
  leader: boolean;
  studentId: string;
  position: string;
}

export interface TeamType {
  pk: number;
  name: string;
  leader_name: string;
  category: CategoryType;
  createAt: string;
  code: number;

  teamMember: TeamMemberType[];
}

export interface MatchMember {
  name: string;
  studentId: string;
  position: string;
  introduction: string;
}

export interface MentorRequestType {
  pk: number;
  done: boolean;
  content: string;
  mentor_pk: number;

  team: {
    category: CategoryType;
    code: number;
    createdAt: string;
    leader_name: string;
    name: string;
    pk: number;
    updatedAt: string;
  };

  team_pk: number;
}

export interface MentorType {
  pk: number;
  name: string;
}

export type HtUserType =
  | 'none'
  | 'observer'
  | 'mentor'
  | 'attendee'
  | 'staff'
  | 'common';

export interface HanseithonModel {
  deemStatus: boolean;
  agreeStatus: boolean;
  modalType: ModalTypes;

  putTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  postTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  getTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  getTeamMatchStatus: 'none' | 'pending' | 'success' | 'failure';
  postTeamMatchStatus: 'none' | 'pending' | 'success' | 'failure';
  postObserverStatus: 'none' | 'pending' | 'success' | 'failure';
  getThemeStatus: 'none' | 'pending' | 'success' | 'failure';
  getJudgementStatus: 'none' | 'pending' | 'success' | 'failure';
  getHtUserStatus: 'none' | 'pending' | 'success' | 'failure';
  getMentorStatus: 'none' | 'pending' | 'success' | 'failure';
  getMentorRequestStatus: 'none' | 'pending' | 'success' | 'failure';
  postMentorRequestStatus: 'none' | 'pending' | 'success' | 'failure';
  patchMentorRequestStatus: 'none' | 'pending' | 'success' | 'failure';
  postMentorCommentStatus: 'none' | 'pending' | 'success' | 'failure';

  team: TeamType;
  teams: TeamType[];
  teamPk: number;

  themeUrl: string;
  judgementUrl: string;

  match: MatchMember[];

  htUserType: HtUserType;
  userTeam: null | string;

  mentorRequestList: MentorRequestType[];
  mentorList: MentorType[];

  mentorPk: number;

  reqPk: number;
}
