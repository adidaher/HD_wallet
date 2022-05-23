var express = require("express");  
var app = express();  

app.use(express.static("public"));

app.get("/", function(req, res){
	res.sendFile(__dirname + "index.html");
})

app.get("/index2", function(req, res){
	res.sendFile(__dirname + "index2.html");
})


app.get("/index", function(req, res){
	res.sendFile(__dirname + "index.html");
})



app.listen(8080);