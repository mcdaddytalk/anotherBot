const { DataTypes, Model } = require('sequelize');

module.exports = class Guild extends Model {
    static init(sequelize){
        return super.init({
            guildId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            guildName: {
                type: DataTypes.STRING,
            },
            guildPrefix: {
                type: DataTypes.STRING,
            },
            license: {
                type: DataTypes.STRING,
            },
            key: { 
              type: DataTypes.STRING,
            },
            active: {
              type: DataTypes.BOOLEAN,
            }
        }, {
            tableName: 'Guild',
            sequelize
        })
    }
}
