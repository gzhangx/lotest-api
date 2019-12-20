const pick = require('lodash/pick');
const queries = require('../util/queries');
const {getUser} = require('../util/util');

function saveCustomer(req, res) {
  const user = getUser(req);
  const customer = req.body;
  if (!customer) {
    return res.json({
      error:'Must specify customer',
    })
  }

  customer.created = new Date();
  
  return queries.saveCustomer(user, customer).then(rrr=>{
      const r = {
          id: rrr.id
      };
      if (rrr.state) {
        r.state = rrr.state;
      }
      res.json(r);
  });
}

function loadCustomer(req, res) {
  const user = getUser(req);
  const {search, sort = { created:-1}, limit=10, skip=0 } = req.query;  

  
  
  return queries.pageCustomers(user, search, {limit:parseInt(limit), skip:parseInt(skip),sort}).then(rrr=>{
       res.json(rrr);
  });
}

module.exports = {   
    saveCustomer,
    loadCustomer,
};

