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
            "field": "staking_balance",
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
    }
};

export const CARDINALITY_NUMBER = 25;
