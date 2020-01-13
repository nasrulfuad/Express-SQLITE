"use strict";
module.exports = (sequelize, DataTypes) => {
	const usergroups = sequelize.define(
		"usergroups",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			}
		},
		{}
	);
	usergroups.associate = function(models) {
		// usergroups.belongsTo(models.User, { foreignKey: "userId", targetKey: "id", as: "User" });
		// usergroups.belongsTo(models.Group, { foreignKey: "groupId", targetKey: "id", as: "Group" });
	};
	return usergroups;
};
