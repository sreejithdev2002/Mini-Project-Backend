const mongoose = require("mongoose");

module.exports = {
  dbConnect: async () => {
    try {
      await mongoose
        .connect(
          process.env.MONGODB_URL,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Adjust the timeout as needed
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
