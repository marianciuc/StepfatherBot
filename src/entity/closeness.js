const { DataTypes } = require('sequelize');

const Closeness = sequelize.define('closeness', {
    uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    channelParentId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    channelRoomId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {freezeTableName: true})

Closeness.sync({ alter: true }).then(()=> {
    console.log(`Entity ${Closeness.name} successfully synchronized`);
});

module.exports = Closeness
