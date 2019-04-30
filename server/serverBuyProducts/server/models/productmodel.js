'use strict';
module.exports = (sequelize, DataTypes) => {
  const productModel = sequelize.define('productModel', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  productModel.associate = function(models) {
    // associations can be defined here
    productModel.hasOne(models.item,{
      foreignKey:'productId',
      sourceKey:'id'
    })

  };
  return productModel;
};
