const twilio = require('twilio');
function sendSMS(req, res) {
  const {accountSid, authToken} = require('../../conf.json').twilio;
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
        console.log(message.sid)
        res.json(message);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });    
}

module.exports = {   
    sendSMS,
};

