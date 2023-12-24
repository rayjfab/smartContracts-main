pragma solidity ^0.4.17;
contract Inbox {
    string public message;
    
function Inbox(string initialMessage) public {
    message = initialMessage;    
}

function setMessage(string newMessages) public {
    message = newMessages;
}
}