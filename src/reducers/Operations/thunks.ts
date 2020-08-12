import { 
    setHourlyTransaction,
    setHourlyTransactionLoading,
    setHourlyVolume, 
    setHourlyVolumeLoading,
    setHourlyGas,
    setHourlyGasLoading,
    setHourlyFee,
    setHourlyFeeLoading,
    setDailyActivation,
    setDailyActivationLoading,
    setDailyOrigination,
    setDailyOriginationLoading
 } from './actions';
import {
    ConseilDataClient,
    ConseilQueryBuilder,
    ConseilSortDirection,
    ConseilOperator,
    ConseilFunction
} from 'conseiljs';

export const fetchHourlyTransaction = (date: number) => async (dispatch: any, state: any) => {
    
    try {
        dispatch(setHourlyTransactionLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        
        let result= null;
        let query = ConseilQueryBuilder.blankQuery();
        let isCycle = false;

        if(new Date().getTime() - date > 31000000000) {
            query = ConseilQueryBuilder.addFields(query, 'kind');
            query = ConseilQueryBuilder.addFields(query, 'cycle');
            query = ConseilQueryBuilder.addPredicate(query, 'kind', ConseilOperator.EQ, ['transaction']);
            query = ConseilQueryBuilder.addPredicate(query, 'status', ConseilOperator.EQ, ['applied']);
            query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
            query = ConseilQueryBuilder.addAggregationFunction(query, 'kind', ConseilFunction.count);
            query = ConseilQueryBuilder.addOrdering(query, "cycle", ConseilSortDirection.ASC);
            query = ConseilQueryBuilder.setLimit(query, 1000000000);
            isCycle = true;
        } else {
            query = ConseilQueryBuilder.addFields(query, 'kind');
            query = ConseilQueryBuilder.addFields(query, 'timestamp');
            query = ConseilQueryBuilder.addPredicate(query, 'kind', ConseilOperator.EQ, ['transaction']);
            query = ConseilQueryBuilder.addPredicate(query, 'status', ConseilOperator.EQ, ['applied']);
            query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
            query = ConseilQueryBuilder.addAggregationFunction(query, 'kind', ConseilFunction.count);
            query = ConseilQueryBuilder.addOrdering(query, "timestamp", ConseilSortDirection.ASC);
            query = ConseilQueryBuilder.setLimit(query, 1000000000);
        }

        result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'operations', query);

        if(!isCycle) {
            const { values, label } = formatData(date, result, 'timestamp', 'count_kind');
            let data = [];
            for(var x = 0; x < values.length; x++) {
                data.push({date : label[x].getTime(), values : values[x] });
            }

            if(data[0].values === 0) { data.shift(); } 
            if(data[data.length - 1].values === 0) { data.pop(); } 
            result = data;
        }
        
        dispatch(setHourlyTransaction(result));
        dispatch(setHourlyTransactionLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            // await dispatch(createMessageAction(e.message, true));
        }
        setHourlyTransactionLoading(false);
    }
};

export const fetchHourlyVolume = (date: number) => async (dispatch: any, state: any) => {
    
    try {
        dispatch(setHourlyVolumeLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        
        let result= null;
        let query = ConseilQueryBuilder.blankQuery();
        let isCycle = false;
        if(new Date().getTime() - date > 31000000000) {
            query = ConseilQueryBuilder.addFields(query, 'amount');
            query = ConseilQueryBuilder.addFields(query, 'cycle');
            query = ConseilQueryBuilder.addPredicate(query, 'kind', ConseilOperator.EQ, ['transaction']);
            query = ConseilQueryBuilder.addPredicate(query, 'status', ConseilOperator.EQ, ['applied']);
            query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
            query = ConseilQueryBuilder.addAggregationFunction(query, 'amount', ConseilFunction.sum);
            query = ConseilQueryBuilder.addOrdering(query, "cycle", ConseilSortDirection.ASC);
            query = ConseilQueryBuilder.setLimit(query, 1000000000);
            isCycle = true;
        } else {
            query = ConseilQueryBuilder.addFields(query, 'amount');
            query = ConseilQueryBuilder.addFields(query, 'timestamp');
            query = ConseilQueryBuilder.addPredicate(query, 'kind', ConseilOperator.EQ, ['transaction']);
            query = ConseilQueryBuilder.addPredicate(query, 'status', ConseilOperator.EQ, ['applied']);
            query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
            query = ConseilQueryBuilder.addAggregationFunction(query, 'amount', ConseilFunction.sum);
            query = ConseilQueryBuilder.addOrdering(query, "timestamp", ConseilSortDirection.ASC);
            query = ConseilQueryBuilder.setLimit(query, 1000000000);
        }
        result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'operations', query);
        if(!isCycle) {
            const { values, label } = formatData(date, result, 'timestamp', 'sum_amount');
            let data = [];
            for(var x = 0; x < values.length; x++) {
                data.push({date : label[x].getTime(), values : values[x] / 1000000.0 });
            }

            if(data[0].values === 0) { data.shift(); } 
            if(data[data.length - 1].values === 0) { data.pop(); } 
            result = data;
        }
        
        dispatch(setHourlyVolume(result));
        dispatch(setHourlyVolumeLoading(false));
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            // await dispatch(createMessageAction(e.message, true));
        }
        setHourlyVolumeLoading(false);
    }
};

export const fetchHourlyGas = (date: number) => async (dispatch: any, state: any) => {
    try {
        dispatch(setHourlyGasLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        
        let result= null;
        let query = ConseilQueryBuilder.blankQuery();
        let isCycle = false;

        if(new Date().getTime() - date > 31000000000) {
            query = ConseilQueryBuilder.addFields(query, 'consumed_gas');
            query = ConseilQueryBuilder.addFields(query, 'cycle');
            query = ConseilQueryBuilder.addPredicate(query, 'consumed_gas', ConseilOperator.GT, [0]);
            query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
            query = ConseilQueryBuilder.addAggregationFunction(query, 'consumed_gas', ConseilFunction.sum);
            query = ConseilQueryBuilder.addOrdering(query, "cycle", ConseilSortDirection.ASC);
            query = ConseilQueryBuilder.setLimit(query, 1000000000);

            isCycle = true;
        } else {
            query = ConseilQueryBuilder.addFields(query, 'consumed_gas');
            query = ConseilQueryBuilder.addFields(query, 'timestamp');
            query = ConseilQueryBuilder.addPredicate(query, 'consumed_gas', ConseilOperator.GT, [0]);
            query = ConseilQueryBuilder.addPredicate(query, 'status', ConseilOperator.EQ, ['applied']);
            query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
            query = ConseilQueryBuilder.addAggregationFunction(query, 'consumed_gas', ConseilFunction.sum);
            query = ConseilQueryBuilder.addOrdering(query, "timestamp", ConseilSortDirection.ASC);
            query = ConseilQueryBuilder.setLimit(query, 1000000000);

        }
        result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'operations', query);

        if(!isCycle) {
            const { values, label } = formatData(date, result, 'timestamp', 'sum_consumed_gas');
            let data = [];
            for(var x = 0; x < values.length; x++) {
                data.push({date : label[x].getTime(), values : parseInt(values[x]) });
            }

            if(data[0].values === 0) { data.shift(); } 
            if(data[data.length - 1].values === 0) { data.pop(); } 
            result = data;
        }
        
        dispatch(setHourlyGas(result));
        dispatch(setHourlyGasLoading(false));
        
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            // await dispatch(createMessageAction(e.message, true));
        }
        setHourlyGasLoading(false);
    }
};

export const fetchHourlyFee = (date: number) => async (dispatch: any, state: any) => {
    try {
        dispatch(setHourlyFeeLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        
        let result= null;
        let query = ConseilQueryBuilder.blankQuery();
        let isCycle = false;

        if(new Date().getTime() - date > 31000000000) {
            query = ConseilQueryBuilder.addFields(query, 'fee');
            query = ConseilQueryBuilder.addFields(query, 'cycle');
            query = ConseilQueryBuilder.addPredicate(query, 'fee', ConseilOperator.GT, [0]);
            query = ConseilQueryBuilder.addPredicate(query, 'status', ConseilOperator.EQ, ['applied']);
            query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
            query = ConseilQueryBuilder.addAggregationFunction(query, 'fee', ConseilFunction.sum);
            query = ConseilQueryBuilder.addOrdering(query, "cycle", ConseilSortDirection.ASC);
            query = ConseilQueryBuilder.setLimit(query, 1000000000);

            isCycle = true;
        } else {
            query = ConseilQueryBuilder.addFields(query, 'fee');
            query = ConseilQueryBuilder.addFields(query, 'timestamp');
            query = ConseilQueryBuilder.addPredicate(query, 'fee', ConseilOperator.GT, [0]);
            query = ConseilQueryBuilder.addPredicate(query, 'status', ConseilOperator.EQ, ['applied']);
            query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
            query = ConseilQueryBuilder.addAggregationFunction(query, 'fee', ConseilFunction.sum);
            query = ConseilQueryBuilder.addOrdering(query, "timestamp", ConseilSortDirection.ASC);
            query = ConseilQueryBuilder.setLimit(query, 1000000000);

        }
        result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'operations', query);

        if(!isCycle) {
            const { values, label } = formatData(date, result, 'timestamp', 'sum_fee');
            let data = [];
            for(var x = 0; x < values.length; x++) {
                data.push({date : label[x].getTime(), values : values[x] / 1000000.0 });
            }

            if(data[0].values === 0) { data.shift(); } 
            if(data[data.length - 1].values === 0) { data.pop(); } 
            result = data;
        }
        
        dispatch(setHourlyFee(result));
        dispatch(setHourlyFeeLoading(false));
        
    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            // await dispatch(createMessageAction(e.message, true));
        }
        setHourlyGasLoading(false);
    }
};


export const fetchDailyActivation = (
    date: number
) => async (dispatch: any, state: any) => {

    try { 
        dispatch(setDailyActivationLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        let query = ConseilQueryBuilder.blankQuery();
        query = ConseilQueryBuilder.addFields(query, 'kind');
        query = ConseilQueryBuilder.addFields(query, 'timestamp');
        query = ConseilQueryBuilder.addPredicate(query, 'kind', ConseilOperator.EQ, ['activate_account']);
        // query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
        query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        query = ConseilQueryBuilder.addAggregationFunction(query, 'kind', ConseilFunction.count);
        query = ConseilQueryBuilder.addOrdering(query, "timestamp", ConseilSortDirection.ASC);
        query = ConseilQueryBuilder.setLimit(query, 1000000000);
        let result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'operations', query);
        
        const { values, label } = formatData(date, result, 'timestamp', 'count_kind');
        let data = [];
        for(var x = 0; x < values.length; x++) {
            data.push({date : label[x].getTime(), values : values[x] });
        }

        if(data[0].values === 0) { data.shift(); } 
        if(data[data.length - 1].values === 0) { data.pop(); } 
        result = data;

        dispatch(setDailyActivation(result));
        dispatch(setDailyActivationLoading(false));

    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            // await dispatch(createMessageAction(e.message, true));
        }
        setDailyActivationLoading(false);
    }

}


export const fetchDailyOrigination = (
    date: number
) => async (dispatch: any, state: any) => {

    try { 
        dispatch(setDailyOriginationLoading(true));
        const { selectedConfig } = state().accounts;
        const { network, url, apiKey } = selectedConfig;
        const serverInfo = { url, apiKey, network };
        let query = ConseilQueryBuilder.blankQuery();
        query = ConseilQueryBuilder.addFields(query, 'kind');
        query = ConseilQueryBuilder.addFields(query, 'timestamp');
        query = ConseilQueryBuilder.addPredicate(query, 'kind', ConseilOperator.EQ, ['origination']);
        query = ConseilQueryBuilder.addPredicate(query, 'status', ConseilOperator.EQ, ['applied']);
        query = ConseilQueryBuilder.addPredicate(query, 'timestamp', ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        // query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'kind', conseiljs.ConseilFunction.count);
        query = ConseilQueryBuilder.addOrdering(query, "timestamp", ConseilSortDirection.ASC);
        query = ConseilQueryBuilder.setLimit(query, 1000000000);

        let result = await ConseilDataClient.executeEntityQuery(serverInfo, 'tezos', network, 'operations', query);
        
        const now = new Date().getTime();
        const label: any = [],
        times = [],
        originations: any = [],
        data = [];

        for(var time = date; time < now; time += 86400000) {
            let value = new Date(time);
            value.setHours(0, 0, 0, 0)
            label.push(value);
            times.push(value.getTime());
            originations.push(0)
        }

        for(var r = 0; r < result.length; r++) {
            for(var t = label.length - 1; t > 0; t--) {
                if(parseInt(result[r].timestamp) > parseInt(label[t].getTime())) {
                    originations[t] += 1;
                    break;
                }
            }
        }  

        for(var x = 0; x < originations.length; x++) {
            data.push({date : parseInt(label[x].getTime()), values : parseInt(originations[x])});
        }

        dispatch(setDailyOrigination(data));
        dispatch(setDailyOriginationLoading(false));

    } catch (e) {
        const message =
            e.message ||
            `Unable to load transactions data for Home page.`;
        if (e.message) {
            // await dispatch(createMessageAction(e.message, true));
        }
        setDailyOriginationLoading(false);
    }

}

const formatData = (date: number, result: Array<any>, xKey: string, yKey: string) => {
    var label: any = [],
    timestamps = [],
    values: any = [];
    const now = new Date().getTime();

    for(var time = new Date(date).getTime(); time < now; time += 3600000) {
        label.push(new Date(time));
        timestamps.push(time);
        values.push(0);
    }

    for(var r = 0; r < result.length; r++) {
        for(var t = label.length - 1; t > 0; t--) {
            if(parseInt(result[r][xKey]) > parseInt(label[t].getTime())) {
                values[t] += parseInt(result[r][yKey]);
                break;
            }
        }
    }  

    return {values, label};
}