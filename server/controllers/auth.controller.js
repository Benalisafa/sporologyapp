const User = require('../models/user.model')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const multer = require('multer');
const path = require('path');


exports.signup = async (req, res) => {
  console.log('Received request:', req.body);

  let role;
  let partnerType;

  const route = req.route.path;
  if (route.includes('/signup/member')) {
    role = 'member';
  } else if (route.includes('/signup/partner')) {
    role = 'partner';

    const { companyName, companyAddress } = req.body;
    partnerType = companyName && companyAddress ? 'company' : 'individual';
  } else {
    return res.status(400).json({ message: 'Invalid signup route' });
  }

  const pictureFilename = req.file ? req.file.filename : null;
  console.log("pictureFilename", pictureFilename);

  const { password, confirmPassword, firstname, lastname, email, age, address, phone, genre, status, location, companyName, companyAddress, description } = req.body;

  if (!password || password.trim() === '') {
    return res.status(400).json({ message: 'Password is required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const data = {
    firstname,
    lastname,
    email,
    age,
    picture: pictureFilename,
    password: hashedPassword,
    address,
    phone,
    genre,
    status,
    location,
    companyName,
    companyAddress,
    description,
    partnerType,
    role,
  };

  try {
    const _user = new User(data);
    await _user.save();
    res.status(200).json({ message: 'User added successfully' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
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


