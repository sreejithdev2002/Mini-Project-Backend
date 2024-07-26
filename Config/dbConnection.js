const mongoose = require("mongoose");

module.exports = {
  dbConnect: async () => {
    try {
      await mongoose
        .connect(
          process.env.MONGODB_URL || "mongodb+srv://sreejithdev2002:bjauscs005@shoooz.qdwdkf3.mongodb.net/shoooz",
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            heartbeatFrequencyMS: 500,
            serverSelectionTimeoutMS: 500,
          }
        )
        .then(() => {
          console.log("MongoDB Connected Successfully");
        });
    } catch (err) {
      console.log(err);
    }
  },
};