pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    address public lastWinner;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        //if below require bool function evaluates to false then the code ahead doesnt execute
        require(msg.value > .01 ether); //automatically converted to appropriate amount of wei
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        lastWinner = players[index]; 
        players = new address[](0);
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns(address[]) {
        return players;
    }
}