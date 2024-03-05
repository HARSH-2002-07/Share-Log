const express = require('express');
const body_parser = require('body-parser');

const app = express();
const port = 3000;

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7','Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7','Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7','Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'];
var hasRecording = new Boolean(0);

app.use(body_parser.urlencoded({ extended: true}));
// app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname + '/views/public'));

app.get("/", (req, res)=>{
    res.render("index.ejs");
});
app.get("/portfolio", (req, res)=>{
    res.render("index1.ejs")
});
app.get("/positons", (req, res)=>{
    res.render("index2.ejs", {list: items, isavailable: hasRecording})
});
app.listen(port, ()=>{
    console.log(`server running on port: ${port}`)
});