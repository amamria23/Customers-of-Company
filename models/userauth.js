const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// define the Schema (the structure of the article)
const userAuthSchema = new Schema({
  username: String,
  email: String,
  password: String,
  customerInfo: [
    {
      FirstName: String,
      LastName: String,
      Email: String,
      Telephone: Number,
      Age: Number,
      country: String,
      gender: String,
      createdAt: Date,
      updateAt: { type: Date, default: Date.now },
    },
  ],
  profileImg: String,
}, { timestamps: true });
userAuthSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create a model based on that schema
const UserAuth = mongoose.model("User", userAuthSchema);

// export the model
module.exports = UserAuth;
