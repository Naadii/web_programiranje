const { check } = require("express-validator")
const { SUPPLY_NAME_REQUIRED } = require("../constants/validators/supplies-constants");


exports.createSupplyValidator = [
    check('name')
        .notEmpty()
        .withMessage(SUPPLY_NAME_REQUIRED)
        .bail(),
    (req, res, next) => {
        next();
    }
];