import {
    SET_TOP_CONTRACTS_BY_BALANCE,
    SET_TOP_CONTRACTS_BY_BALANCE_LOADING,
    SET_TOP_CONTRACTS_BY_INVOCATION,
    SET_TOP_CONTRACTS_BY_INVOCATION_LOADING,
    SET_TOP_CONTRACTS_BY_BALANCE_QUERY,
    SET_TOP_CONTRACTS_BY_INVOCATION_QUERY
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

export function setTopContractsByBalanceQuery(topContractsByBalanceQuery: string) {
    return {
        type: SET_TOP_CONTRACTS_BY_BALANCE_QUERY,
        topContractsByBalanceQuery,
    }
}

export function setTopContractsByInvocationQuery(topContractsByInvocationQuery: string) {
    return {
        type: SET_TOP_CONTRACTS_BY_INVOCATION_QUERY,
        topContractsByInvocationQuery,
    }
}