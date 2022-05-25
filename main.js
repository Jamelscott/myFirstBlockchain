const SHA256 = require("crypto-js/sha256");
let date = Date.now();
let today = new Date(date);
let trueDate = String(today.toDateString());

class Block {
  constructor(data, index, timestamp, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    return new Block(0, "01/01/2022", "Genesis Block", "0");
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.timestamp = trueDate;
    newBlock.index = this.chain.length;
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  validateChain() {
    for (let i = 1; i < this.chain.length; i++) {
      let currentBlock = this.chain[i];
      let previousBlock = this.chain[i - 1];

      if (currentBlock.previousHash != previousBlock.calculateHash()) {
        return false;
      }
    }
    return true;
  }
}

const jamelCoin = new Blockchain();

jamelCoin.addBlock(new Block({ amount: "100 bitcoin" }));
jamelCoin.addBlock(new Block({ amount: "1000 bitcoin" }));
console.log("before:", jamelCoin.validateChain());
jamelCoin.chain[1].data = { amount: "1,000,000 bitcoin" };
console.log("after:", jamelCoin.validateChain());
console.log(jamelCoin);
console.log(jamelCoin.chain[1].data);
