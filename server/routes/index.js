import Users from '../controllers/user';
import Books from '../controllers/book';
import { check, validationResult } from 'express-validator/check';

export default (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the BookStore API!',
  }));

  app.post('/api/users', Users.signUp); // API route for user to signup

  //https://express-validator.github.io/docs/sanitization.html
  app.post(
    '/api/users/:userId/books',
    [check('title','The title is required').not().isEmpty(),
     check('author','The author is required').not().isEmpty(),
     check('description','The description is required').not().isEmpty(),
     check('quantity','The quantity must be number between 0 and 5').not().isEmpty().withMessage('The quantity is required').isInt({min:0, max:5}),
    ],
    Books.create
  ); // API route for user to create a book

 
};