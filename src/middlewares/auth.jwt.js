const jwt = require("jsonwebtoken");
const pool = require("../db");

/**
 * verificador de tokens
 * @param {*} req.headers necesita un token para entrar a rutas protegidas
 * @returns
 */
const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "Ingrese un token" });

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

  const user = await pool.query(
    `SELECT * FROM usuario WHERE id_usuario = $1 AND rut = $2 AND rol_id_rol=$3`,
    [decoded.id, decoded.id2, decoded.id3]
  );

  if (user.rows.length === 0)
    return res.status.json({
      message: "no se encontro usuario con este token",
    });

  req.id_rol = decoded.id3;
  next();
};
const isFamilia = async (req, res, next) => {
  const isFamilia = await pool.query(
    `
  SELECT nombre_rol FROM rol WHERE id_rol = $1
  `,
    req.id_rol
  );
  if (isFamilia.rows[0].nombre_rol === "familiar") {
    next();
  } else {
    res.status(401).json("acceso solo para Familiares");
  }
};
const isCuidador = async (req, res, next) => {
  const isFamilia = await pool.query(
    `
  SELECT nombre_rol FROM rol WHERE id_rol = $1
  `,
    req.id_rol
  );
  if (isFamilia.rows[0].nombre_rol === "cuidador") {
    next();
  } else {
    res.status(401).json("acceso solo para cuidador");
  }
};
const isPersonalMedico = async (req, res, next) => {
  const isFamilia = await pool.query(
    `
  SELECT nombre_rol FROM rol WHERE id_rol = $1
  `,
    req.id_rol
  );
  if (isFamilia.rows[0].nombre_rol === "personal medico") {
    next();
  } else {
    res.status(401).json("acceso solo para personal medico");
  }
};

module.exports = {
  verifyToken,
  isFamilia,
  isCuidador,
  isPersonalMedico,
};
