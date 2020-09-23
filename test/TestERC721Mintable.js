const DRET = artifacts.require('DRET');

const BASE_TOKEN_URI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/'
contract('TestERC721Mintable', accounts => {

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await DRET.new({ from: accounts[0] });

            // TODO: mint multiple tokens
            await this.contract.mint(accounts[0], 1);
            await this.contract.mint(accounts[0], 2);
            await this.contract.mint(accounts[0], 3);
            await this.contract.mint(accounts[0], 4);
            await this.contract.mint(accounts[0], 5);
            await this.contract.mint(accounts[1], 6);
            await this.contract.mint(accounts[1], 7);
            await this.contract.mint(accounts[1], 8);
        })

        it('should return total supply', async function () {
            const totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply, 8);
        })

        it('should get token balance', async function () {
            const balance1 = await this.contract.balanceOf(accounts[0]);
            const balance2 = await this.contract.balanceOf(accounts[1]);
            assert.equal(balance1, 5);
            assert.equal(balance2, 3);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            const baseTokenURI = await this.contract.baseTokenURI.call();
            assert.equal(baseTokenURI, BASE_TOKEN_URI);
            const tokenURI = await this.contract.tokenURI.call(1);
            assert.equal(tokenURI, `${BASE_TOKEN_URI}1`);
        })

        it('should transfer token from one owner to another', async function () {
            let token1Owner = await this.contract.ownerOf(1);
            assert.equal(token1Owner, accounts[0]);
            let token6Owner = await this.contract.ownerOf(6);
            assert.equal(token6Owner, accounts[1]);

            await this.contract.transferFrom(accounts[0], accounts[1], 1);

            token1Owner = await this.contract.ownerOf(1);
            assert.equal(token1Owner, accounts[1]);
            token6Owner = await this.contract.ownerOf(6);
            assert.equal(token6Owner, accounts[1]);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await DRET.new({ from: accounts[0] });
        })

        it('should fail when minting when address is not contract owner', async function () {
            try {
                await this.contract.mint(accounts[0], 9, { from: accounts[1] });
            } catch (error) {
                assert.include(error.message, 'Only owner of contract can perform this operation');
            }
        })

        it('should return contract owner', async function () {
            const owner = await this.contract.owner.call();
            assert.equal(owner, accounts[0]);
        })

    });
})
