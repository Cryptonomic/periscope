import { createSelector } from 'reselect';
import { RootState } from '../index';

export const getAppState = (state: RootState) => state.accounts;

export const getTopAccounts = createSelector(getAppState, (accounts) => accounts.topAccounts);

export const getTopAccountsLoading = createSelector(getAppState, (accounts) => accounts.isTopAccountsLoading);

