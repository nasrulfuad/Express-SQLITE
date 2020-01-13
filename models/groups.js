"use strict";
module.exports = (sequelize, DataTypes) => {
	const groups = sequelize.define(
		"groups",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			name: DataTypes.STRING,
			description: DataTypes.TEXT
		},
		{}
	);
	groups.associate = function(models) {
		// groups.hasMany(models.Usergroup);
		// groups.belongsToMany(models.User, { as: "UserInGroup", through: models.Usergroup, foreignKey: "groupId" });
		groups.belongsToMany(models.User, { through: models.Usergroup });
	};
	return groups;
};
