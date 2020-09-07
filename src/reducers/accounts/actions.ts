import { SET_TOP_ACCOUNTS, SET_LOADING, SET_TOP_ACCOUNTS_QUERY } from './types';

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

export function setTopAccountsQuery(topAccountsQuery: string) {
    return {
        type: SET_TOP_ACCOUNTS_QUERY,
        topAccountsQuery,
    }
}
