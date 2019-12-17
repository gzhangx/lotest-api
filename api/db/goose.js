const mongoose = require('mongoose');
const cfg = require('../../conf').mongo;
mongoose.connect(cfg.url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const User = mongoose.model('users', new mongoose.Schema({username:'String',email:'String',id:'Number'})); //

db.once('open', function() {
  console.log('db connected');  
  User.find({},(a,b)=>{
    console.log(a);
    console.log(b);
  })
});


