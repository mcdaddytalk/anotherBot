const { DataTypes, Model } = require('sequelize');

module.exports = class Application extends Model {
    static init(sequelize){
        return super.init({
            applicationId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            messageId: {
                type: DataTypes.STRING,
            },
            authorId:{
                type: DataTypes.STRING
            }
        }, {
            tableName: 'Application',
            sequelize
        })
    }
}
