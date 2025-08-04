// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//   }
// );

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // ✅ Import models
// db.User = require("./user")(sequelize, Sequelize.DataTypes);
// db.Job = require("./job")(sequelize, Sequelize.DataTypes);
// db.Application = require("./application")(sequelize, Sequelize.DataTypes);


// // ✅ Set associations
// db.User.hasMany(db.Application, { foreignKey: "userId" });
// db.Application.belongsTo(db.User, { foreignKey: "userId" });

// db.Job.hasMany(db.Application, { foreignKey: "jobId" });
// db.Application.belongsTo(db.Job, { foreignKey: "jobId" });


// module.exports = db;
const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  }
);

// Test DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ PostgreSQL connected successfully.");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to PostgreSQL:", err.message);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./user")(sequelize, Sequelize.DataTypes);
db.Job = require("./job")(sequelize, Sequelize.DataTypes);
db.Application = require("./application")(sequelize, Sequelize.DataTypes);

// Associations
db.User.hasMany(db.Application, { foreignKey: "userId" });
db.Application.belongsTo(db.User, { foreignKey: "userId" });

db.Job.hasMany(db.Application, { foreignKey: "jobId" });
db.Application.belongsTo(db.Job, { foreignKey: "jobId" });

module.exports = db;
