const { DataTypes, Model } = require('sequelize');

module.exports = class UserItems extends Model {
    static init(sequelize) {
        return super.init(
            {
                guild_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'compositeIndex',
                },
                user_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'compositeIndex',
                },
                item_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: 'compositeIndex',
                },
                amount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    default: 0,
                },
            },
            {
                indexes: [
                    {
                        unique: true,
                        fields: ['user_id', 'guild_id', 'item_id'],
                    },
                ],
                tableName: 'user_items',
                timestamps: false,
                sequelize,
            }
        );
    }
};
