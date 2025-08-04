// // const jwt = require("jsonwebtoken");
// // const JWT_SECRET = process.env.JWT_SECRET || "998558c1c86ff95cc294286655cf36c70d9ce29e323f7975e1b110ad630f194b";

// // module.exports = function (req, res, next) {
// //   const authHeader = req.headers.authorization;

// //   if (!authHeader) return res.status(401).json({ error: "No token provided" });

// //   const token = authHeader.split(" ")[1]; // Format: "Bearer <token>"

// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch (err) {
// //     return res.status(401).json({ error: "Invalid token" });
// //   }
// // };
// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET || "998558c1c86ff95cc294286655cf36c70d9ce29e323f7975e1b110ad630f194b";

// module.exports = function (req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) return res.status(401).json({ error: "No token provided" });

//   const token = authHeader.split(" ")[1]; // Format: "Bearer <token>"

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     // ✅ Ensure only `id` is attached to req.user
//     req.user = { id: decoded.id }; // This ensures `req.user.id` is valid

//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "998558c1c86ff95cc294286655cf36c70d9ce29e323f7975e1b110ad630f194b";

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; // Format: "Bearer <token>"

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = { id: decoded.id }; // 👈 only id attached to request

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
