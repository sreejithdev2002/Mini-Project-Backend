require("dotenv").config();
const mongoose = require("mongoose");

module.exports = {
  dbConnect: async () => {
    try {
      await mongoose
        .connect("mongodb+srv://sreejithdev2002:bjauscs005@shoooz.qdwdkf3.mongodb.net/shoooz", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log("MongoDB Connected Successfully");
        });
    } catch (err) {
      console.log(err);
    }
  },
};
