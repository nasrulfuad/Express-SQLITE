const path = require('path');
const dotenv = require('dotenv');

// Load env
dotenv.config();

const customSwitch = {
	test: '.env.test',
	production: '.env.prod'
};

const fileConfigName = customSwitch[process.env.NODE_ENV] ? customSwitch[process.env.NODE_ENV] : '.env.dev';

dotenv.config({ path: path.join(__dirname, '..', fileConfigName) });

const config = {};

config.development = {
	storage: `./${process.env.SEQUELIZE_SQLITE}`,
	dialect: process.env.SEQUELIZE_DIALECT
};

config.test = {
	storage: `./${process.env.SEQUELIZE_SQLITE}`,
	dialect: process.env.SEQUELIZE_DIALECT
};

module.exports = config;
