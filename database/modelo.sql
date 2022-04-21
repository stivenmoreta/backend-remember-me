CREATE TABLE adulto_mayor (
    rut                VARCHAR(8) NOT NULL,
    correo_electronico VARCHAR(120) NOT NULL,
    dv_rut             VARCHAR(1) NOT NULL,
    p_nombre           VARCHAR(50) NOT NULL,
    s_nombre           VARCHAR(50) NOT NULL,
    apellido_m         VARCHAR(50) NOT NULL,
    apellido_p         VARCHAR(50) NOT NULL,
    num_cel_tel        VARCHAR(8) NOT NULL,
    codigo_pais_cel    VARCHAR(10) NOT NULL,
    direccion          VARCHAR(200) NOT NULL,
    ficha_salud        BYTEA NOT NULL
);

ALTER TABLE adulto_mayor ADD CONSTRAINT adulto_mayor_pk PRIMARY KEY ( rut );

CREATE TABLE medicamento (
    nombre_medicamento VARCHAR(200) NOT NULL,
    n_lote             VARCHAR(100) NOT NULL,
    cantidad           VARCHAR(50) NOT NULL,
    administracion     VARCHAR(200) NOT NULL,
    fecha_elaboracion  DATE NOT NULL,
    fecha_vencimiento  DATE NOT NULL,
    bio_equivalente    CHAR(1) NOT NULL
);

ALTER TABLE medicamento ADD CONSTRAINT medicamento_pk PRIMARY KEY ( nombre_medicamento );

CREATE TABLE medicamentos_adulto_mayor (
    adulto_mayor_rut               VARCHAR(8) NOT NULL,
    medicamento_nombre_medicamento VARCHAR(200) NOT NULL,
    fecha_inicio_consumo           DATE NOT NULL,
    dias_consumo                   DATE NOT NULL,
    periodo_consumo                DATE NOT NULL,
    fecha_fin_consumo              DATE NOT NULL,
    numero_dosis                   INTEGER NOT NULL
);

ALTER TABLE medicamentos_adulto_mayor ADD CONSTRAINT medicamentos_consumidos_pk PRIMARY KEY ( adulto_mayor_rut,
                                                                                              medicamento_nombre_medicamento );

CREATE TABLE relacion_usuario_adulto_mayor (
    usuario_id_usuario INTEGER NOT NULL,
    adulto_mayor_rut   VARCHAR(8) NOT NULL
);


ALTER TABLE relacion_usuario_adulto_mayor ADD CONSTRAINT rel_usu_adul_may_pk PRIMARY KEY ( usuario_id_usuario,
                                                                                                        adulto_mayor_rut );

CREATE TABLE rol (
    id_rol     SERIAL NOT NULL,
    nombre_rol VARCHAR(50) NOT NULL
);

ALTER TABLE rol ADD CONSTRAINT rol_pk PRIMARY KEY ( id_rol );

CREATE TABLE usuario (
    id_usuario         SERIAL NOT NULL,
    rut                VARCHAR(8) NOT NULL,
    dv_rut             VARCHAR(1) NOT NULL,
    p_nombre           VARCHAR(100) NOT NULL,
    s_nombre           VARCHAR(100) NOT NULL,
    apellido_p         VARCHAR(100) NOT NULL,
    apellido_m         VARCHAR(100) NOT NULL,
    contrasena         VARCHAR(120) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    num_tel_cel        VARCHAR(8) NOT NULL,
    codigo_pais_cel    VARCHAR(10) NOT NULL,
    direccion          VARCHAR(200) NOT NULL,
    fecha_nacimiento   DATE NOT NULL,
    rol_id_rol         INTEGER NOT NULL
);

ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( id_usuario );


ALTER TABLE medicamentos_adulto_mayor
    ADD CONSTRAINT medi_consu_adul_may_fk FOREIGN KEY ( adulto_mayor_rut )
        REFERENCES adulto_mayor ( rut );


ALTER TABLE medicamentos_adulto_mayor
    ADD CONSTRAINT medi_consu_medi_fk FOREIGN KEY ( medicamento_nombre_medicamento )
        REFERENCES medicamento ( nombre_medicamento );


ALTER TABLE relacion_usuario_adulto_mayor
    ADD CONSTRAINT rela_usu_adul_may_adul_may_fk FOREIGN KEY ( adulto_mayor_rut )
        REFERENCES adulto_mayor ( rut );


ALTER TABLE relacion_usuario_adulto_mayor
    ADD CONSTRAINT rela_usu_adul_may_usu_fk FOREIGN KEY ( usuario_id_usuario )
        REFERENCES usuario ( id_usuario );

ALTER TABLE usuario
    ADD CONSTRAINT usuario_rol_fk FOREIGN KEY ( rol_id_rol )
        REFERENCES rol ( id_rol );
