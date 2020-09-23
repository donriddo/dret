import Web3 from "web3";
import DRET from "../../build/contracts/SolnSquareVerifier.json";
const proof = require('../../zokrates/code/square/proof.json');
import BigNumber from 'bignumber.js';

let currentIndex = 1;

const App = {
  web3: null,
  account: null,
  meta: null,
  data: null,
  currentActor: null,
  itemStates: [
  ],

  start: async function () {
    const { web3 } = this;
    console.log(web3);

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      console.log({ networkId, nws: DRET.networks });
      const deployedNetwork = DRET.networks[networkId];

      this.meta = new web3.eth.Contract(
        DRET.abi,
        deployedNetwork.address,
      );

      this.meta.events.Transfer({
        fromBlock: 0
      }, function (error, event) {
        if (error) console.log(error)
        console.log(event);
      });

      console.log(deployedNetwork.address);

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      this.currentActor = accounts[0];

      for (let index = 0; index < 100; index++) {
        console.log('Trying to mint: ', index);
        await this.mintNewToken();
      }
    } catch (error) {
      console.error("Could not connect to contract or chain.", error);
    }
  },

  callAsyncFunction: async function () {
    const args = Array.prototype.slice.call(arguments);
    const fn = args.shift();
    console.log({ fn })
    let [method, gasFee] = args.pop().split(':');
    if (gasFee) {
      gasFee = new BigNumber(gasFee);
    }
    try {
      // e.g addNewFarmer.apply(null, account).send({ from: this.currentActor })
      return await fn.apply(null, args)[method]({ from: this.web3.utils.toChecksumAddress(this.account), value: gasFee });
    } catch (error) {
      console.log(error);
      // this.setResponse(error);
    }
  },

  mintNewToken: async function () {
    const { mint } = this.meta.methods;
    return await this.callAsyncFunction(
      mint,
      this.account,
      currentIndex++,
      'send',
    );
  },

};

window.App = App;

window.addEventListener("load", async function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to https://rinkeby.infura.io/v3/{projectId}. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/{projectId}"));
  }

  App.start();
});
