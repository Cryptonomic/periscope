import {
    SET_TOP_CONTRACTS_BY_BALANCE,
    SET_TOP_CONTRACTS_BY_BALANCE_LOADING,
    SET_TOP_CONTRACTS_BY_INVOCATION,
    SET_TOP_CONTRACTS_BY_INVOCATION_LOADING,
} from './types';

export function setTopContractsByBalance(topContractsByBalance: Array<object>) {
    return {
        type: SET_TOP_CONTRACTS_BY_BALANCE,
        topContractsByBalance,
    }
}

export function setTopContractsByBalanceLoading(isTopContractsByBalanceLoading: boolean) {
    return {
        type: SET_TOP_CONTRACTS_BY_BALANCE_LOADING,
        isTopContractsByBalanceLoading,
    }
}

export function setTopContractsByInvocation(topContractsByInvocation: Array<object>) {
    return {
        type: SET_TOP_CONTRACTS_BY_INVOCATION,
        topContractsByInvocation,
    }
}

export function setTopContractsByInvocationLoading(isTopContractsByInvocationLoading: boolean) {
    return {
        type: SET_TOP_CONTRACTS_BY_INVOCATION_LOADING,
        isTopContractsByInvocationLoading,
    }
}