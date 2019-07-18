export type ModalTypes = 'none' | 'create' | 'join' | 'match' | 'join-success' | 'create-success';

export type Category = 'l' | 'g';

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
  category: Category;
  createAt: string;

  teamMember: TeamMemberType[];
}

export interface PostTeamParams {
  category: Category;
  teamName: string;
  userPosiotion: string;
}

export interface PostTeamResType {
  team: TeamType;
  code: number;
  createdAt: string;
}

export interface GetTeamResTeyp {
  team: TeamType[];
}

export interface HanseithonModel {
  deemStatus: boolean;
  modalType: ModalTypes;
}
