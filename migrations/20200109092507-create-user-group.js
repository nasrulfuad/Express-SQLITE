"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("usergroups", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            groupId: {
                type: Sequelize.UUID,
                allowNull: false
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("usergroups");
    }
};
