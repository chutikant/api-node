import model from '../models';
import { validationResult } from 'express-validator/check';
const { Book } = model;

class Books {
    static create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var getError = errors.array();
            var firstErrMessage = getError[0].msg ? getError[0].msg : '';
            var error = {
                    success: false,
                    message: firstErrMessage
                }
            return res.status(422).json(error);
            //return res.status(422).json({ errors: errors.array()});
        }

        const { title, author, description, quantity } = req.body
        const { userId } = req.params
        return Book
            .create({
                title,
                author,
                description,
                quantity,
                userId
            })
            .then(book => res.status(201).send({
                success: true,
                message: `Your book with the title ${title} has been created successfully `,
                book
            }))
    }
}

export default Books