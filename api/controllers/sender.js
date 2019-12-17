const twilio = require('twilio');
const pick = require('lodash/pick');
const queries = require('../util/queries');
const {getUser} = require('../util/util');

function sendSMS(req, res) {
  const {accountSid, authToken} = require('../../conf.json').twilio;

  const user = getUser(req);
  const client = require('twilio')(accountSid, authToken);
  const {message, from, to} = req.body;
  if (!message || !from || !to) {
    return res.json({
      error:'Must specify message, from or to',
    })
  }
  
  client.messages
    .create({
      body: message,
      from,
      to
    })
    .then(message => {
        console.log(message.sid);
        return queries.cmdInsert("MessagesSent", {
          user,
          time: new Date(),
          status: 'Sent',
          data: pick(message,['accountSid','apiVersion','body','dateCreated','dateUpdated','direction','from','price','priceUnit','sid','status','to','uri']),
        }).then(saved=>{
          const sid = saved.id.toString();
          message.sid = sid;
          res.json(message);
        });        
    }).catch(err => {
      console.log(err);
      return queries.cmdInsert("messagesSent", {
        user,
        time: new Date(),
        status: 'Error',
        data: pick(message,['accountSid','apiVersion','body','dateCreated','dateUpdated','direction','from','price','priceUnit','sid','status','to','uri','errorCode','errorMessage']),
      }).then(()=>res.json(err));
    });    
}

module.exports = {   
    sendSMS,
};

