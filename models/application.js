module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define("Application", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userId',
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'jobId',
    },
    appliedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'appliedAt',
    },
  }, {
    tableName: 'Applications',
    timestamps: false,
  });

  return Application;
};
