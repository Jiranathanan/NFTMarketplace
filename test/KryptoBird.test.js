const { assert } = require('chai');

const KryptoBird = artifacts.require('./KryptoBird'); /* './Kryptobird' as in abis folder is Kryptobird.json     */

// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

contract('KryptoBird', (accounts) => {
    let contract;
    // use before hook to tell our test to run this first before anything else
    before( async () => {
        contract = await KryptoBird.deployed();
    })

    // testing container - describe
    describe('deployment', async() => {
        // test samples with writing it
        it('deploys successfully', async () => {
            const address = contract.address; 
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, 0x0);
        })
        // 1. Test that the name matches on our contract using the assert.equal function
        // 2. Test that the symbol matches with the assert.equal
        it('has a name', async() => {
            const name = await contract.name();
            assert.equal(name, 'KryptoBird');
        })
        it('has a symbol', async() => {
            const symbol = await contract.symbol();
            assert.equal(symbol, 'KBIRDZ');
        })
        
    });

    describe('minting', async() => {
        it('creates a new token', async() => {
            const result = await contract.mint('https...1');
            const totalSupply = await contract.totalSupply();

            // Success
            assert.equal(totalSupply, 1);
            const event = result.logs[0].args;
            assert.equal(event._from, '0x0000000000000000000000000000000000000000', 'from the contract');
            assert.equal(event._to, accounts[0], 'to is msg.sender');

            // Failure
            await contract.mint('https...1').should.be.rejected;

        })
    });
       

    

})