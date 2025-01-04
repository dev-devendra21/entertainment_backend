import { body } from "express-validator";

const userSchemaValidation = () => {
    return [
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ];
}


export {userSchemaValidation}