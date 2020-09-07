import { 
    setTopBakersByBlock, 
    setTopBakersByDelegations, 
    setTopBakersByDelegationLoading,
    setTopBakersByStake, 
    setTopBakersByStakeLoading,
    setTopBakersByBlockLoading,
    setTopBakersByBlockQuery, 
    setTopBakersByDelegationsQuery,
    setTopBakersByStakeQuery, 
} from './actions';
import {
    ConseilDataClient,
    ConseilQueryBuilder,
} from 'conseiljs';

import { defaultQueries, generateQueryUrl} from '../../utils/defaultQueries';
import { createMessageAction } from '../message/actions';

export const fetchTopBakersByStake = (
    limit: number
) => async (dispatch: any, state: any) => {

    try { 
        dispatch(setTopBakersByStakeLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        const userQuery = JSON.parse(JSON.stringify(defaultQueries.topBakersByStake));
        userQuery.limit = limit;
        let query = {...ConseilQueryBuilder.blankQuery(), ...userQuery };
        const result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'bakers', query);
        
        result.forEach(element => {
            element.staking_balance = element.staking_balance / 1000000.0
        });
        const queryUrl: string= generateQueryUrl(network, 'bakers', query);
        dispatch(setTopBakersByStakeQuery(queryUrl));
        dispatch(setTopBakersByStake(result));
        dispatch(setTopBakersByStakeLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            await dispatch(createMessageAction(message, true));
        }
        setTopBakersByStakeLoading(false);
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
        const userQuery = JSON.parse(JSON.stringify(defaultQueries.topBakersByDelegation));
        userQuery.limit = limit;
        let query = {...ConseilQueryBuilder.blankQuery(), ...userQuery };
        const result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'accounts', query);

        const queryUrl: string= generateQueryUrl(network, 'accounts', query);
        dispatch(setTopBakersByDelegationsQuery(queryUrl));
        dispatch(setTopBakersByDelegations(result));
        dispatch(setTopBakersByDelegationLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            await dispatch(createMessageAction(message, true));
        }
        setTopBakersByStakeLoading(false);
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
        const defaultQuery = JSON.parse(JSON.stringify(defaultQueries.topBakersByBlock));
        let userQuery = {...defaultQuery, ...{limit: limit}};
        userQuery.predicates[0].set.push(date);
        let query = {...ConseilQueryBuilder.blankQuery(), ...userQuery };
        const result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'blocks', query);

        const queryUrl: string= generateQueryUrl(network, 'blocks', query);
        dispatch(setTopBakersByBlockQuery(queryUrl));
        dispatch(setTopBakersByBlock(result));
        dispatch(setTopBakersByBlockLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            await dispatch(createMessageAction(message, true));
        }
        setTopBakersByStakeLoading(false);
    }

}