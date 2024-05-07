const express = require("express");
const dbConnect = require("./config/dbconnect");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use("/", (req, res) => {
  res.send("SERVER ONNNNN");
});

app.listen(port, () => {
  console.log(`Server is running on this port ` + port);
});
