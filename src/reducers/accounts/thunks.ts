import { setTopAccounts, setLoading, setTopAccountsQuery } from './actions';
import {
    ConseilDataClient,
    ConseilQueryBuilder,
    ConseilSortDirection,
} from 'conseiljs';
import { createMessageAction } from '../message/actions';

import { defaultQueries, generateQueryUrl } from '../../utils/defaultQueries';

export const fetchTopAccounts = (limit: number) => async (dispatch: any, state: any) => {
    
    try {
        dispatch(setLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        let userQuery = {...defaultQueries.accounts, ...{limit: limit }};
        let query = {...ConseilQueryBuilder.blankQuery(), ...userQuery };
        query = ConseilQueryBuilder.addFields(query, 'balance');
        query = ConseilQueryBuilder.addFields(query, 'account_id');
        query = ConseilQueryBuilder.addOrdering(query, "balance", ConseilSortDirection.DESC);
        query = ConseilQueryBuilder.setLimit(query, limit);

        const result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'accounts', query);

        result.forEach(element  => {
            element.balance = Math.floor(element.balance / 1000000.0)
        });

        let queryUrl= generateQueryUrl(network, 'accounts', query );
        dispatch(setTopAccountsQuery(queryUrl));
        dispatch(setTopAccounts(result));
        dispatch(setLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            await dispatch(createMessageAction(message, true));
        }
        setLoading(false);
    }
};

