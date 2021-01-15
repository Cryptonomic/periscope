# Periscope

[![Build Status](https://travis-ci.org/Cryptonomic/Arronax.svg?branch=master)](https://travis-ci.org/Cryptonomic/Arronax)
[![dependencies](https://david-dm.org/Cryptonomic/Arronax/status.svg)](https://david-dm.org/Cryptonomic/Arronax)

Blockchain data analytics tool built with [ConseilJS](https://github.com/Cryptonomic/ConseilJS), powered by the [Conseil](https://github.com/Cryptonomic/Conseil) API. Deployment is [live](https://periscope.arronax.io)!

## Prerequisites

A [Conseil](https://github.com/Cryptonomic/Conseil) Node is needed. You can use [Nautilus Core](https://github.com/Cryptonomic/Nautilus) to run up a local deployment along with a local Tezos Archive node, or [Nautilus Cloud](https://nautilus.cloud) to use our cloud hosted Conseil Node.

## Building

Use NPM version >= 6.14.x

```bash
git clone https://github.com/Cryptonomic/periscope.git
cd periscope
npm install
#Read instructions for configuration
npm start
```

The webpage supports TLS/HTTPS.

### Configuration Instructions

`config.tsx` is expected to be found in `/src`. It defines one or more Conseil end-points and data sources within. `initialState` inside `/src/reducers/app/reducers.ts` will reference the default connection to create once the application loads. The most basic config file will look like the following:

```typescript
import { Config } from './types';

const configs: Config[] = [
  {
    platform: 'tezos',
    network: 'mainnet',
    displayName: 'Tezos Mainnet',
    url: 'https://conseil.server',
    apiKey: 'SomeSecret',
  }
]

export default configs;
```

`platform` ('tezos') and `network` ('mainnet') in that file become URL parameters that ConseilJS uses. `displayName` is used in the UI network selector. `url` and `apiKey` are Conseil service parameters. Cryptonomic provides a turn-key Tezos infrastructure service – [nautilus.cloud](https://nautilus.cloud). Conseil and Tezos endpoints are provided by that service. `nodeUrl` is a Tezos RPC endpoint. 

### Other Build Targets

Start the local server without forcing open a browser.
`npm run serve`

Package (webpack) for distribution. Fully contained artifacts will appear in `/build` once this process is complete.
`npm run build`

