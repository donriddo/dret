const proof = require('../zokrates/code/square/proof.json');
const Verifier = artifacts.require('Verifier');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');


contract('SolnSquareVerifier', accounts => {

  describe('solutions submission', function () {
    beforeEach(async function () {
      this.contract = await SolnSquareVerifier.new(Verifier.address, { from: accounts[0] });
    })

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('should reject solution: incorrect', async function () {
      try {
        await this.contract.mintDRET(
          proof.proof.a,
          proof.proof.b,
          proof.proof.c,
          [0, 0],
          { from: accounts[0] }
        );
      } catch (error) {
        assert.include(error.message, 'Solution provided is not correct');
      }
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('should accept solution: correct', async function () {
      await this.contract.mintDRET(
        proof.proof.a,
        proof.proof.b,
        proof.proof.c,
        proof.inputs,
        { from: accounts[0] }
      );

      const totalSupply = await this.contract.totalSupply.call();
      // since solution is correct, token should have been minted
      assert.equal(totalSupply, 1);
    });
  });
});
