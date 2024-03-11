const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
        message: "Login In Required!"
      });
  }
  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Error during the process!"
      });
    }
    req.user = user;
    if(user.email=="christianinja3@gmail.com"){
        next();
    }else{
        return res.status(404).json({
            message: "This is for Admin only"
        })
    }
    
  });
}
module.exports={authenticateToken}