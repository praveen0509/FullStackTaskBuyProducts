'use strict';
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalCost: DataTypes.INTEGER
  }, {});
  item.associate = function(models) {
    // associations can be defined here
    item.belongsTo(models.productModel,{
      foreignKey:'productId',
      targetKey:'id'
    });
  };
  return item;
};
