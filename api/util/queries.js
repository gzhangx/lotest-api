//const mongo = require('../lib/mongo');
//const cfg = require('../../conf').mongo;
const models = require('../db/goose');

function findUser(ops) {
    return models.Users.findOne(ops);
}

function cmdInsert(who, record) {
    const newRec = new models[who](record);
    return newRec.save();
    //const a = mongo.createDbOper(cfg, 'qa', who);
    //return a(async (tbl, resolve, reject)=>{
    //    await tbl.insertOne(record, (err,res)=>{
    //        if (err) reject(err); else resolve(res);
    //    });
    //});
}

//createQuery('users', {username:'gzhang'}).then(r=>console.log(r));
module.exports = {
    findUser,
    cmdInsert,
}