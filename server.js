const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs")


//Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

//Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

//API route for data
app.get("/api/notes", function(req,res){
    res.json(db)
})

app.post("/api/notes", function(req,res){
    //add new note - req.body to the db array
    db.push(req.body);
    fs.writeFile("db/db.json", JSON.stringify(db), err=> {
        if(!err) res.json("success!")})
})

app.delete("/api/notes/:id", function(req, res){
    console.log(`you're deleting note ${req.params.id}`);
    db.splice(req.params.id,1);
    fs.writeFile("db/db.json", JSON.stringify(db), err=> {
        if(!err) res.json("success!")})
})

// app.use("/", htmlRoutes);
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"))
})

//Start the server on the port
app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));