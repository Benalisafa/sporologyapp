const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Get the token from the request headers, query parameters, or cookies
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    // Set the decoded user information on the request object
    req.user = decoded.user;
    next();
  });
};

module.exports = authenticateUser;