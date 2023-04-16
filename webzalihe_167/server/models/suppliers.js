module.exports = (sequelize, DataTypes) => {
    const Suppliers = sequelize.define("Suppliers", {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        jib: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        pdv: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        contact_person: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        suppliersId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Suppliers.associate = (models) => {
        Suppliers.belongsTo(models.Users);
    }

    return Suppliers;
}