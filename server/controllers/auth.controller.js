const User = require('../models/user.model')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
exports.signup = (req, res) => {
  let role;

  const route = req.route.path;
    if (route.includes('/signup/member')) {
      role = 'member';
    } else if (route.includes('/signup/partner')) {
      role = 'partner';
    } else {
      // Handle error: invalid route for signup
      return res.status(400).json({ message: 'Invalid signup route' });
    }
    
  const data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    address: req.body.address,
    phone: req.body.phone,
    companyName:req.body.companyName,
    companyAddress: req.body.companyAddress,
    description:req.body.description,
    role: role,
  };

  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }


  const _user = new User(data);

  _user
    .save()
    .then((createdUser) => {
      res.status(200).json({ message: 'User added successfully' });
    })
    .catch((err) => {
      console.error('Error saving user:', err);
      res.status(400).json({ message: 'Error adding user: ' + err.message });
    });
};




exports.signin = async (req , res ) => {


    const { email , password } =req.body

    const user = await User.findOne({ email : email})

    if ( !user ){
        return res.status(400).json({ message: "Invalid Email" })
    }

    bcrypt.compare( password , user.password ).then(

        (isMatch) =>{
            if ( isMatch == false ){
                return res.status(400).json({ message: "Invalid Password" })

            }else{

            
                // Generate a JWT token

                const payload ={
                    userId : user._id ,
                    name: user.firstname, 
                    email: user.email, 
                    role : user.role
                }


                const token = jwt.sign(
                    payload ,
                    process.env.SECRET_KEY,
                    { expiresIn : '1h' }

                    )

                    return res.status(200).json(
                        { 
                           
                            token : token, 
                           
                    })

                    

            }

        }

    )

}

exports.logout = ( req , res ) => {
    res.cookie('jwt', '', { maxAge:1})
    res.status(200).json({ message: "Logged out successfully" });
    res.redirect('/');

}


