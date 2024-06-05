require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./Config/dbConnection");
const app = express();
const userRouter = require("./Route/UserRouter");
const adminRouter = require("./Route/AdminRouter");
const path = require("path");

//database config
dbConnection.dbConnect();

//config
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());
app.use("/", userRouter);
app.use("/admin", adminRouter);

app.use("/public", express.static(path.join(__dirname, "public")));
