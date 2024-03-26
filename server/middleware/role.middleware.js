const checkRole = (roles) => (req, res, next) => {
    
    const user = req.user;
    
    if (user && roles.includes(user.role)) {
      next(); 
    } else {
      res.status(403).json({ message: 'Not allowed' }); 
    }
  };
  
  module.exports = checkRole;