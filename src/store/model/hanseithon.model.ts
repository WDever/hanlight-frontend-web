export type ModalTypes = 'none' | 'create' | 'join' | 'match' | 'join-success' | 'create-success';

export interface HanseithonModel {
  deemStatus: boolean;
  modalType: ModalTypes;
}
