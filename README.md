# Real Estate Marketplace

This repository contains an Ethereum DApp that demonstrates the ability to list Real Estate properties as ERC721 tokens.

## Problem

Right now, manual paperwork is down in listing and owning properties. This leaves room for a lot of errors which cost a lot of money time to trace and correct. Homeowners have sought to puchase heavy insurance because of this.

## Solution

This DApp aims to make listing easy, trackable and verifiable at any time. You can be sure whoever has listed a property has done the required work needed to be done correctlt to lay claim to that property.


## Steps to run and test the application

0. Make sure you have Truffle installed (https://www.trufflesuite.com/docs/truffle/getting-started/installation). Also have Metamask chrome extension installed (https://metamask.io/)

1. Clone this repository

2. cd into project root and run `npm install`

4. Go back to the project root and run `truffle develop`

5. From the develop console, run `compile`

6. Run `test` to ensure all the tests are passing



### This DApp has been deployed onto the Rinkeby test network. Find details below

SquareVerifier Transaction Hash: **0xdd509b81a597b7638521902f2391340bb1a23f77cf3fd1e32eb07d7ab011b3d9**

SquareVerifier Contract Address: **0x89b7985fA1970465158A0abde1D0e0aD2544b6BF**

SolnSquareVerifier Transaction Hash: **0xfadbdd2dbf28c568dc27fd6af7f5c4295dd0901d66eb839dfdd554aa71c56897**

SolnSquareVerifier Contract Address: **0xcAFea810B9eE6286c338C67769f51eBDd1381329**

### Some of the tokens have been listed on OpenSea
- https://rinkeby.opensea.io/assets/0xcafea810b9ee6286c338c67769f51ebdd1381329/1

- https://rinkeby.opensea.io/assets/0xcafea810b9ee6286c338c67769f51ebdd1381329/2

- https://rinkeby.opensea.io/assets/0xcafea810b9ee6286c338c67769f51ebdd1381329/3

- https://rinkeby.opensea.io/assets/0xcafea810b9ee6286c338c67769f51ebdd1381329/4

- https://rinkeby.opensea.io/assets/0xcafea810b9ee6286c338c67769f51ebdd1381329/5

- https://rinkeby.opensea.io/assets/0xcafea810b9ee6286c338c67769f51ebdd1381329/6

- https://rinkeby.opensea.io/assets/0xcafea810b9ee6286c338c67769f51ebdd1381329/7

- https://rinkeby.opensea.io/assets/0xcafea810b9ee6286c338c67769f51ebdd1381329/8

- https://rinkeby.opensea.io/assets/0xcafea810b9ee6286c338c67769f51ebdd1381329/9

- ...

#### Here are the development tools used

Remix IDE - (Helped in quickly deploying and testing out the sub-contracts and ensure everything is working fine)

Truffle v5.1.34 (core: 5.1.34) - used its webpack box as it contains all the starter code needed and I only just had to jump into implementation right away

Solidity - ^0.6.0 (solc-js)

Node v10.16.3

Web3.js v1.2.1

Dependencies:

```json
  {
    "@openzeppelin/contracts": "^3.2.0",
    "@truffle/hdwallet-provider": "^1.1.0",
    "dotenv": "^8.2.0"
  }
```
