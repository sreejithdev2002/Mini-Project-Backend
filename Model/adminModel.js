const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

adminSchema.pre("save", async function (next){
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
});

module.exports = new mongoose.model("admin", adminSchema)