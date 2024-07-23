require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./Config/dbConnection");
const app = express();
const userRouter = require("./Route/UserRouter");
const adminRouter = require("./Route/AdminRouter");
const path = require("path");

dbConnection.dbConnect();

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'https://shoooz.vercel.app', // Replace with your local frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use("/", userRouter);
app.use("/admin", adminRouter);

app.use("/public", express.static(path.join(__dirname, "public")));
