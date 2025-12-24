// module.exports = (sequelize, DataTypes) => {
//   const Job = sequelize.define("Job", {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     company: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     location: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//   });

//   return Job;
// };
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define("Job", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Job;
};
