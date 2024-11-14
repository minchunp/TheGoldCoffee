const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    id_pro: { type: String },
    id_user: { type: String },
    name_user: { type: String },
    email: { type: String },
    content_comment: { type: String },
    date_comment: { type: Date },
  },
  { versionKey: false }
);

module.exports =
  mongoose.models.comment || mongoose.model("comment", commentSchema);
