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
        limit: 100
    },
};

export const CARDINALITY_NUMBER = 25;
