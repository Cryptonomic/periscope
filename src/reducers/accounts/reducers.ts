import { SET_TOP_ACCOUNTS, SET_LOADING } from './types';
import { getConfigs } from '../../utils/getconfig';
import { Config } from '../../types';

const configs = getConfigs();

export interface AppState {
    topAccounts: Array<object>,
    isLoading: boolean,
    configs: Config[];
    selectedConfig: Config;
}
let initialState: AppState = {
    configs,
    selectedConfig: configs[0],
    topAccounts: [],
    isLoading: false
}

export const accounts = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TOP_ACCOUNTS:
        return { ...state, topAccounts: action.topAccounts };
    case SET_LOADING:
        return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
