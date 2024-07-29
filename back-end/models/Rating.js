const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ratingSchema = new Schema({
    id: { type: ObjectId }, //khóa chính
    matk: { type: String },
    masp: { type: String },
    noidung: { type: String },
    rating: { type: Number },
    thoigian: { type: String }
}, { versionKey: false });

module.exports = mongoose.models.rating || mongoose.model('rating', ratingSchema);