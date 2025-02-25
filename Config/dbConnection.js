// const mongoose = require("mongoose");

// module.exports = {
//   dbConnect: async () => {
//     try {
//       await mongoose
//         .connect(
//           // process.env.MONGODB_URL || "mongodb+srv://sreejithdev2002:bjauscs005@shoooz.qdwdkf3.mongodb.net/shoooz",
//           process.env.MONGODB_URL ||
//             "mongodb+srv://sreejithdev2002:bjauscs005@shoooz.qdwdkf3.mongodb.net/",
//           {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             heartbeatFrequencyMS: 500,
//             serverSelectionTimeoutMS: 500,
//           }
//         )
//         .then(() => {
//           console.log("MongoDB Connected Successfully");
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   },
// };

const mongoose = require("mongoose");

module.exports = {
  dbConnect: async () => {
    try {
      const MONGO_URI =
        process.env.MONGODB_URL ||
        "mongodb+srv://sreejithdev2002:bjauscs005@shoooz.qdwdkf3.mongodb.net/?retryWrites=true&w=majority";

      console.log("🔄 Connecting to MongoDB...");

      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 10000, // Increased timeout to 10s
        socketTimeoutMS: 45000, // Keep connection alive longer
        // keepAlive: true, // Ensure persistent connection
      });

      console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
      console.error("❌ MongoDB Connection Error:", err);
    }
  },
};
