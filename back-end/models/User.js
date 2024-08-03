const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name_user: { type: String, required: true },
    email_user: { type: String, required: true, unique: true },
    phoneNumber_user: { type: String, required: true },
    pass_user: { type: String, required: true },
    address_user: { type: String, required: true },
    role_user: { type: String, required: true },
    status_user: { type: Number, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.models.user || mongoose.model("user", userSchema);
