const mongo = require('../lib/mongo');
const cfg = require('../../conf').mongo;
function createQuery(who, qry) {
    const a = mongo.createDbOper(cfg, 'qa', who);
    return a(async (tbl, resolve)=>{
        resolve(await tbl.findOne(qry));
    });
}

function cmdInsert(who, record) {
    const a = mongo.createDbOper(cfg, 'qa', who);
    return a(async (tbl, resolve, reject)=>{
        await tbl.insertOne(record, (err,res)=>{
            if (err) reject(err); else resolve(res);
        });
    });
}

//createQuery('users', {username:'gzhang'}).then(r=>console.log(r));
module.exports = {
    cmdInsert,
    createQuery,
}