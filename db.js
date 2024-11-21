const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('student_management', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;