const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const MatHang = require('./MatHang');

const Schema  = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    MatHangs : [{
        type: Schema.Types.ObjectId,
        ref: 'MatHang'
    }]
});

const User = mongoose.model('User', UserSchema);

User.themMatHangId = async (userID, tenMatHang, giaMatHang, hinhAnh) =>{
    const mathang = new MatHang({tenMatHang, giaMatHang, hinhAnh});
    await mathang.save();
    await User.findByIdAndUpdate(userID, {$push: {MatHangs: mathang}});
}
module.exports = User;