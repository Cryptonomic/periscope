import { 
    setHourlyBlock, 
    setHourlyBlockLoading ,
    setPriorityBlock,
    setPriorityBlockLoading, 
    setEndorsement, 
    setEndorsementLoading,
    setHourlyBlockQuery,
    setEndorsementQuery,
    setPriorityBlockQuery
} from './actions';
import {
    ConseilDataClient,
    ConseilQueryBuilder,
    ConseilSortDirection,
    ConseilOperator,
    ConseilFunction
} from 'conseiljs';

import { createMessageAction } from '../message/actions';

import { generateQueryUrl} from '../../utils/defaultQueries';

export const fetchHourlyBlock = (date: number) => async (dispatch: any, state: any) => {
    
    try {
        dispatch(setHourlyBlockLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        let query = ConseilQueryBuilder.blankQuery();
        query = ConseilQueryBuilder.addFields(query, 'hash');
        query = ConseilQueryBuilder.addFields(query, 'timestamp');
        query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        query = ConseilQueryBuilder.addOrdering(query, "timestamp", ConseilSortDirection.ASC);
        query = ConseilQueryBuilder.setLimit(query, 1000000000);

        const result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'blocks', query);

        let label: any = [],
        timestamps: any = [],
        values: any = [],
        data: any = [];
        const now = new Date().getTime();

        for(var time = new Date(date).getTime(); time < now; time += 3600000) {
            label.push(new Date(time));
            timestamps.push(time);
            values.push(0)
        }
        
        for(var t = 0; t < label.length; t++) {
            while(result.length > 0 && parseInt(result[0].timestamp) < parseInt(label[t].getTime())) {
                values[t] += 1;
                result.shift()
            }
        }

        for(var x = 0; x < values.length; x++) {
            data.push({date : label[x].getTime(), value : parseInt(values[x])});
        }
        data.shift();

        const queryUrl = generateQueryUrl(network, 'blocks', query);
        dispatch(setHourlyBlockQuery(queryUrl));
        dispatch(setHourlyBlock(data));
        dispatch(setHourlyBlockLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            await dispatch(createMessageAction(message, true));
        }
        setHourlyBlockLoading(false);
    }
};

export const fetchPriorityBlock = (date: number) => async (dispatch: any, state: any) => {
    
    try {
        dispatch(setPriorityBlockLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        let query = ConseilQueryBuilder.blankQuery();
        query = ConseilQueryBuilder.addFields(query, 'hash');
        query = ConseilQueryBuilder.addFields(query, 'timestamp');
        query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        query = ConseilQueryBuilder.addPredicate(query, 'priority', ConseilOperator.EQ, [0]);
        query = ConseilQueryBuilder.addOrdering(query, "timestamp", ConseilSortDirection.ASC);
        query = ConseilQueryBuilder.setLimit(query, 1000000000);

        const result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'blocks', query);

        let label: any = [],
        timestamps: any = [],
        values: any = [],
        data: any = [];
        const now = new Date().getTime();

        for(var time = new Date(date).getTime(); time < now; time += 3600000) {
            label.push(new Date(time));
            timestamps.push(time);
            values.push(0)
        }
        
        for(var r = 0; r < result.length; r++) {
            for(var t = label.length - 1; t > 0; t--) {
                if(parseInt(result[r].timestamp) > parseInt(label[t].getTime())) {
                    values[t] += 1;
                    break;
                }
            }
        }   
    
        for(var x = 0; x < values.length; x++) {
            data.push({date : label[x].getTime(), value : parseInt(values[x])});
        }
        data.shift();
        const queryUrl = generateQueryUrl(network, 'blocks', query);
        dispatch(setPriorityBlockQuery(queryUrl));
        dispatch(setPriorityBlock(data));
        dispatch(setPriorityBlockLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            await dispatch(createMessageAction(message, true));
        }
        setPriorityBlockLoading(false);
    }
};

export const fetchEndorsement = (date: number) => async (dispatch: any, state: any) => {
    
    try {
        dispatch(setEndorsementLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        let result = null;
        let query = ConseilQueryBuilder.blankQuery();
        let isCycle = false;

        if(new Date().getTime() - date > 31000000000) {
            query = ConseilQueryBuilder.addFields(query, 'kind');
            query = ConseilQueryBuilder.addFields(query, 'cycle');
            query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
            query = ConseilQueryBuilder.addPredicate(query, 'kind', ConseilOperator.EQ, ['endorsement']);
            query = ConseilQueryBuilder.addAggregationFunction(query, 'kind', ConseilFunction.count);
            query = ConseilQueryBuilder.addOrdering(query, "cycle", ConseilSortDirection.ASC);
            query = ConseilQueryBuilder.setLimit(query, 1000000000);
            isCycle = true;
        } else {
            query = ConseilQueryBuilder.addFields(query, 'kind');
            query = ConseilQueryBuilder.addFields(query, 'timestamp');
            // query = conseiljs.ConseilQueryBuilder.addFields(query, 'block_level');
            query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
            query = ConseilQueryBuilder.addPredicate(query, 'kind', ConseilOperator.EQ, ['endorsement']);
            query = ConseilQueryBuilder.addAggregationFunction(query, 'kind', ConseilFunction.count);
            query = ConseilQueryBuilder.addOrdering(query, "timestamp", ConseilSortDirection.ASC);
            query = ConseilQueryBuilder.setLimit(query, 1000000000);
        }

        result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'operations', query);
        if(!isCycle) {
            let label: any = [],
                timestamps: any = [],
                values: any = [],
                data: any = [];
                const now = new Date().getTime();

            for(var time = new Date(date).getTime(); time < now; time += 3600000) {
                label.push(new Date(time));
                timestamps.push(time);
                values.push(0)
            }

            for(var r = 0; r < result.length; r++) {
                for(var t = label.length - 1; t > 0; t--) {
                    if(parseInt(result[r].timestamp) > parseInt(label[t].getTime())) {
                        values[t] += parseInt(result[r].count_kind);
                        break;
                    }
                }
            }  

            for(var x = 0; x < values.length; x++) {
                data.push({date : parseInt(label[x].getTime()), value : parseInt(values[x])});
            }

            data.shift();

            result = data;
        }

        const queryUrl = generateQueryUrl(network, 'operations', query);
        dispatch(setEndorsementQuery(queryUrl));
        dispatch(setEndorsement(result));
        dispatch(setEndorsementLoading(false));

    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            await dispatch(createMessageAction(message, true));
        }
        dispatch(setEndorsementLoading(false));
    }
};
