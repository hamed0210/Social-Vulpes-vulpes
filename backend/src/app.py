from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import uuid
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from function_jwt import write_token, valida_token

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/social_vulpes_vulpes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# app.config['SECRET_KEY'] = 'z8V42cOhqorMFvnpf5LPQIt3U0Wag9T1'

mysql = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)

# Rutas

# Inicio de Sesion

class Usuarios(mysql.Model):
	id = mysql.Column(mysql.Integer, primary_key=True)
	avatar = mysql.Column(mysql.String(50))
	nombres = mysql.Column(mysql.String(50))
	apellidos = mysql.Column(mysql.String(50))
	username = mysql.Column(mysql.String(50), unique=True)
	email = mysql.Column(mysql.String(25), unique=True)
	password = mysql.Column(mysql.String(90))
	role = mysql.Column(mysql.String())
	descripcion = mysql.Column(mysql.String(200))
	fecha_creacion = mysql.Column(mysql.DateTime)

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

mysql.create_all()

class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombres', 'apellidos', 'username', 'email', 'password', 'role', 'fecha_creacion')

usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)

@app.route('/signin', methods=['POST'])
def signIn():
	try:
		username = request.json['username']
		password = request.json['password']

		usuario = Usuarios.query.filter_by(username=username).first()

		if not usuario or not check_password_hash(usuario.password, password):
			return jsonify({'message': 'Datos ingresados son incorrectos'}), 400
		else:
			# data = usuario_schema.jsonify(usuario)
			token = write_token(data=usuario.username)
			return jsonify({'token': str(token)})
	except:
		return jsonify({'message':'Ocurrió un error al realizar la operación'})

@app.route('/check', methods=['POST'])
def check():
	try:
		bearer = request.headers['Authorization'].split(' ')
		token = bearer[1]
		token_clear = token.split("'")
		return valida_token(token_clear[1], output=True)
	except:
		return jsonify('Ocurrió un error al realizar la operación'), 400


# Usuarios 

@app.route('/users', methods=['POST'])
def createUser():
	try:
		id = request.json['id']
		avatar = request.json['avatar']
		nombres = request.json['nombres']
		apellidos = request.json['apellidos']
		username = request.json['username']
		email = request.json['email']
		password = generate_password_hash(request.json['password'], method='sha256')
		role = request.json['role']
		descripcion = request.json['descripcion']

		print(id, avatar, nombres, apellidos, username, email, password, role, descripcion)

		newUsuario = Usuarios(id, avatar, nombres, apellidos, username, email, password, role, descripcion, datetime.now())
		mysql.session.add(newUsuario)
		mysql.session.commit()

		# print(usuario_schema.jsonify(newUsuario))
		
		return jsonify('Usuario creado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/users', methods=['GET'])
def getUsers():
	try:
		all_usuarios = Usuarios.query.all()
		result = usuarios_schema.dump(all_usuarios)
		print(result)
		if all_usuarios:
			return jsonify(result)
		else:
			return jsonify({'message': 'No se encontraron usuarios registrados'}), 400
	except:
		return jsonify('Ocurrió un error al realizar la operación'), 400

@app.route('/users/<id>', methods=['GET'])
def getUser(id):
	try:
		usuario = Usuarios.query.get(id)
		if usuario:
			return usuario_schema.jsonify(usuario)
		else:
			return jsonify({'message': 'Usuario no registrado'}), 400
	except:
		return jsonify('Ocurrió un error al realizar la operación'), 400

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
	try:
		# avatar = request.json['avatar']
		nombres = request.json['nombres']
		apellidos = request.json['apellidos']
		username = request.json['username']
		email = request.json['email']
		role = request.json['role']
		descripcion = request.json['descripcion']

		usuario = Usuarios.query.get(id)
		if usuario:
			# return usuario_schema.jsonify(usuario)
			# usuario.avatar = usuario.avatar
			usuario.nombres = nombres
			usuario.apellidos = apellidos
			usuario.username = username
			usuario.email = email
			# usuario.password = usuario.password
			usuario.role = role
			usuario.descripcion = descripcion
			# usuario.fecha_creacion = usuario.fecha_creacion
			mysql.session.commit()
			return jsonify({'data': usuario_schema.jsonify(usuario), 'message':'Usuario actualizado correctamente'})
		else:
			return jsonify({'message': 'Usuario no registrado'}), 400
	except:
		return jsonify('Ocurrió un error al realizar la operación'), 400

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
	try:
		usuario = Usuarios.query.get(id)
		mysql.session.delete(usuario)
		mysql.session.commit()
		print(usuario_schema(usuario))
		return jsonify('Usuario eliminado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

# Publicaciones

@app.route('/posts', methods=['POST'])
def createPost():
	try:
		codigo = uuid.uuid4()
		username = request.json['username']
		imagen = request.json['imagen']
		descripcion = request.json['descripcion']
		return jsonify('Publicacion creada correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/posts', methods=['GET'])
def getPosts():
	try:
		return 'ss'
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/posts/<codigo>', methods=['GET'])
def getPost(codigo):
	try:
		return 'ss'
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/posts/<codigo>', methods=['PUT'])
def updatePost(codigo):
	try:
		username = request.json['username']
		imagen = request.json['imagen']
		descripcion = request.json['descripcion']
		
		return jsonify('Publicacion actualizada correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/posts/<codigo>', methods=['DELETE'])
def deletePost(codigo):
	try:
		
		return jsonify('Publicacion eliminada correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

# Comentarios

@app.route('/comments', methods=['POST'])
def createComment():
	try:
		codigo = uuid.uuid4()
		username = request.json['username']
		comentario = request.json['comentario']
		codigo_publicacion = request.json['codigo_publicacion']
		
		return jsonify('Comentario creado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/comments', methods=['GET'])
def getComments():
	try:
		return 'ss'
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/comments/<codigo>', methods=['GET'])
def getComment(codigo):
	try:
		return 'ss'
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/comments/<codigo>', methods=['PUT'])
def updateComment(codigo):
	try:
		username = request.json['username']
		comentario = request.json['comentario']
		codigo_publicacion = request.json['codigo_publicacion']
		
		return jsonify('Comentario actualizado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/comments/<codigo>', methods=['DELETE'])
def deleteComment(codigo):
	try:
		
		return jsonify('Comentario eliminado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

# Mensajes

@app.route('/messages', methods=['POST'])
def createMessage():
	try:
		codigo = uuid.uuid4()
		username_enviado = request.json['username_enviado']
		username_recivido = request.json['username_recivido']
		mensaje = request.json['mensaje']
		
		return jsonify('Mensaje creado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/messages', methods=['GET'])
def getMessages():
	try:
		return 'ss'
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/messages/<codigo>', methods=['GET'])
def getMessage(codigo):
	try:
		return 'ss'
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/messages/<codigo>', methods=['PUT'])
def updateMessage(codigo):
	try:
		username_enviado = request.json['username_enviado']
		username_recivido = request.json['username_recivido']
		mensaje = request.json['mensaje']
		
		return jsonify('Mensaje actualizado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/messages/<codigo>', methods=['DELETE'])
def deleteMessage(codigo):
	try:
		
		return jsonify('Mensaje eliminado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')



if __name__ == '__main__':
	load_dotenv()
	app.run(port = 5000, debug= True)