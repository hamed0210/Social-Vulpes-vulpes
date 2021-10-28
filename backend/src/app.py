from flask import Flask, request, jsonify, send_from_directory, send_file
from flask.helpers import send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from flask_marshmallow import Marshmallow
import uuid
import os
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from function_jwt import write_token, valida_token

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/social_vulpes_vulpes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['IMAGENES_SRC'] = 'src/imagenes'
app.config['IMAGENES'] = 'imagenes'

db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)



# Modelos


# Usuarios


class Usuarios(db.Model):
	__tablename__ = 'usuarios'

	id = db.Column(db.Integer, primary_key=True)
	avatar = db.Column(db.String(50))
	nombres = db.Column(db.String(50))
	apellidos = db.Column(db.String(50))
	username = db.Column(db.String(50), unique=True)
	email = db.Column(db.String(25), unique=True)
	password = db.Column(db.String(90))
	role = db.Column(db.String())
	descripcion = db.Column(db.String(200))
	fecha_creacion = db.Column(db.DateTime)
	posts = db.relationship("Publicaciones", backref=db.backref('publicaciones'), lazy=True, viewonly=True)

	def __init__(self, id, avatar, nombres, apellidos, username, email, password, role, descripcion, fecha_creacion):
			self.id = id
			self.avatar = avatar
			self.nombres = nombres
			self.apellidos = apellidos
			self.username = username
			self.email = email
			self.password = password
			self.role = role
			self.descripcion = descripcion
			self.fecha_creacion = fecha_creacion

db.create_all()

class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombres', 'apellidos', 'username', 'avatar', 'email', 'role', 'descripcion', 'fecha_creacion')

usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)

# class UsuarioSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'nombres', 'apellidos', 'username', 'email', 'role', 'descripcion', 'fecha_creacion', 'posts')

# usuario_schema = UsuarioSchema()
# usuarios_schema = UsuarioSchema(many=True)



# Publicaciones


class Publicaciones(db.Model):
	__tablename__ = 'publicaciones'

	codigo = db.Column(db.String(50), primary_key=True)
	id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
	descripcion = db.Column(db.String(250))
	imagen = db.Column(db.String(50))
	fecha_creacion = db.Column(db.DateTime)
	usuario = db.relationship("Usuarios", backref=db.backref('publicaciones'), lazy=True)
	comentarios = db.relationship("Comentarios", backref=db.backref('comentarios'), lazy=True)

	def __init__(self, codigo, id_usuario, descripcion, imagen, fecha_creacion):
			self.codigo = codigo
			self.id_usuario = id_usuario
			self.descripcion = descripcion
			self.imagen = imagen
			self.fecha_creacion = fecha_creacion

db.create_all()

class PublicacionesSchema(ma.Schema):
			class Meta:
				fields = ('codigo', 'descripcion', 'imagen', 'fecha_creacion', 'usuario', 'comentarios')

publicacion_schema = PublicacionesSchema()
publicaciones_schema = PublicacionesSchema(many=True)



# Comentarios


class Comentarios(db.Model):
	__tablename__ = 'comentarios'

	codigo = db.Column(db.String(50), primary_key=True)
	id_usuario = db.Column(db.Integer , db.ForeignKey('usuarios.id'))
	comentario = db.Column(db.String(250))
	codigo_publicacion = db.Column(db.String(50) , db.ForeignKey('publicaciones.codigo'))
	fecha_creacion = db.Column(db.DateTime)

	def __init__(self, codigo, id_usuario, comentario, codigo_publicacion, fecha_creacion):
			self.codigo = codigo
			self.id_usuario = id_usuario
			self.comentario = comentario
			self.codigo_publicacion = codigo_publicacion
			self.fecha_creacion = fecha_creacion

db.create_all()

class ComentariosSchema(ma.Schema):
    class Meta:
        fields = ('codigo', 'id_usuario', 'comentario', 'codigo_publicacion', 'fecha_creacion')

comentario_schema = ComentariosSchema()
comentarios_schema = ComentariosSchema(many=True)



# Mensajes


class Mensajes(db.Model):
	codigo = db.Column(db.String(50), primary_key=True)
	id_usuario_enviado = db.Column(db.Integer)
	id_usuario_recivido = db.Column(db.Integer)
	mensaje = db.Column(db.Text)
	fecha_creacion = db.Column(db.DateTime)

	def __init__(self, codigo, id_usuario_enviado, id_usuario_recivido, mensaje, fecha_creacion):
			self.codigo = codigo
			self.id_usuario_enviado = id_usuario_enviado
			self.id_usuario_recivido = id_usuario_recivido
			self.mensaje = mensaje
			self.fecha_creacion = fecha_creacion

db.create_all()

class MensajesSchema(ma.Schema):
    class Meta:
        fields = ('codigo', 'id_usuario_enviado', 'id_usuario_recivido', 'mensaje', 'fecha_creacion')

mensaje_schema = MensajesSchema()
mensajes_schema = MensajesSchema(many=True)


#  Rutas



#  Inisio de sesion



@app.route('/signin', methods=['POST'])
def signIn():
	try:
		username = request.json['username']
		password = request.json['password']

		usuario = Usuarios.query.filter_by(username=username).first()

		if not usuario or not check_password_hash(usuario.password, password):
			return jsonify({'message': 'Datos ingresados son incorrectos'}), 400
		else:
			token = write_token(data=usuario.username)
			return jsonify({'token': str(token)})
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400



# Chequear Token


@app.route('/check', methods=['GET'])
def check():
	try:
		bearer = request.headers['Authorization'].split(' ')
		token = bearer[1]
		token_clear = token.split("'")
		dataToken = valida_token(token_clear[1], output=True)
		if type(dataToken) is dict:
			usuario = Usuarios.query.filter_by(username=dataToken['username']).first()
			 
			return usuario_schema.jsonify(usuario)
		else:
			return dataToken
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400



# Usuarios 



# Crear Usuario



@app.route('/users', methods=['POST'])
def createUser():
	try:

		id = request.form.get('id')
		nombres = request.form.get('nombres')
		apellidos = request.form.get('apellidos')
		username = request.form.get('username')
		email = request.form.get('email')
		password = generate_password_hash(request.form.get('password'), method='sha256')
		role = request.form.get('role')
		descripcion = request.form.get('descripcion')
		avatar = request.files['avatar']

		# print()

		newFilename = str(username) + '.' + list(reversed(avatar.filename.split('.')))[0]

		newUsuario = Usuarios(id, newFilename, nombres, apellidos, username, email, password, role, descripcion, datetime.now())
		db.session.add(newUsuario)
		db.session.commit()

		os.makedirs(app.config['IMAGENES_SRC'], exist_ok=True)
		avatar.save(os.path.join(app.config['IMAGENES_SRC'], newFilename))
		
		return jsonify({'message':'Usuario creado correctamente'})
	except IntegrityError:
		db.session.rollback()
		return jsonify({'message':'El usuario ya se encuantra registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Obtener Todos Usuarios


@app.route('/users', methods=['GET'])
def getUsers():
	try:
		all_usuarios = Usuarios.query.all()
		result = usuarios_schema.dump(all_usuarios)
		if all_usuarios:
			return jsonify(result)
		else:
			return jsonify({'message': 'No se encontraron usuarios registrados'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Obtener un Usuario


@app.route('/users/<id>', methods=['GET'])
def getUser(id):
	try:
		usuario = Usuarios.query.get(id)
		if usuario:
			return usuario_schema.jsonify(usuario)
		else:
			return jsonify({'message': 'Usuario no registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Actualizar Usuario


@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
	try:
		nombres = request.json['nombres']
		apellidos = request.json['apellidos']
		username = request.json['username']
		email = request.json['email']
		role = request.json['role']
		descripcion = request.json['descripcion']

		usuario = Usuarios.query.get(id)
		if usuario:
			usuario.nombres = nombres
			usuario.apellidos = apellidos
			usuario.username = username
			usuario.email = email
			usuario.role = role
			usuario.descripcion = descripcion
			db.session.commit()
			return jsonify({'message':'Usuario actualizado correctamente'})
		else: 
			return jsonify({'message':'Usuario no registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400



#  Eliminar Usuario



@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
	try:
		usuario = Usuarios.query.get(id)
		if usuario:
			db.session.delete(usuario)
			db.session.commit()
			return jsonify({'message':'Usuario eliminado correctamente'})
		else:
			return jsonify({'message':'Usuario no registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400



# Actualizar Contraseña Usuario


@app.route('/users/password/<id>', methods=['PUT'])
def updatePassword(id):
	try:
		usuario = Usuarios.query.get(id)
		if usuario:
			usuario.password = generate_password_hash(request.json['password'], method='sha256')
			db.session.commit()
			return jsonify({'message':'Contraseña actualizada correctamente'})
		else: 
			return jsonify({'message':'Usuario no registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400




# Actualizar Avatar Usuario


@app.route('/users/avatar/<id>', methods=['PUT'])
def updateAvatar(id):
	avatar = request.json['avatar']
	try:
		usuario = Usuarios.query.get(id)
		if usuario:
			usuario.avatar = avatar
			db.session.commit()
			return jsonify({'message':'Avatar actualizado correctamente'})
		else: 
			return jsonify({'message':'Usuario no registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400





# Publicaciones




# Crear Publicaciones


@app.route('/posts', methods=['POST'])
def createPost():
	try:
		codigo = uuid.uuid4()

		id_usuario = request.form.get('id_usuario')
		descripcion = request.form.get('descripcion')
		imagen = request.files['imagen']

		newFilename = str(id_usuario) + '_' + str(codigo) + '.' + list(reversed(imagen.filename.split('.')))[0]

		newPublicacion = Publicaciones(codigo, id_usuario, descripcion, newFilename, datetime.now())
		db.session.add(newPublicacion)
		db.session.commit()

		os.makedirs(app.config['IMAGENES_SRC'], exist_ok=True)
		imagen.save(os.path.join(app.config['IMAGENES_SRC'], newFilename))

		
		return jsonify({'message':'Publicacion creada correctamente'})
	except FileNotFoundError:
		return jsonify({'message':'Folder no existe'}), 400
	except IntegrityError:
		db.session.rollback()
		return jsonify({'message':'El usuario ya se encuantra registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Obtener Todas las Publicaciones

@app.route('/imagen/<filename>', methods=['GET'])
def getImagen(filename):
	return send_from_directory(app.config['IMAGENES'], filename, as_attachment=False)

@app.route('/posts', methods=['GET'])
def getPosts():
	try:
		all_publicaciones = db.session.query(Publicaciones, Comentarios).outerjoin(Comentarios, Publicaciones.codigo == Comentarios.codigo_publicacion).all()

		
		result = []
		result_no_repeat = []
		for publicacion in all_publicaciones:
			show_publicacion = publicacion_schema.dump(publicacion[0])
			show_publicacion['usuario'] = usuario_schema.dump(publicacion[0].usuario)
			if show_publicacion['comentarios']:
				show_publicacion['comentarios'] = comentarios_schema.dump(publicacion[0].comentarios)
			result.append(show_publicacion)

		for i in result:
			if i not in result_no_repeat:
				result_no_repeat.append(i)

		if all_publicaciones:
			return jsonify(result_no_repeat)
		else:
			return jsonify({'message': 'No se encontraron publicaciones registradas'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Obtener una Publicacion


@app.route('/posts/<codigo>', methods=['GET'])
def getPost(codigo):
	try:
		result = []
		# publicacion = Publicaciones.query.get(codigo)
		publicacion = db.session.query(Publicaciones, Comentarios).outerjoin(Comentarios, Publicaciones.codigo == Comentarios.codigo_publicacion).filter(Publicaciones.codigo == codigo).first()

		show_publicacion = publicacion_schema.dump(publicacion[0])
		show_publicacion['usuario'] = usuario_schema.dump(publicacion[0].usuario)
		# print(show_publicacion['imagen'])
		if show_publicacion['comentarios']:
			show_publicacion['comentarios'] = comentarios_schema.dump(publicacion[0].comentarios)
		result.append(show_publicacion)

		if publicacion:
			return jsonify(result)
		else:
			return jsonify({'message': 'Publicacion no registrada'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Actualizar Publicacion



@app.route('/posts/<codigo>', methods=['PUT'])
def updatePost(codigo):
	try:
		descripcion = request.json['descripcion']
		imagen = request.json['imagen']

		publicacion = Publicaciones.query.get(codigo)
		if publicacion:
			publicacion.descripcion = descripcion
			publicacion.imagen = imagen
			db.session.commit()
			return jsonify({'message':'Publicacion actualizada correctamente'})
		else: 
			return jsonify({'message':'Publicacion no registrada'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Eliminar Publicacion


@app.route('/posts/<codigo>', methods=['DELETE'])
def deletePost(codigo):
	try:
		publicacion = Publicaciones.query.get(codigo)
		if publicacion:
			db.session.delete(publicacion)
			db.session.commit()
			return jsonify({'message':'Publicacion eliminada correctamente'})
		else:
			return jsonify({'message':'Publicacion no registrada'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400



# Comentarios



# Crear Comentario


@app.route('/comments', methods=['POST'])
def createComment():
	try:
		codigo = uuid.uuid4()
		id_usuario = request.json['id_usuario']
		comentario = request.json['comentario']
		codigo_publicacion = request.json['codigo_publicacion']

		newComentario = Comentarios(codigo, id_usuario, comentario, codigo_publicacion, datetime.now())
		db.session.add(newComentario)
		db.session.commit()
		return jsonify({'message':'Comentario creado correctamente'})
	except IntegrityError:
		db.session.rollback()
		return jsonify({'message':'El comentario no se pudo registrar'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Obtener Todos los Comentarios


@app.route('/comments', methods=['GET'])
def getComments():
	try:
		all_comentarios = Comentarios.query.all()
		result = comentarios_schema.dump(all_comentarios)
		if all_comentarios:
			return jsonify(result)
		else:
			return jsonify({'message': 'No se encontraron comentarios registrados'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Obtener Comentario


@app.route('/comments/<codigo>', methods=['GET'])
def getComment(codigo):
	try:
		comentario = Comentarios.query.get(codigo)
		if comentario:
			return comentario_schema.jsonify(comentario)
		else:
			return jsonify({'message': 'Comentario no registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Editar Comentario


@app.route('/comments/<codigo>', methods=['PUT'])
def updateComment(codigo):
	try:
		comentario_req = request.json['comentario']

		comentario = Comentarios.query.get(codigo)
		if comentario:
			comentario.comentario = comentario_req
			db.session.commit()
			return jsonify({'message':'Comentario actualizado correctamente'})
		else: 
			return jsonify({'message':'Comentario no registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Eliminar Comentario


@app.route('/comments/<codigo>', methods=['DELETE'])
def deleteComment(codigo):
	try:
		comentario = Comentarios.query.get(codigo)
		if comentario:
			db.session.delete(comentario)
			db.session.commit()
			return jsonify({'message':'Comentario eliminado correctamente'})
		else:
			return jsonify({'message':'Comentario no registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400




# Mensajes



# Crear Mensaje



@app.route('/messages', methods=['POST'])
def createMessage():
	try:
		codigo = uuid.uuid4()
		id_usuario_enviado = request.json['id_usuario_enviado']
		id_usuario_recivido = request.json['id_usuario_recivido']
		mensaje = request.json['mensaje']

		newComentario = Mensajes(codigo, id_usuario_enviado, id_usuario_recivido, mensaje, datetime.now())
		db.session.add(newComentario)
		db.session.commit()
		return jsonify({'message':'Mensaje creado correctamente'})
	except IntegrityError:
		db.session.rollback()
		return jsonify({'message':'El comentario ya se encuantra registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Obtener todos los Mensajes


@app.route('/messages', methods=['GET'])
def getMessages():
	try:
		all_mensajes = Mensajes.query.all()
		result = mensajes_schema.dump(all_mensajes)
		if all_mensajes:
			return jsonify(result)
		else:
			return jsonify({'message': 'No se encontraron mensajes registrados'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Obtener Mensaje


@app.route('/messages/<codigo>', methods=['GET'])
def getMessage(codigo):
	try:
		mensaje = Mensajes.query.get(codigo)
		if mensaje:
			return mensaje_schema.jsonify(mensaje)
		else:
			return jsonify({'message': 'Mensaje no registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Editar Mensaje


@app.route('/messages/<codigo>', methods=['PUT'])
def updateMessage(codigo):
	try:
		mensaje_req = request.json['mensaje']

		mensaje = Mensajes.query.get(codigo)
		if mensaje:
			mensaje.mensaje = mensaje_req
			db.session.commit()
			return jsonify({'message':'Mensaje actualizado correctamente'})
		else: 
			return jsonify({'message':'Mensaje no registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400


# Eliminar Mensaje


@app.route('/messages/<codigo>', methods=['DELETE'])
def deleteMessage(codigo):
	try:
		mensaje = Mensajes.query.get(codigo)
		if mensaje:
			db.session.delete(mensaje)
			db.session.commit()
			return jsonify({'message':'Mensaje eliminado correctamente'})
		else:
			return jsonify({'message':'Mensaje no registrado'}), 400
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'}), 400



if __name__ == '__main__':
	load_dotenv()
	app.run(port = 5000, debug= True)