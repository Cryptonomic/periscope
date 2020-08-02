import { SET_TOP_ACCOUNTS, SET_LOADING } from './types';

export function setTopAccounts(topAccounts: Array<object>) {
    return {
        type: SET_TOP_ACCOUNTS,
        topAccounts,
    }
}

export function setLoading(isLoading: boolean) {
    return {
        type: SET_LOADING,
        isLoading,
    }
}
