const twilio = require('twilio');
function sendSMS(req, res) {
    const {accountSid, authToken} = require('../../conf.json');
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
      body: 'This is a test for Luminous Nail Spa 3',
      from: '+12162848800',
      to: '+16786093557'
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

