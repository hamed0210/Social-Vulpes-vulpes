DROP DATABASE IF EXISTS social_vulpes_vulpes;

CREATE DATABASE IF NOT EXISTS social_vulpes_vulpes;

USE social_vulpes_vulpes;

CREATE TABLE usuarios(
	id INT(10) UNSIGNED,
	avatar VARCHAR(50) NOT NULL,
	nombres VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL,
	email VARCHAR(25) NOT NULL,
	password CHAR(90) NOT NULL,
	role ENUM('Superadmin', 'Admin', 'User') NOT NULL DEFAULT 'User',
	descripcion VARCHAR(200),
	fecha_creacion DATETIME DEFAULT current_timestamp,
	CONSTRAINT unique_combinacion UNIQUE (email),
	CONSTRAINT unique_combinacion_2 UNIQUE (username),
 	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE publicaciones(
	codigo VARCHAR(50),
	id_usuario INT(10) UNSIGNED NOT NULL,
	descripcion VARCHAR(250) NOT NULL,
	imagen VARCHAR(60) NOT NULL,
	fecha_creacion DATETIME DEFAULT current_timestamp,
 	PRIMARY KEY (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE comentarios(
	codigo VARCHAR(50),
	id_usuario INT(10) UNSIGNED NOT NULL,
	comentario VARCHAR(250) NOT NULL,
	codigo_publicacion VARCHAR(50) NOT NULL,
	fecha_creacion DATETIME DEFAULT current_timestamp,
 	PRIMARY KEY (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE mensajes(
	codigo VARCHAR(50),
	id_usuario_enviado INT(10) UNSIGNED NOT NULL,
	id_usuario_recivido INT(10) UNSIGNED NOT NULL,
	mensaje TEXT NOT NULL,
	fecha_creacion DATETIME DEFAULT current_timestamp,
 	PRIMARY KEY (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE publicaciones 
	-- ADD PRIMARY KEY (codigo),
	-- ADD UNIQUE KEY (nombre),
	ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE comentarios 
	-- ADD PRIMARY KEY (codigo),
	-- ADD UNIQUE KEY (nombre),
	ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	ADD FOREIGN KEY (codigo_publicacion) REFERENCES publicaciones(codigo) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE mensajes 
	-- ADD PRIMARY KEY (codigo),
	-- ADD UNIQUE KEY (nombre),
	ADD FOREIGN KEY (id_usuario_enviado) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	ADD FOREIGN KEY (id_usuario_recivido) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE;