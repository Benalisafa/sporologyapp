// const jwt = require ('jsonwebtoken')

// const requireAuth = ( req, res, next) => {

//     const Token = req.cookies.jwt;

//     if (token){
//         jwt.verify(Token, process.env.CLE, (err, decodedToken) =>{

//             if (err){
//                 console.log(err.message);
//                 res.redirect('/login');

//             }else{
//                 console.log(decodedToken);
//                 next ()
//             }

//         } )
//     }
//     else {
//         res.redirect('/login');
//     }

// }

// module.exports ={requireAuth};