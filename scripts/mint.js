require('dotenv');
const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const web3 = require('web3')
const MNEMONIC = fs.readFileSync(".secret").toString().trim();
const INFURA_KEY = process.env.INFURA_KEY
const DRET_CONTRACT_ADDRESS = process.env.DRET_CONTRACT_ADDRESS || '0xcAFea810B9eE6286c338C67769f51eBDd1381329';
const OWNER_ADDRESS = process.env.OWNER_ADDRESS || '0x0354a85859591885C765CdA7bd0F3D0F8984eA94'
const NETWORK = process.env.NETWORK || 'rinkeby'
console.log({ INFURA_KEY, MNEMONIC });


if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
  return
}

const DRET_ABI = require('./abi.json');
const proof = require('../zokrates/code/square/proof.json');

async function main() {
  const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/${INFURA_KEY}`)
  const web3Instance = new web3(
    provider
  )

  if (DRET_CONTRACT_ADDRESS) {
    const DRETContract = new web3Instance.eth.Contract(DRET_ABI.abi, DRET_CONTRACT_ADDRESS, { gasLimit: "1000000" })

    // Creatures issued directly to the owner.
    for (var i = 0; i < 100; i++) {
      const result = await DRETContract.methods.mintDRET(
        proof.proof.a,
        proof.proof.b,
        proof.proof.c,
        proof.inputs,
      ).send({ from: OWNER_ADDRESS });
      console.log("Minted creature. Transaction: " + result.transactionHash)
    }
  }
}

main().then(console.log).catch(console.error);
