// deploy code will go here
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('Web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
	'initial patient another sight sting tongue job fashion piano afford unable champion',
	'https://rinkeby.infura.io/v3/05f4c8be22474e0585d7957e0f902790'
);

const web3 = new Web3(provider);

//only written to allow us to use await
const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(interface))
				.deploy({data: bytecode, arguments: ['Hi there!']})
				.send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0]});

	console.log('Address of Contract', result.options.address);
};
deploy();