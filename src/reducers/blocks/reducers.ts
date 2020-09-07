import { 
    SET_HOURLY_BLOCK, 
    SET_HOURLY_BLOCK_LOADING, 
    SET_PRIORITY_BLOCK, 
    SET_PRIORITY_BLOCK_LOADING,
    SET_ENDORSEMENT, 
    SET_ENDORSEMENT_LOADING,
    SET_HOURLY_BLOCK_QUERY, 
    SET_PRIORITY_BLOCK_QUERY,
    SET_ENDORSEMENT_QUERY
} from './types';
import { getConfigs } from '../../utils/getconfig';
import { Config } from '../../types';

const configs = getConfigs();

export interface AppState {
    hourlyBlock: Array<object>;
    hourlyBlockQuery: string;
    isHourlyBlockLoading: boolean;
    priorityBlock: Array<object>;
    isPriorityBlockLoading: boolean;
    endorsement: Array<object>;
    endorsementQuery: string;
    priorityBlockQuery: string;
    isEndorsementLoading: boolean;
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
    isEndorsementLoading: false,
    hourlyBlockQuery: '',
    priorityBlockQuery: '',
    endorsementQuery: ''

}

export const blocks = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_HOURLY_BLOCK:
        return { ...state, hourlyBlock: action.hourlyBlock };
    case SET_HOURLY_BLOCK_QUERY:
        return { ...state, hourlyBlockQuery: action.hourlyBlockQuery };
    case SET_HOURLY_BLOCK_LOADING:
        return { ...state, isHourlyBlockLoading: action.isHourlyBlockLoading };
    case SET_PRIORITY_BLOCK:
        return { ...state, priorityBlock: action.priorityBlock };
    case SET_PRIORITY_BLOCK_QUERY:
        return { ...state, priorityBlockQuery: action.priorityBlockQuery };
    case SET_PRIORITY_BLOCK_LOADING:
        return { ...state, isPriorityBlockLoading: action.isPriorityBlockLoading };
    case SET_ENDORSEMENT:
        return { ...state, endorsement: action.endorsement };
    case SET_ENDORSEMENT_QUERY:
        return { ...state, endorsementQuery: action.endorsementQuery };
    case SET_ENDORSEMENT_LOADING:
        return { ...state, isEndorsementLoading: action.isEndorsementLoading };
    default:
      return state;
  }
}
