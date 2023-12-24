import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
	window.ethereum.request({ method : "eth_requestAccounts"});
	web3 = new Web3(window.ethereum);
} else {
	//We are on the server OR the user isn't running metamask
	const provider = new Web3.providers.HttpProvider(
	'https://rinkeby.infura.io/v3/05f4c8be22474e0585d7957e0f902790'
	);
	web3 = new Web3(provider);
}



export default web3;