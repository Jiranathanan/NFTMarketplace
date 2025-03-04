import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/KryptoBird.json'; 

class App extends Component{

    async componentDidMount() {
        await this.loadWeb3();
    }

    // first detect the ethereum provider
    async loadWeb3() {
        const provider = await detectEthereumProvider();

        if(provider) {
            console.log("Ethereum wallet is connected");
            await provider.request({ method: 'eth_requestAccounts'}); // This will prompt MetaMask to connect and request account access
            window.web3 = new Web3(provider);
        } else {
            console.log("No Ethereum wallet detected");
        }
    }

    render() {
        return (
            <div>
                <h1>NFT Marketplace App</h1>
            </div>
        )
    }
}

export default App;