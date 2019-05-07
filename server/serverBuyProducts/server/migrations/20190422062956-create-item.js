'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'productModels',
          key: 'id'
        }
      },

      billId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'bill',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      totalCost: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('items');
  }
};
