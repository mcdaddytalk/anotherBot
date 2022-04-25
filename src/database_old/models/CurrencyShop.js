const { DataTypes, Model } = require('sequelize');

module.exports = class CurrencyShop extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    unique: true,
                },
                cost: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    default: 0,
                },
            },
            {
                tableName: 'currency_shop',
                timestamps: false,
                sequelize,
            }
        );
    }
};
