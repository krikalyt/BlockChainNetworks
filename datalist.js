var blockchain = require("./blockchain");
var blockc = new blockchain();
var fetch = require("node-fetch");


class DataList{
    constructor(){
        this.Data=[];
        this.mineblock=null;
    }

    addData(data){
        this.Data.push(data);
        if(this.getLength()>=5 && this.mineblock==null){
            this.startMine();
        }
    }

    startMine(){
        this.mineblock = blockc.generateBlock(this.getDataformine());
    };

    inserttoblockchain(){
        blockc.insertBlock(this.mineblock);
        this.mineblock=null;
    }

    getLength(){
        return this.Data.length;
    }
    getDataformine(){
        var data = this.Data.slice(0,5);
        this.Data = this.Data.slice(5);
        return data;
    }
    getWhole(){
        return this.Data;
    }

    getTheblocksData(){
        return blockc.getAllData();
    }

    getMinedblockHash(){
        if(this.mineblock==null){
            return null;
        }
        return this.mineblock.getHash();
    }

    getCompleteBlockChain(){
        return blockc.genesis;
    }

    setCompleteBlockchain(data){
        blockc.genesis = data;
        this.mineblock = null;
    }
}

module.exports = DataList;