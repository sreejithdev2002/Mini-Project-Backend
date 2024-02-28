require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./Config/dbConnection");
const app = express();

//database config
dbConnection.dbConnect();

//config
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
