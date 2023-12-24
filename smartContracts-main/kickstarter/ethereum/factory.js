import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0x05Da4d9266A547Df10C900314fe3289b7EF94133'
);

export default instance;