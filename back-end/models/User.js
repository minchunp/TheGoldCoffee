const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: {type: String},
    username: {type: String},
    pass: {type: String},
    email: {type: String},
    sdt: {type: String},
    diachi: {type: String},
    vt: {type: Number}
}, { versionKey: false });

module.exports = mongoose.models.user || mongoose.model('user', userSchema); //exports 1 model [niếu đã có model user thì lấy or chưa thì tạo model mới từ schema]

//schema là cấu trúc, model gồm schema + phương thức

//phân biệt collection / schema / model