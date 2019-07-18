export type ModalTypes = 'none' | 'create' | 'join' | 'match' | 'join-success' | 'create-success';

export type CategoryType = string | 'l' | 'g';

export type JobType = '기획' | '개발' | '디자인' | string;

export interface TeamMemberType {
  name: string;
  leader: string;
  studuntId: string;
  position: string;
}

export interface TeamType {
  pk: number;
  name: string;
  leaderName: string;
  category: CategoryType;
  createAt: string;

  teamMember: TeamMemberType[];
}

export interface HanseithonModel {
  deemStatus: boolean;
  agreeStatus: boolean;
  modalType: ModalTypes;

  putTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  postTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  getTeamStatus: 'none' | 'pending' | 'success' | 'failure';

  teams: TeamType[];
}
