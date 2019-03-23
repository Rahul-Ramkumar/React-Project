
const mongoose = require("mongoose");
const express = require("express");
const Data = require("./data");

const API_PORT = 3002;
const app = express();
const router = express.Router();


//DB connection info
const dbRoute = "mongodb://localhost:27017/sample";

// connects back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));


// to remove existing database information
router.delete("/deleteData", (req, res) => {
  const { title} = req.body;
  Data.findOneAndDelete(title, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});


// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { title, description } = req.body;

  data.description = description;
  data.title = title;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));