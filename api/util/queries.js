const mongo = require('../lib/mongo');
const cfg = require('../../conf').mongo;
function createQuery(who, qry) {
    const a = mongo.createDbOper(cfg, 'qa', who);
    return a(async (users, resolve)=>{
        resolve(await users.findOne(qry));
    });
}

//createQuery('users', {username:'gzhang'}).then(r=>console.log(r));
module.exports = {
    createQuery,
}