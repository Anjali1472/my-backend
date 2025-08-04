const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Notification = sequelize.define('Notification', {
  message: DataTypes.STRING,
});

module.exports = Notification;
