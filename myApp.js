let express = require('express');
let app = express();
// require('dotenv').config()
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//console.log("Hello World");
// app.get("/", function(req, res) {
//   res.send("Hello Express");
// });
// app.use(express.static(__dirname + "/public"));





app.use("/public", express.static(__dirname + "/public"));

app.use(function logger(req, res, next) {
  // Do something
  var string = req.method + " " + req.path + " - " + req.ip;
  // Call the next function in line:
  console.log(string);
  next();
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toUpperCase();
  } else {
    response = "Hello json";
  }
  res.json({ "message": response });
  // res.json(process.env.MESSAGE_STYLE);
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();  // Hypothetical synchronous operation
    next();
  }, function(req, res) {
    res.send({time: req.time});
  });


app.get("/:word/echo", (req, res) => {
    res.json({"echo":req.params.word});
  });

app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});

app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});























module.exports = app;
