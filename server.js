const express = require('express');
const app = express();







app.use(express.static(__dirname+'/frontend'));


const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, function(){
    console.log("Server Starting running on http://localhost:"+PORT);
})





app.get("/", function(req, res){
    // res.send("Welcome to Kaushik's Site");
    res.sendFile(__dirname+'/frontend/html/home.html')
})

app.get("/resume", function(req, res){
    res.sendFile(__dirname+'/frontend/html/resume.html')
})

app.get("/google", function(req, res){
    res.sendFile(__dirname+'/frontend/html/google.html')
})

app.get("/apple", function(req, res){
    res.sendFile(__dirname+'/frontend/html/apple.html')
})

app.get("/colors", function(req, res){
    res.sendFile(__dirname+'/frontend/html/colors.html')
})

app.get("/forms", function(req, res){
    res.sendFile(__dirname+'/frontend/html/forms.html')
})

app.get("/login", function(req, res){
    res.sendFile(__dirname+'/frontend/html/login.html')
})
app.get("/register", function(req, res){
    res.sendFile(__dirname+'/frontend/html/register.html')
})