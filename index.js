const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({ extended: false });
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const app = express();

const User = require('./Model/User');
const MatHang =require('./Model/MatHang');


app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

// App Router
app.post('/mathang', bodyParser, (req, res)=>{
   const {userId, tenMatHang, giaMatHang, hinhAnh} = req.body;
   User.themMatHangId(userId, tenMatHang, giaMatHang, hinhAnh)
   .then(()=> res.send({message: 'themMatHangId OK'}))
   .catch(err => console.log(err.message));
}); 
// tạo user trước khi đăng hàng

app.post('/user', bodyParser, (req, res)=>{
    // const {name} = req.body;
    const user = new User(req.body);
    user.save()
    .then(() => ()=>{
        res.send({message:'ThanhCong'});
    }).catch(err => console.log(err.message));
})

// End App Router
const uri = 'mongodb://localhost/shop2';
mongoose.connect(uri, {useMongoClient: true});
mongoose.connection.once('open', ()=>{
    app.listen(3000, ()=> console.log('server start at port 3000'));
})