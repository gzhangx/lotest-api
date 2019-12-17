const mongoose = require('mongoose');
const cfg = require('../../conf').mongo;
const fs = require('fs');
const startCase = require('lodash/startCase');
mongoose.connect(cfg.url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const modelDir = 'api/db/models';
const modelFiles = fs.readdirSync(modelDir);
console.log(modelFiles)

const modelAry = modelFiles.map(fname=>{
  const collection = fname.replace('.json','');
  const name = startCase(collection).replace(' ','');
  const schema = JSON.parse(fs.readFileSync(`${modelDir}/${fname}`));
  console.log(`${name} ${collection}`);
  console.log(schema);
  return {
    name,
    model: mongoose.model(collection, new mongoose.Schema(schema, {collection}))
  }
});
//const User = mongoose.model('users', new mongoose.Schema({username:'String',email:'String',id:'Number'})); //
const models = modelAry.reduce((acc, m)=>{
  acc[m.name] = m.model;
  return acc;
},{});

db.once('open', function() {
  console.log('db connected');    
});

//models.MessagesSent.find().then(res=>console.log(res));
//models.Users.find().then(res=>console.log(res));
new models.MessagesSent({test:"test"}).save()
module.exports = models;
