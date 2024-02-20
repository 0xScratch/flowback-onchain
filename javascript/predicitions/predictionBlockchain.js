const { ethers } = require('ethers');
require('dotenv').config({path: '../.env'});
const contractABI = require('../contractABI.json');
const createPoll = require('../polls/pollsBlockchain');
const createProposal = require('../polls/pollsBlockchain');
// const getProposals = require('./pollsBlockchain');

const provider = new ethers.providers.InfuraProvider('sepolia', process.env.INFURA_API_KEY);
const wallet = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);


const contractAddress = '0xA58c7359fFd9DCC380a95C8092487F28AC5039DF';

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const createPrediction = async(pollId, proposalId, prediction)=> {
    try {
        // const proposals = await getProposals(pollId);
        // console.log(proposals);
        const tx = await contract.createPrediction(pollId, proposalId, prediction);
        const txReceipt = await tx.wait();
        console.log(txReceipt);
    } catch (error) {
        console.log(error.error.reason);
        console.log(error.error);
    }
    
}
const placePredictionBet = async(pollId, proposalId, predictionId, likelihood, bet)=> {
    try {
        const tx = await contract.placePredictionBet(pollId, proposalId, predictionId,likelihood, bet);
        const txReceipt = await tx.wait();
        console.log(txReceipt);
    } catch (error) {
        console.log(error.error.reason);
    }
    
}
const getPredicions = async(pollId,proposalId) =>{
    try {
        const tx = await contract.getPredicions(pollId, proposalId);
        tx.map(info => console.log(parseInt(info.proposalId), info.description));
    } catch (error) {
        console.log(error.error.reason);
    }
}

//createPoll("Poll", "poll", 1, 1, 1, 1, 1, 1)
// createProposal(2,"proposal");
createPrediction(1,1,"prediction");
//createPredictionBet(1,1,1,10,true);