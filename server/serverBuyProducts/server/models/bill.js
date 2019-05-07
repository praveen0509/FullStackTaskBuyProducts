'use strict';
module.exports = (sequelize, DataTypes) => {
  const bill = sequelize.define('bill', {
    purchasedBy: DataTypes.STRING,
    purchasedOn: DataTypes.DATE,
    list: DataTypes.STRING,
    total: DataTypes.DOUBLE
  }, {});
  bill.associate = function(models) {
    // associations can be defined here

    bill.hasMany(models.item, {
       foreignKey: 'id',
       targetKey: 'billId'
    });
  };
  return bill;
};
