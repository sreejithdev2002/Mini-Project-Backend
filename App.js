require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./Config/dbConnection");
const app = express();
const userRouter = require("./Route/UserRouter");
const adminRouter = require("./Route/AdminRouter");

//database config
dbConnection.dbConnect();

//config
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});


app.use(cors())
app.use("/", userRouter)
app.use("/admin", adminRouter)