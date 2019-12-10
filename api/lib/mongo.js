const Promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;
//const url = require('../../conf').mongo.url;

function doDbOper(cfg, op) {
    return new Promise((resolve, reject)=>{
        MongoClient.connect(cfg.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, async function(err, client) {
            if (err) return reject(err);
            try {
                resolve(await op(client));
            } catch(err) {
                reject(err);            
            } finally {
                client.close();
            }
        });
    });
}


function createDbOper(cfg, db, collection) {
    return action=>{
        return new Promise((resolve,reject)=>{
                return doDbOper(cfg, client=>{
                const qa = client.db(db);
                const col = qa.collection(collection);
                return action(col, resolve, reject);  
            });          
        });
    }
}

module.exports = {
    doDbOper,
    createDbOper,
};

//const a = createDbOper(require('../../conf').mongo, 'qa', 'users');
//a(async (users, resolve)=>{
//    resolve(await users.findOne({username:'gzhang'}));
//}).then(rr=>console.log(rr));
