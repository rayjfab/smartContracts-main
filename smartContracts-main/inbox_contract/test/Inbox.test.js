// contract test code will go here

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // caps because it is a constructor

const web3 = new Web3(ganache.provider()); //specific provider for local netowkr
//in case of rinkeby,kovan providers are different

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INIT_STRING = 'Hi there!';
beforeEach(async () => {
	//get a list of all ganache accounts
	accounts = await web3.eth.getAccounts();
	//use one of those accounts to deploy contract
	//below object represents what is on the blockchain
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ['Hi there!']})
		.send({ from: accounts[0], gas: '1000000'})
});

describe('Inbox', () => {
	//IMPORTANT test
	it('deploys a contract', () => {
		assert.ok(inbox.options.address); //checking that passed value is defined
	});

	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, INIT_STRING);
	});

	it('can change the message', async () =>{
		//throws an error if contract doesnt update
		await inbox.methods.setMessage('bye').send({ from: accounts[0] });
		const message = await inbox.methods.message().call();
		assert.equal(message, 'bye');
	});
});