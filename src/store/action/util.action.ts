import { Action } from 'redux';
import { createAction } from 'typesafe-actions';

const TOGGLE_MENU = 'TOGGLE_MENU';

export class ToggleMenu implements Action {
  public readonly type = TOGGLE_MENU;

  public constructor(public payload: boolean) {}
}

export const utilActions = {
  toggleMenu: createAction(TOGGLE_MENU)<boolean>(),
};

export type utilReducerActions = ToggleMenu;
