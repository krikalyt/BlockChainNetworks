var express = require("express");
var DataList = require("./datalist");
var app = express();
var fetch = require('node-fetch');
var datalist = new DataList();
var connection = ['http://localhost:3000','http://localhost:3001','http://localhost:3002','http://localhost:3003'];


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
    //dont forget to filter IP otherwise anyone can add data to the datalist
    //this route is for broadcasting data throughput all the network 
    //so filter ip and allows only yorself to broadcast
    var data = req.params.data;
    datalist.addData(data);
    res.send("done");
});


//toprint all the data of block
app.get("/all",(req,res)=>{
    var result = datalist.getTheblocksData();
    res.send(result);
});

//for listen
var port = process.env.PORT || 3000;
app.listen(port,(err)=>{
    try{
        if(err){return console.log("Unable to start the server")};
        console.log("Server has been started at port no "+port);
    }catch(error){
        console.log(error);
    }
});
