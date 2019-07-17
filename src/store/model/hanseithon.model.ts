export type ModalTypes = 'none' | 'create' | 'join' | 'match';

export interface HanseithonModel {
  deemStatus: boolean;
  modalType: ModalTypes;
}
