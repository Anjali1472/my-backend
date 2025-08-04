const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Import models
db.User = require("./user")(sequelize, Sequelize.DataTypes);
db.Job = require("./job")(sequelize, Sequelize.DataTypes);
db.Application = require("./application")(sequelize, Sequelize.DataTypes);


// ✅ Set associations
db.User.hasMany(db.Application, { foreignKey: "userId" });
db.Application.belongsTo(db.User, { foreignKey: "userId" });

db.Job.hasMany(db.Application, { foreignKey: "jobId" });
db.Application.belongsTo(db.Job, { foreignKey: "jobId" });


module.exports = db;
