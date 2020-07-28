const conseilServer = { 
    url: 'https://conseil-prod.cryptonomic-infra.tech:443', 
    apiKey: 'f86ab59d-d2ea-443b-98e2-6c0785e3de8c', 
    network: 'mainnet' 
};

const shareReport = (network, entity, query) => {
    const encodedUrl = btoa(JSON.stringify(query));
    return `https://arronax.io/tezos/${network}/${entity}/query/${encodedUrl}`;
};