class block{
    constructor(index,data,prehash,hash,next,pre){
        this.index = index;
        this.data = data;
        this.prehash = prehash;
        this.hash = hash;
        this.next = next;
        this.pre = pre;
    }

    getIndex(){
        return this.index;
    }

    getData(){
        return this.data;
    }

    getPreHash(){
        return this.prehash;
    }

    getHash(){
        return this.hash;
    }

    getNext(){
        return this.next;
    }

    getPre(){
        return this.pre;
    }

    setNext(next){
        this.next = next;
    }
}

module.exports = block;