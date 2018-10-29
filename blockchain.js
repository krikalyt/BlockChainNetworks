var blockstructure = require("./block");
const crypto = require('crypto');


class blockchain{
    constructor(){
        this.genesis = null;
        this.current = null;
    }

    generateHash(data){
        const hash = crypto.createHash('sha256')
                   .update(data)
                   .digest('hex');
        return hash;
    }

    insertBlock(block){
        if(this.genesis==null){
            this.genesis=block;
            this.current=this.genesis;
            return;
        }
        var index = block.index;
        if(index==2){
            this.genesis.setNext(block);
            this.current = this.genesis.next;
            return;
        }
        this.current.setNext(block);
        this.current=this.current.next;
    }

    generateBlock(data){
        if(this.genesis==null){
            var block = new blockstructure(1,data,null,this.generateHash(JSON.stringify(data)),null,null);
            return block;
        }
        var index = this.current.index+1;
        var preHash = this.current.getHash();
        var tobehash = preHash+data;
        var Hash = this.generateHash(tobehash);
        var pre = this.current;
        var block = new blockstructure(index,data,preHash,Hash,null,pre);
        return block;
    }

    getAllData(){
        var counter=this.genesis;
        var list = [];
        while(counter!=null){
            list.push(counter.data+"\t"+counter.hash);
            counter=counter.next;
        }
        return list;
    }

}

module.exports=blockchain;