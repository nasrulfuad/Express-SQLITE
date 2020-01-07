'use strict';
module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define(
		'users',
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			phone_number: DataTypes.STRING,
			password: DataTypes.STRING
		},
		{}
	);

	users.associate = function(models) {
		// associations can be defined here
	};

	users.prototype.toJSON = function() {
		const values = Object.assign({}, this.get());
		delete values.password;
		return values;
	};

	return users;
};
