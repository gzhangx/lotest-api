//const mongo = require('../lib/mongo');
//const cfg = require('../../conf').mongo;
const get = require('lodash/get');
const models = require('../db/goose');
const {pickUserFields} = require('./util');

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

function stdPage(opt) {
    return {
        skip: get(opt, 'skip') || 0,
        limit: get(opt, 'limit') || 10,
        sort: get(opt, 'sort') || {
            firstName: -1,
        }
    }
}
function saveCustomer(user, customer) {
    customer = Object.assign({}, customer);
    customer.user = pickUserFields(user);
    if (customer._id) {
        const _id = customer._id;
        return models.Customers.update({_id}, customer);
    }
    return new models.Customers(customer).save();
}
function pageCustomers(user, query, opt) {
    opt = stdPage(opt);
    return models.Customers.find(Object.assign({}, query, {
        user:{uuid: user.uuid}
    }), null, opt);
}

//createQuery('users', {username:'gzhang'}).then(r=>console.log(r));
module.exports = {
    findUser,
    cmdInsert,
    saveCustomer,
    pageCustomers,
}