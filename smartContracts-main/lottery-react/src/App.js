import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
  state = {
    manager : '',
    players : [],
    balance : '',
    value : '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success..'});
    await lottery.methods.enter().send({
      from: accounts[0], 
      value: web3.utils.toWei(this.state.value, 'ether')
    })

    this.setState({message: 'You have been registered'});
  };

  onClick = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transction success........'})
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const winnerAddr = await lottery.methods.lastWinner().call();
    console.log("WA",winnerAddr);//address of the winner of the last draw
    this.setState({message: 'A winner has been picked!'});
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p> 
        This contract is managed by {this.state.manager}. 
        There are currently {this.state.players.length} people entered
        competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enteer</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({value: event.target.value})}
            />
            <button>Enter</button>
          </div>
          <hr />
          <h4>Ready to pick a winner?</h4>
          <button onClick={this.onClick}>Pick a winner!</button>
          <hr />
          <h1>{this.state.message}</h1>

        </form>
      </div>
    );
  }
}
export default App;
