const User = require('../models/user.model')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

exports.signup = ( req , res ) =>  {


    const data = {
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        email : req.body.email,
        password : bcrypt.hashSync( req.body.password , 10 ) ,
        picture : req.body.picture,
        birthdate : req.body.birthdate,
        address : req.body.address,
        phone : req.body.phone
    }

    const _user = new User(data);

    _user.save().then(
        (createdUser) => {
            res.status(200).json({ message: "User added successfully" });
        }
    ).catch(
        (err) => {
            console.error("Error saving user:", err); // Log the error message
            res.status(400).json({ message: "Error adding user: " + err.message }); // Send error message to client
        }
    );

}

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
                            message : "login Success",
                            token : token, 
                            user : user
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


