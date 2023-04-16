const express = require("express")
const router = express.Router()
const { Suppliers, Users } = require("../models")
const { validationResult } = require("express-validator")
const { authMiddleware } = require("../middlewares/auth-middleware")
const { adminMiddleware } = require("../middlewares/admin-middleware")
const { createSupplierValidator } = require("../validators/suppliers")

router.get("/", authMiddleware, async (req, res) => {
    const suppliers = await Suppliers.findAll({include: Users, where: {suppliersId: req.user.id}});
    res.json(suppliers);
});

router.get("/all", adminMiddleware, async (req, res) => {
    const suppliers = await Suppliers.findAll();
    res.json(suppliers);
});

router.get("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    const supplier= await Suppliers.findByPk(id);
    res.json(supplier ?? {});
});

router.post("/", authMiddleware, createSupplierValidator, async (req, res) => {
    const errors = validationResult(req);
    const user = req.user;

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const body = req.body;
    body.suppliersId = user.id;
    console.log(body)
    await Suppliers.create(body);
    res.status(201).json();
})

module.exports = router;