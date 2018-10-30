var app = require("express")();
var JSON = require("circular-json");
var fetch = require("node-fetch");
app.get("/",async (req,res)=>{
    var data = await fetch("http://127.0.0.1:3000/completebc");
    var data2 = await data.json();
    res.send(data2);
});

app.listen(3434);