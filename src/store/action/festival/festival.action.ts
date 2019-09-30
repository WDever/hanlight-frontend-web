import { Action } from 'redux';
import {
  ErrorResponse,
  ModalDataType,
  modalType,
  PayItemType,
} from 'store/model';
import { createStandardAction } from 'typesafe-actions';
import { FestivalTypes } from './festival.type';

export interface ToggleModalPayload {
  status: boolean;
  data?: {
    type: modalType;
    content: string | PayItemType[];
  };
}

export interface ToggleModal extends Action {
  readonly type: FestivalTypes.TOGGLE_MODAL;

  payload: ToggleModalPayload;
}

const { TOGGLE_MODAL } = FestivalTypes;

export const festivalActions = {
  toggleModal: createStandardAction(TOGGLE_MODAL)<ToggleModalPayload>(),
};

export type festivalReducerActions = ToggleModal;
