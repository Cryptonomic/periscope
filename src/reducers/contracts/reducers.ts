import {
    SET_TOP_CONTRACTS_BY_BALANCE,
    SET_TOP_CONTRACTS_BY_BALANCE_LOADING,
    SET_TOP_CONTRACTS_BY_INVOCATION,
    SET_TOP_CONTRACTS_BY_INVOCATION_LOADING,
    SET_TOP_CONTRACTS_BY_BALANCE_QUERY,
    SET_TOP_CONTRACTS_BY_INVOCATION_QUERY
} from './types';
import { getConfigs } from '../../utils/getconfig';
import { Config } from '../../types';

const configs = getConfigs();

export interface AppState {
    topContractsByBalance: Array<object>,
    isTopContractsByBalanceLoading: boolean,
    topContractsByInvocation: Array<object>,
    isTopContractsByInvocationLoading: boolean,
    configs: Config[];
    selectedConfig: Config;
    topContractsByBalanceQuery: string,
    topContractsByInvocationQuery: string,
}
let initialState: AppState = {
    configs,
    selectedConfig: configs[0],
    topContractsByBalance: [],
    isTopContractsByBalanceLoading: false,
    topContractsByInvocation: [],
    isTopContractsByInvocationLoading: false,
    topContractsByBalanceQuery: '',
    topContractsByInvocationQuery: ''
}

export const contracts = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_TOP_CONTRACTS_BY_BALANCE:
            return { ...state, topContractsByBalance: action.topContractsByBalance };
        case SET_TOP_CONTRACTS_BY_BALANCE_QUERY:
            return { ...state, topContractsByBalanceQuery: action.topContractsByBalanceQuery };
        case SET_TOP_CONTRACTS_BY_BALANCE_LOADING:
            return { ...state, isTopContractsByBalanceLoading: action.isTopContractsByBalanceLoading };
        case SET_TOP_CONTRACTS_BY_INVOCATION:
            return { ...state, topContractsByInvocation: action.topContractsByInvocation };
        case SET_TOP_CONTRACTS_BY_INVOCATION_QUERY:
            return { ...state, topContractsByInvocationQuery: action.topContractsByInvocationQuery };
        case SET_TOP_CONTRACTS_BY_INVOCATION_LOADING:
            return { ...state, isTopContractsByInvocationLoading: action.isTopContractsByInvocationLoading };
        default:
            return state;
    }
}
