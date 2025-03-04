import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/KryptoBird.json'; 

class App extends Component{

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockChainData();
    }

    // first detect the ethereum provider
    async loadWeb3() {
        const provider = await detectEthereumProvider();

        if(provider) {
            console.log("Ethereum wallet is connected");
            // await provider.request({ method: 'eth_requestAccounts'}); // This will prompt MetaMask to connect and request account access
            window.web3 = new Web3(provider);
        } else {
            console.log("No Ethereum wallet detected");
        }
    }

    async loadBlockChainData() {
        const web3 = window.web3;
        // const accounts = await window.web3.eth.getAccounts(); // deprecated
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        this.setState({account: accounts[0]});
        // network id
        const networkId = await web3.eth.net.getId();
        const networkData = KryptoBird.networks[networkId];

        if(networkData) {
            // create a var abi set to the Kryptobird abi
            const abi = KryptoBird.abi;
            // create a var address set to networkData address
            const address = networkData.address;
            // create a var contract which grabs a new instance of web3 eth contract
            const contract = new web3.eth.Contract(abi, address);
            // login the console the var contract successfully
            // console.log(contract);

            this.setState({contract}); // this.setState({contract: contract})
            // console.log(this.state);
            // console.log(this.state.contract);
            // call total supply of our Krypto Birdz
            // grab the total supply on the front end and log the results
            const totalSupply = await contract.methods.totalSupply().call();
            // set to state
            this.setState({totalSupply});
            // console.log(this.state.totalSupply);
            // set up an array to keep track of tokens
            // load KryptoBirdz 
            for (let i = 1; i <= totalSupply; i++) {
                const KryptoBird = await contract.methods.kryptoBirdz(i - 1).call();
                this.setState({
                    kryptobirdz: [...this.state.kryptobirdz, KryptoBird]
                })
            }
            // console.log(this.state.kryptobirdz);


        } else {
            window.alert('Smart contract not deployed');
        }
    }

    mint = (kryptoBird) => {
        this.state.contract.methods.mint(kryptoBird).send({from: this.state.account})
        .once('receipt', (receipt) => {
            this.setState({
                kryptobirdz: [...this.state.kryptobirdz, kryptoBird]
            })
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            contract: null,
            totalSupply: 0,
            kryptobirdz: []
        }
    }

    render() {
        return (
            <div>
                {console.log(this.state.kryptobirdz)}
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <div className="navbar-brand col-sm-3 col-md-3 mr-0" style={{color:'white'}}>
                        Krypto Birdz NFTs 
                    </div>
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                            <small className="text-white">{this.state.account}</small>
                        </li>
                    </ul>
                </nav>

                <div className="container-fluid mt-1">
                    <div className="row">
                        <main role="main" className="col-lg-12 d-flex text-center">
                            <div className="content mr-auto ml-auto" 
                                style={{opacity: '0.8', marginTop:'50px'}}>
                                <h1>KryptoBirdz - NFTs Marketplace</h1>
                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    const kryptoBird = this.kryptoBird.value 
                                    this.mint(kryptoBird)
                                }}>
                                    <input 
                                        type="text"
                                        placeholder="Add a file location"
                                        className="mb-1 mt-4"
                                        ref={(input) => this.kryptoBird = input}
                                    />
                                    <input
                                        type="submit"
                                        className="btn btn-primary btn-black mt-1"
                                        value='MINT'
                                        style={{margin:'6px'}}
                                    />
                                </form>
                            </div>

                        </main>

                    </div>
                </div>

            </div>
        )
    }
}

export default App;