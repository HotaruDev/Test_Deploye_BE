import User from '../models/user.js';
import sequelize from '../config/database.js';

const verifyUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    const users = await User.findAll();
    console.log('Users in the database:', JSON.stringify(users, null, 2));

    await sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Unable to connect to the database or retrieve users:', error);
  }
};

verifyUsers(); 