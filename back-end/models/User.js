const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name_user: { type: String },
    email_user: { type: String, unique: true },
    phoneNumber_user: { type: String },
    pass_user: { type: String },
    address_user: { type: String },
    role_user: { type: String },
    status_user: { type: Number, default:1 }
    // tokens: { type: Array }
  },
  { versionKey: false }
);

module.exports = mongoose.models.user || mongoose.model("user", userSchema);
