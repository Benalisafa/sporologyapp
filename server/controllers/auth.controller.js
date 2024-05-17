const User = require('../models/user.model')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const multer = require('multer');
const path = require('path');

const fs = require('fs');

const storage = multer.diskStorage({
  destination: './images/profile/', 
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Extract file extension
    const filename = Date.now() + ext; // Generate unique filename with original extension
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });


exports.signup = async (req, res) => {
  console.log('Received request with password:', req.body.password);
  console.log('Received request:', req.body);

  let role;
  let partnerType;

  const route = req.route.path;
  if (route.includes('/signup/member')) {
    role = 'member';
  } else if (route.includes('/signup/partner')) {
    role = 'partner';
    partnerType = req.body.partnertype;
    
  } else {
    return res.status(400).json({ message: 'Invalid signup route' });
  }

  // Handle picture upload
  upload.single('picture')(req, res, async (err) => {
    if (err) {
      console.error('Error uploading picture:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }


    
    const pictureFilename = req.file ? req.file.filename : null;
    console.log("pictureFilename", pictureFilename); 

    // Check if password exists in req.body and is not empty
    if (!req.body.password || req.body.password.trim() === '') {
      return res.status(400).json({ message: 'Password is required' });
    }

    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      picture: pictureFilename,
      password: bcrypt.hashSync(req.body.password, 10), // Hash password
      address: req.body.address,
      phone: req.body.phone,
      companyName: req.body.companyName,
      companyAddress: req.body.companyAddress,
      description: req.body.description,
      partnerType: partnerType,
      role: role,
    };

    // Validate data
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
      // Save user data
      const _user = new User(data);
      await _user.save();
      res.status(200).json({ message: 'User added successfully' });
    } catch (err) {
      console.error('Error saving user:', err);
      res.status(400).json({ message: 'Error adding user: ' + err.message });
    }
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


