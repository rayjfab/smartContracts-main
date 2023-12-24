// compile code will go here
const path = require('path'); //allows for compatibility across platforms
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

const source = fs.readFileSync(inboxPath, 'utf8');
module.exports = solc.compile(source, 1).contracts[':Inbox']; // no of diff contracts we attempt to compile
//module.exports helps make the compiled code available to everyone

