const pool = require("../db");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const createUsuario = async (req, res) => {
  const {
    rut,
    dv_rut,
    p_nombre,
    s_nombre,
    apellido_p,
    apellido_m,
    contrasena,
    correo_electronico,
    num_tel_cel,
    codigo_pais_cel,
    direccion,
    fecha_nacimiento,
    rol_id_rol,
  } = req.body;

  //contraseña creada encriptada
  const salt = await bcrypt.genSalt(10);
  const crypt_contrasena_usuario = await bcrypt.hash(contrasena, salt);

  const newUsuario = await pool.query(
    `
    INSERT INTO usuario(      rut,
                                dv_rut,
                                p_nombre,
                                s_nombre,
                                apellido_p,
                                apellido_m,
                                contrasena,
                                correo_electronico,
                                num_tel_cel,
                                codigo_pais_cel,
                                direccion,
                                fecha_nacimiento,
                                rol_id_rol)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id_usuario,rut,rol_id_rol;
    `,
    [
      rut,
      dv_rut,
      p_nombre,
      s_nombre,
      apellido_p,
      apellido_m,
      crypt_contrasena_usuario,
      correo_electronico,
      num_tel_cel,
      codigo_pais_cel,
      direccion,
      fecha_nacimiento,
      rol_id_rol,
    ]
  );

  const {
    id_usuario: new_id_usuario,
    rut: new_rut,
    rol_id_rol: new_rol_id_rol,
  } = newUsuario.rows[0];

  const token = jwt.sign(
    {
      id: new_id_usuario,
      id2: new_rut,
      id3: new_rol_id_rol,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 3600,
    }
  );

  res.json({ token });
};

const loginUsuario = async (req, res) => {
  const { correo_electronico, contrasena_ingresada } = req.body;

  const usuarioFound = await pool.query(
    `SELECT correo_electronico,contrasena,id_usuario,rut,rol_id_rol FROM usuario WHERE correo_electronico = $1 `,
    [correo_electronico]
  );
  if (usuarioFound.rows.length === 0)
    return res.status(400).json({ message: "El correo ingresado no existe" });

  const matchContrasena = await bcrypt.compare(
    contrasena_ingresada,
    usuarioFound.rows[0].contrasena
  );

  if (!matchContrasena)
    return res.status(401).json({ message: "Contraseña Incorrecta" });

  const { id_usuario, rut, rol_id_rol } = usuarioFound.rows[0];

  const token = jwt.sign(
    {
      id: id_usuario,
      id2: rut,
      id3: rol_id_rol,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 3600,
    }
  );

  res.json({ token });
};

module.exports = {
  createUsuario,
  loginUsuario,
};
