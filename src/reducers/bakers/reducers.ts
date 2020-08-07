import {
    SET_TOP_BAKERS_BY_BLOCK,
    SET_TOP_BAKERS_BY_STAKE,
    SET_TOP_BAKERS_BY_DELEGATION,
    SET_TOP_BAKERS_BY_DELEGATION_LOADING,
    SET_TOP_BAKERS_BY_STAKE_LOADING,
    SET_TOP_BAKERS_BY_BLOCK_LOADING
} from './types';
import { getConfigs } from '../../utils/getconfig';
import { Config } from '../../types';

const configs = getConfigs();

export interface AppState {
    topBakersByBlock: Array<object>,
    topBakersByDelegation: Array<object>,
    topBakersByStake: Array<object>,
    isTopBakersByDelegationLoading: boolean,
    isTopBakersByStakeLoading: boolean,
    isTopBakersByBlockLoading: boolean,
    configs: Config[];
    selectedConfig: Config;
}
let initialState: AppState = {
    configs,
    selectedConfig: configs[0],
    topBakersByBlock: [],
    topBakersByDelegation: [],
    topBakersByStake: [],
    isTopBakersByDelegationLoading: false,
    isTopBakersByStakeLoading: false,
    isTopBakersByBlockLoading: false,
}

export const bakers = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_TOP_BAKERS_BY_BLOCK:
            return { ...state, topBakersByBlock: action.topBakersByBlock };
        case SET_TOP_BAKERS_BY_DELEGATION:
            return { ...state, topBakersByDelegation: action.topBakersByDelegation };
        case SET_TOP_BAKERS_BY_STAKE:
            return { ...state, topBakersByStake: action.topBakersByStake };
        case SET_TOP_BAKERS_BY_DELEGATION_LOADING:
            return { ...state, isTopBakersByDelegationLoading: action.isTopBakersByDelegationLoading };
        case SET_TOP_BAKERS_BY_STAKE_LOADING:
            return { ...state, isTopBakersByStakeLoading: action.isTopBakersByStakeLoading };
        case SET_TOP_BAKERS_BY_BLOCK_LOADING:
            return { ...state, isTopBakersByBlockLoading: action.isTopBakersByBlockLoading };
        default:
            return state;
    }
}
