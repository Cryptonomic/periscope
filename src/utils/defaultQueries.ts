export const defaultQueries: any = {
    accounts: {
        fields: ['account_id', 'balance'],
        predicates:[
        ],
        orderBy: [{ field: 'balance', direction: 'desc' }],
        aggregation: [],
        limit: 15
    },
    topBakersByBlock: {
        fields: ["baker", "hash"],
        predicates: [{
            field: "timestamp",
            operation: "after",
            set: [],
            inverse: false
        }],
        orderBy: [{
            field: "count_hash",
            direction: "desc"
        }],
        aggregation: [{
            field: "hash",
            function: "count"
        }],
        limit: 15
    },
    topBakersByStake: {
        fields: ["pkh", "staking_balance"],
        predicates: [],
        orderBy: [{
            field: "staking_balance",
            "direction": "desc"
        }],
        aggregation: [],
        limit: 15
    },
    topBakersByDelegation: {
        fields: ["account_id", "delegate_value"],
        predicates: [{
            field: "delegate_value",
            operation: "isnull",
            set: [],
            inverse: true
        }],
        orderBy: [{
            field: "count_account_id",
            direction: "desc"
        }],
        aggregation: [{
            field: "account_id",
            function: "count"
        }],
        limit: 15
    },
    topContractsByBalance: {
        fields: ["balance", "account_id"],
        predicates: [{
            field: "account_id",
            operation: "startsWith",
            set: ["KT1"],
            inverse: false
        }],
        orderBy: [{
            field: "balance",
            direction: "desc"
        }],
        aggregation: [],
        limit: 15
    },

    topContractsByInvocation: {
        fields: ["destination", "operation_group_hash"],
        predicates: [{
            field: "kind",
            operation: "eq",
            set: ["transaction"],
            inverse: false
        }, {
            field: "status",
            operation: "eq",
            set: ["applied"],
            inverse: false
        }, {
            field: "timestamp",
            operation: "after",
            set: [],
            inverse: false
        }, {
            field: "parameters",
            operation: "isnull",
            set: [],
            inverse: true
        }],
        orderBy: [{
            field: "count_operation_group_hash",
            direction: "desc"
        }],
        aggregation: [{
            field: "operation_group_hash",
            "function": "count"
        }],
        limit: 15
    }

};

export const CARDINALITY_NUMBER = 25;

export const generateQueryUrl = (network: string, entity: string, query: object) => {
    const encodedUrl = btoa(JSON.stringify(query));
    return `https://arronax.io/tezos/${network}/${entity}/query/${encodedUrl}`;
};
