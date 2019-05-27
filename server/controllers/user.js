import model from '../models';
import bcrypt from 'bcrypt'
const { User } = model;
const saltRounds = 10;



class Users {
    static signUp(req, res) {
        const { name, username, email, password } = req.body
        // console.log(req.body)
        var hashPassword =  bcrypt.hashSync(password, saltRounds);
        // var check = bcrypt.compareSync('1234566', hash);       
        return User
            .create({
                name,
                username,
                email,
                password:hashPassword
            })
            .then(function(userData) {
                const {id, name,username, email} = userData
                res.status(201).send({
                        success: true,
                        message: 'User successfully created',
                        userData:  {id, name,username, email}
                });
            })
            .catch(function(err) {
                // print the error details
                var dbError = err.errors
                //a.ValidationErrorItem = a[0]
                var errMsg = dbError[0].message;
                // console.log(err.parent.detail);
                res.status(200).send({
                    success: false,
                    message: errMsg
                });
            });
     }
}

export default Users;