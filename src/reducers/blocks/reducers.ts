import { 
    SET_HOURLY_BLOCK, 
    SET_HOURLY_BLOCK_LOADING, 
    SET_PRIORITY_BLOCK, 
    SET_PRIORITY_BLOCK_LOADING,
    SET_ENDORSEMENT, 
    SET_ENDORSEMENT_LOADING 
} from './types';
import { getConfigs } from '../../utils/getconfig';
import { Config } from '../../types';

const configs = getConfigs();

export interface AppState {
    hourlyBlock: Array<object>,
    isHourlyBlockLoading: boolean,
    priorityBlock: Array<object>,
    isPriorityBlockLoading: boolean,
    endorsement: Array<object>,
    isEndorsementLoading: boolean
    configs: Config[];
    selectedConfig: Config;
}
let initialState: AppState = {
    configs,
    selectedConfig: configs[0],
    hourlyBlock: [],
    isHourlyBlockLoading: false,
    priorityBlock: [],
    isPriorityBlockLoading: false,
    endorsement: [],
    isEndorsementLoading: false
}

export const blocks = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_HOURLY_BLOCK:
        return { ...state, hourlyBlock: action.hourlyBlock };
    case SET_HOURLY_BLOCK_LOADING:
        return { ...state, isHourlyBlockLoading: action.isHourlyBlockLoading };
    case SET_PRIORITY_BLOCK:
        return { ...state, priorityBlock: action.priorityBlock };
    case SET_PRIORITY_BLOCK_LOADING:
        return { ...state, isPriorityBlockLoading: action.isPriorityBlockLoading };
    case SET_ENDORSEMENT:
        return { ...state, endorsement: action.endorsement };
    case SET_ENDORSEMENT_LOADING:
        return { ...state, isEndorsementLoading: action.isEndorsementLoading };
    default:
      return state;
  }
}
