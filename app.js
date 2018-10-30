var express = require("express");
var DataList = require("./datalist");
var mode = require("./arraythings");
var JSON = require("circular-json");
var app = express();
var fetch = require('node-fetch');
var datalist = new DataList();
var connection = ['http://127.0.0.1:3000','http://127.0.0.1:3001','http://127.0.0.1:3002'];
var arrayofminedHash = [];

//this router will use to receive the data from client and it will broadcast the data through all the network using http request
app.get("/adddata/:data",async (req,res)=>{
    var data = req.params.data;
    for (var i in connection) {
        try {
            fetch(connection[i]+"/datalist/"+data);
        } catch (error) {
            console.log(error);
            continue;
        }
    }
    res.send("Added in Blockchain");
});


//this router will use in adding data to datalist
app.get("/datalist/:data",(req,res)=>{
    var trustedIps = ['127.0.0.1'];
    var requestIP = req.connection.remoteAddress;
    if(trustedIps.indexOf(requestIP) >= 0) {
        var data = req.params.data;
        datalist.addData(data);
        res.send("done");
    } else {
        res.status(404).send("you are now allowed");
    }
});

app.get("/minedHash",(req,res)=>{
    var trustedIps = ['127.0.0.1'];
    var requestIP = req.connection.remoteAddress;
    if(trustedIps.indexOf(requestIP) >= 0) {
        res.send(datalist.getMinedblockHash());
    } else {
        res.status(404).send("you are now allowed");
    }
});

app.get("/",(req,res)=>{
    res.send(datalist.Data);
})

//There are some problem in this loud...
app.get("/finalconsensus",async (req,res)=>{
    var trustedIps = ['127.0.0.1'];
    var requestIP = req.connection.remoteAddress;
    if(trustedIps.indexOf(requestIP) >= 0) {
        //code start from here 
        for(var i in connection){
            var data = await fetch(connection[i]+"/minedHash");
            var data = await data.text();
            arrayofminedHash.push(data);
        }
        var mostoccurHash = mode(arrayofminedHash);
        if(mostoccurHash==datalist.getMinedblockHash()){
            datalist.inserttoblockchain();
            console.log("everything is working fine.")
        }else{
            for(var i in connection){
                var data = await fetch(connection[i]+"/minedHash");
                var data = await data.text();
                if(data==datalist.getMinedblockHash()){
                    var data2 = await fetch(connection[i]+"/completebc");
                    var data2 = await data2.json();
                    datalist.setCompleteBlockchain(data2);
                    break;
                }
            }
        }  
        res.send("Done Ho gaya");
    }
    else{
        res.status(404).send("Can not do operation wrong ip is here.");
    }
})

//this is router for getting complete data from different network if network got wrong data then use this router to get data back;
app.get("/completebc",(req,res)=>{
    var trustedIps = ['127.0.0.1'];
    var requestIP = req.connection.remoteAddress;
    if(trustedIps.indexOf(requestIP) >= 0) {
        res.send(JSON.stringify(datalist.getCompleteBlockChain()));
    }
})

//toprint all the data of block
app.get("/all",(req,res)=>{
    var result = datalist.getTheblocksData();
    res.send(result);
});

//for listen
var port = process.env.PORT || 3000;
app.listen(port,'0.0.0.0',(err)=>{
    try{
        if(err){return console.log("Unable to start the server")};
        console.log("Server has been started at port no "+port);
    }catch(error){
        console.log(error);
    }
});
