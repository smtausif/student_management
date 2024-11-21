const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.STRING,
    primaryKey: true, 
    allowNull: false, 
    validate: {
      notNull: { msg: 'student_id is required' }, 
      notEmpty: { msg: 'student_id cannot be empty' }, 
    },
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'first_name is required' },
      notEmpty: { msg: 'first_name cannot be empty' },
    },
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'last_name is required' },
      notEmpty: { msg: 'last_name cannot be empty' },
    },
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: 'date_of_birth is required' },
      isDate: { msg: 'date_of_birth must be a valid date' },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      notNull: { msg: 'email is required' },
      isEmail: { msg: 'email must be a valid email address' },
    },
  },
  enrollment_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: 'enrollment_date is required' },
      isDate: { msg: 'enrollment_date must be a valid date' },
    },
  },
  courses: {
    type: DataTypes.JSONB,
    validate: {
      isJSON(value) {
        try {
          JSON.stringify(value); 
        } catch (err) {
          throw new Error('courses must be a valid JSON array');
        }
      },
    },
  },
});

module.exports = Student;
