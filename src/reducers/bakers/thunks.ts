import { 
    setTopBakersByBlock, 
    setTopBakersByDelegations, 
    setTopBakersByDelegationLoading,
    setTopBakersByStake, 
    setTopBakersByStakeLoading,
    setTopBakersByBlockLoading
} from './actions';
import {
    ConseilDataClient,
    ConseilQueryBuilder,
    ConseilSortDirection,
} from 'conseiljs';

import { defaultQueries } from '../../utils/defaultQueries';

export const fetchTopBakersByStake = (
    limit: number
) => async (dispatch: any, state: any) => {

    try { 
        dispatch(setTopBakersByStakeLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        let userQuery = {...defaultQueries.topBakersByStake};
        userQuery.limit = limit;
        let query = {...ConseilQueryBuilder.blankQuery(), ...userQuery };
        const result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'delegates', query);

        result.forEach(element  => {
            element.balance = Math.floor(element.balance / 1000000.0)
        });

        dispatch(setTopBakersByStake(result));
        dispatch(setTopBakersByStakeLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            // await dispatch(createMessageAction(e.message, true));
        }
        setTopBakersByStakeLoading(true);
    }

}

export const fetchTopBakersByDelegation = (
    limit: number
) => async (dispatch: any, state: any) => {

    try { 
        dispatch(setTopBakersByDelegationLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        let userQuery = {...defaultQueries.topBakersByDelegation};
        userQuery.limit = limit;
        let query = {...ConseilQueryBuilder.blankQuery(), ...userQuery };
        const result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'accounts', query);

        dispatch(setTopBakersByDelegations(result));
        dispatch(setTopBakersByDelegationLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            // await dispatch(createMessageAction(e.message, true));
        }
        setTopBakersByStakeLoading(true);
    }

}

export const fetchTopBakersByBlocks = (
    limit: number,
    date: number
) => async (dispatch: any, state: any) => {

    try { 
        dispatch(setTopBakersByBlockLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        let userQuery = {...defaultQueries.topBakersByBlock};
        userQuery.limit = limit;
        userQuery.predicates[0].set.push(date);
        let query = {...ConseilQueryBuilder.blankQuery(), ...userQuery };
        const result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'blocks', query);

        dispatch(setTopBakersByBlock(result));
        dispatch(setTopBakersByBlockLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            // await dispatch(createMessageAction(e.message, true));
        }
        setTopBakersByStakeLoading(true);
    }

}