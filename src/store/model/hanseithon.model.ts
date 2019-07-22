export type ModalTypes =
  | 'none'
  | 'create'
  | 'join'
  | 'match'
  | 'join-success'
  | 'create-success'
  | 'current';

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

  team: TeamType;
  teams: TeamType[];
  teamPk: number;

  themeUrl: string;
  judgementUrl: string;

  match: MatchMember[];
}
