const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors')
const {Roles} = require('./models')
const {Users} = require('./models')
const bcrypt = require('bcrypt')

app.use(express.json())
app.use(cors({
    origin: '*'
}))

const db = require("./models")

//Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const suppliesRoutes = require("./routes/supplies");
app.use("/api/supplies", suppliesRoutes);
const suppliersRoutes = require("./routes/suppliers");
app.use("/api/suppliers", suppliersRoutes);

db.sequelize.sync({force: true}).then(async() => {
    Roles.bulkCreate([{
        name: 'ADMIN'
    }, {
        name: 'USER'
    }])

    Users.bulkCreate([{
        username: 'admin',
        password: await bcrypt.hash('admin', 10),
        roleId: 1
    }])
    app.listen(3001, () => {
        console.log("Aplikacija pokrenuta");
    })
})