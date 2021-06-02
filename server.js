const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

var data = []


// app.use(
//     cors({
//         origin : 'http://localhost:3000',
//         credentials:true,
//         optionSuccessStatus:200,
//         methods : 'GET'
//     })
// )

// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","Origin");

//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods','GET,POST');
//         return res.status(200).json({});
//     }
//     next();
// })


app.use(express.urlencoded({ extended:true }))
app.use(express.json())

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

app.get("/cors", function(req, res){
    res.sendFile(__dirname+'/frontend/html/corsTrail.html')
})

app.get("/login", function(req, res){
    res.sendFile(__dirname+'/frontend/html/login.html')
})
app.get("/register", function(req, res){
    res.sendFile(__dirname+'/frontend/html/register.html')
})


app.get("/crawler", function(req, res){
    res.sendFile(__dirname+'/frontend/html/cfcrawler.html')
})


app.get('/housie',(req,res)=>{
    res.sendFile(__dirname+'/frontend/html/housie.html')
})






app.get("/todo", function(req, res){
    res.sendFile(__dirname+'/frontend/html/todo.html')
})





app.get("/todoAPI", function(req, res){
    res.sendFile(__dirname+'/frontend/html/todoAPI.html')
})

app.post("/todoAPI",function(req,res){
    var d = req.body.task;
    data.push([d,'fa fa-check','none']);
    res.redirect('/todoAPI')
})

app.get("/api/todoAPI",function(req,res){
    var f = {
        status : "ok",
        result : data
    }
    res.end(JSON.stringify(f))
});

app.delete("/api/todoAPI/:id",function(req,res){
    data.splice(parseInt(req.params.id),1);
});

app.put("/api/todoAPI/:id",function(req,res){

    data[parseInt(req.params.id)][1] = 'fa fa-window-close';
    data[parseInt(req.params.id)][2] = 'line-through';
    var f = {
        status : "ok",
        result : data
    }
    // res.end(JSON.stringify(f))
});