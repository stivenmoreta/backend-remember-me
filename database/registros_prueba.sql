INSERT INTO rol (nombre_rol)
VALUES ('familiar');
INSERT INTO rol (nombre_rol)
VALUES ('cuidador');
INSERT INTO rol (nombre_rol)
VALUES ('personal medico');

select * from rol
select * from usuario
SELECT * FROM usuario WHERE id_usuario = '3' AND rut = '20534436' AND rol_id_rol= '1'

SELECT nombre_rol FROM rol WHERE id_rol = '1'