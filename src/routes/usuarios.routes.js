const { Router } = require("express");
const router = Router();
const {
  createUsuario,
  loginUsuario,
} = require("../controllers/usuarios.controller");


router.post("/register", createUsuario); 
router.post("/login", loginUsuario); 

module.exports = router;
