module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY
    },
    qualification: {
      type: DataTypes.STRING
    },
    college: {
      type: DataTypes.STRING
    },
    passing_year: {
      type: DataTypes.STRING
    },
    last_company: {
      type: DataTypes.STRING
    },
    experience: {
      type: DataTypes.STRING
    },
    skills: {
      type: DataTypes.JSON // or ARRAY if you prefer
    },
    resume: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "users",
    timestamps: false // disable automatic timestamps
  });

  return User;
};
