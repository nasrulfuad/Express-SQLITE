"use strict";
module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define(
		"users",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			phone_number: DataTypes.STRING,
			password: DataTypes.STRING
		},
		{}
	);

	users.associate = function(models) {
		// users.hasMany(models.Usergroup);
		// users.belongsToMany(models.Group, { as: "UserForGroup", through: models.Usergroup, foreignKey: "userId" });
		users.belongsToMany(models.Group, { through: models.Usergroup });
	};

	users.prototype.toJSON = function() {
		const values = Object.assign({}, this.get());
		delete values.password;
		return values;
	};

	return users;
};
