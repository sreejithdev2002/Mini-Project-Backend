require('dotenv').config();
const mongoose = require("mongoose");

module.exports = {
    dbConnect: async () => {
        try {
          await mongoose.connect(process.env.MONGODB_URL).then(() => {
            console.log("MongoDB Connected Successfully");
          });
        } catch (err) {
          console.log(err);
        }
      },
}
