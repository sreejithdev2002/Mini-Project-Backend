// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dbConnection = require("./Config/dbConnection");
// const app = express();
// const userRouter = require("./Route/UserRouter");
// const adminRouter = require("./Route/AdminRouter");
// const path = require("path");

// dbConnection.dbConnect();

// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server started at port ${PORT}`);
// });

// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: "https://shoooz.vercel.app",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: "Content-Type,Authorization",
// };

// app.use(cors(corsOptions));
// app.use("/", userRouter);
// app.use("/admin", adminRouter);

// app.use("/public", express.static(path.join(__dirname, "public")));


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./Config/dbConnection");
const path = require("path");

const userRouter = require("./Route/UserRouter");
const adminRouter = require("./Route/AdminRouter");

const app = express();
dbConnection.dbConnect();

const PORT = 8000;

// CORS Configuration
const corsOptions = {
  origin: "https://shoooz.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS before any routes
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Max 100 requests per IP per minute
});

app.use(limiter);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/public", express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
