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
        this.setState({account: accounts});
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
            console.log(this.state);
            console.log(this.state.contract);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            contract: null
        }
    }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}

export default App;