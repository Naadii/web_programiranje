module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Supplies, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'suppliesId'
            }
        }),
        Users.hasMany(models.Suppliers, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'suppliersId'
            }
        })
    }

    return Users;
}