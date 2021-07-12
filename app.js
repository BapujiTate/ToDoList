const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

let items = ["Go to Driving Class", "Exercise"];
let workItems = [];

app.get("/", function(req, res) {

  let day = date.getDate();
  let day2 = date.getDay();

  res.render("list", {
    listTitle: day,
    workingDay: day2,
    newlistItems: items
  });
});


app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }


});

app.get("/work", function(req, res){
  let day2 = date.getDay();
  res.render("list", {listTitle: "Work List", workingDay: day2, newlistItems: workItems});
});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function() {
  console.log("Server is Running");
});
