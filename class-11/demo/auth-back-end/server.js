'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// this function comes directly from the jasonwebtoken docs
const client = jwksClient({
  // this url comes from your app on the auth0 dashboard 
  jwksUri: 'https://dev-4rwdhvtd.us.auth0.com/.well-known/jwks.json'
});

app.use(cors());

const PORT = process.env.PORT || 3001;

// this function comes directly from the jasonwebtoken docs
function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

app.get('/test', (request, response) => {
  const token = request.headers.authorization.split(' ')[1];
 
  jwt.verify(token, getKey, {}, function(err, user) {
    if (err){
      response.send('invalid token');
    }
    response.send(user);
  });
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
