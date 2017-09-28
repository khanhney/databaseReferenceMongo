const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const MatHangSchema = new Schema({
    tenMatHang: String,
    giaMatHang: String,
    hinhAnh: String
});

const MatHang = mongoose.model('MatHang', MatHangSchema);

module.exports = MatHang;