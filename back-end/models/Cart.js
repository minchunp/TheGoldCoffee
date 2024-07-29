const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartSchema = new Schema({
    id: { type: ObjectId }, //khóa chính
    matk: { type: String },
    tenkh: { type: String },
    sdt: { type: String },
    diachi: { type: String },
    ngaymua: { type: String },
    trangthai: { type: Number },
    chitiet: [{
        masp: { type: String },
        tensp: { type: String },
        giasp: { type: Number },
        anhsp: { type: String }
    }]
}, { versionKey: false });

module.exports = mongoose.models.cart || mongoose.model('cart', cartSchema);