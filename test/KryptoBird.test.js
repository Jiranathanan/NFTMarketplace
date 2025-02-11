const { assert } = require('chai');

const KryptoBird = artifacts.require('./KryptoBird'); /* './Kryptobird' as in abis folder is Kryptobird.json     */

// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

contract('KryptoBird', (accounts) => {
    let contract;

    // testing container - describe
    describe('deployment', async() => {
        // test samples with writing it
        it('deploys successfully', async () => {
            contract = await KryptoBird.deployed();
            const address = contract.address; 
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, 0x0);
        })
        // 1. Test that the name matches on our contract using the assert.equal function
        // 2. Test that the symbol matches with the assert.equal
        it('has a name', async() => {
            const name = contract.name();
            assert.equal(name, 'KryptoBird');
        })
        it('has a symbol', async() => {
            const symbol = contract.symbol();
            assert.equal(symbol, 'KBIRDZ');
        })
        
    });

       

    

})