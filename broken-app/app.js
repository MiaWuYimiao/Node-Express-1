const express = require('express');
let axios = require('axios');
var app = express();
const ExpressError = require('./expressError');

app.use(express.json());

app.post('/', async function(req, res, next) {
  try {
    if(!req.body.developers) throw new ExpressError("Error of sent body. Please send JSON body in format of '{developers: [username, ...]}'", 404);
    let results = await Promise.all(req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    }));
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch(err) {
    next(err);
  }
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err.message
  });
});

app.listen(3000);
