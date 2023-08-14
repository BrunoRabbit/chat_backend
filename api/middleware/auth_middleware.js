const jwt = require('jsonwebtoken');
const config = require('config');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).send('Invalid token');
  }

  const cleanToken = token.replace('Bearer ', '');
  jwt.verify(cleanToken, config.jwt.key_secret, (err, decodedToken) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    req.userId = decodedToken.id;
    next();
  });
}

module.exports = authenticateToken;