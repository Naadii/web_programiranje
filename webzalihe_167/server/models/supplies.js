module.exports = (sequelize, DataTypes) => {
    const Supplies = sequelize.define("Supplies", {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        min_quantity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        if_used: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        unit_of_measure: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        suppliesId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Supplies.associate = (models) => {
        Supplies.belongsTo(models.Users);
    }


    return Supplies;
}