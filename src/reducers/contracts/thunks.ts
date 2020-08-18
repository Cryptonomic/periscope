import {
    setTopContractsByBalance,
    setTopContractsByBalanceLoading,
    setTopContractsByInvocation,
    setTopContractsByInvocationLoading,
    setTopContractsByBalanceQuery,
    setTopContractsByInvocationQuery
} from './actions';
import {
    ConseilDataClient,
    ConseilQueryBuilder,
} from 'conseiljs';

import { defaultQueries, generateQueryUrl} from '../../utils/defaultQueries';

export const fetchTopContractsByBalance = (
    limit: number
) => async (dispatch: any, state: any) => {

    try { 
        dispatch(setTopContractsByBalanceLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        let userQuery = JSON.parse(JSON.stringify(defaultQueries.topContractsByBalance));
        userQuery.limit = limit;
        let query = {...ConseilQueryBuilder.blankQuery(), ...userQuery };
        const result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos',  network, 'accounts', query);
        
        result.forEach(element => {
            element.balance = element.balance / 1000000.0;
        });
        
        const queryUrl: string = generateQueryUrl(network, 'accounts', query);
        dispatch(setTopContractsByBalanceQuery(queryUrl));
        dispatch(setTopContractsByBalance(result));
        dispatch(setTopContractsByBalanceLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            // await dispatch(createMessageAction(e.message, true));
        }
        setTopContractsByBalanceLoading(true);
    }

}

export const fetchTopContractsByInvocation = (
    limit: number, 
    date: number
) => async (dispatch: any, state: any) => {

    try { 
        dispatch(setTopContractsByInvocationLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        let userQuery = JSON.parse(JSON.stringify(defaultQueries.topContractsByInvocation));
        userQuery.limit = limit;
        userQuery.predicates[2].set.push(date);
        let query = {...ConseilQueryBuilder.blankQuery(), ...userQuery };
        const result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'operations', query);

        const queryUrl: string = generateQueryUrl(network, 'operations', query);
        dispatch(setTopContractsByInvocationQuery(queryUrl));
        dispatch(setTopContractsByInvocation(result));
        dispatch(setTopContractsByInvocationLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            // await dispatch(createMessageAction(e.message, true));
        }
        setTopContractsByInvocationLoading(true);
    }

}