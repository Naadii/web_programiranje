const { check } = require("express-validator")
const { SUPPLIER_NAME_REQUIRED } = require("../constants/validators/suppliers-constants");


exports.createSupplierValidator = [
    check('name')
        .notEmpty()
        .withMessage(SUPPLIER_NAME_REQUIRED)
        .bail(),
    (req, res, next) => {
        next();
    }
];