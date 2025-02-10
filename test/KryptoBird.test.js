const assert = require('chai');

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
            contract = await KryptoBird.deployed()
            
        })
        
    });
    

})