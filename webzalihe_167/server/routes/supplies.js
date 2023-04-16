const express = require("express")
const router = express.Router()
const { Supplies, Users } = require("../models")
const { validationResult } = require("express-validator")
const { authMiddleware } = require("../middlewares/auth-middleware")
const { adminMiddleware } = require("../middlewares/admin-middleware")
const { createSupplyValidator } = require("../validators/supplies")

router.get("/", authMiddleware, async (req, res) => {
    const supplies = await Supplies.findAll({include: Users, where: {suppliesId: req.user.id}});
    res.json(supplies);
});

router.get("/all", adminMiddleware, async (req, res) => {
    const supplies = await Supplies.findAll();
    res.json(supplies);
});

router.get("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    const supply= await Supplies.findByPk(id);
    res.json(supply ?? {});
});

router.post("/", authMiddleware, createSupplyValidator, async (req, res) => {
    const errors = validationResult(req);
    const user = req.user;

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const body = req.body;
    body.suppliesId = user.id;
    console.log(body)
    await Supplies.create(body);
    res.status(201).json();
})

module.exports = router;