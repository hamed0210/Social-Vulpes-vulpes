from flask import Flask, request, jsonify
import uuid
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'social_vulpes_vulpes'
mysql = MySQL(app)
CORS(app)

# Rutas

# Inicio de Sesion

@app.route('/signin', methods=['GET'])
def signIn():
	try:
		username = request.json['username']
		password = request.json['password']
		cur = mysql.connection.cursor()
		cur.execute('SELECT * FROM usuarios WHERE username = %s AND pass = %s', (username, password))
		data = cur.fetchall()
		cur.close()
		if len(data) == 0:
			return jsonify('Datos ingresados son incorrectos')
		else:
			return jsonify(data[0])
	except:
		return jsonify('Ocurrió un error al realizar la operación')

# Usuarios 

@app.route('/users', methods=['POST'])
def createUser():
	try:
		id = request.json['id']
		nombres = request.json['nombres']
		apellidos = request.json['apellidos']
		username = request.json['username']
		email = request.json['email']
		password = request.json['password']
		role = request.json['role']
		cur = mysql.connection.cursor()
		cur.execute('INSERT INTO usuarios (id, nombres, apellidos, username, email, pass, role) VALUES (%s,%s,%s,%s,%s,%s,%s)', (id, nombres, apellidos, username, email, password, role))
		mysql.connection.commit()
		cur.close()
		return jsonify('Usuario creado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/users', methods=['GET'])
def getUsers():
	try:
		cur = mysql.connection.cursor()
		cur.execute('SELECT * FROM usuarios')
		data = cur.fetchall()
		cur.close()
		if len(data) == 0:
			return jsonify('No hay usuarios registrados')
		else:
			return jsonify(data)
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/users/<id>', methods=['GET'])
def getUser(id):
	try:
		cur = mysql.connection.cursor()
		cur.execute('SELECT * FROM usuarios WHERE id = {0}'.format(id) )
		data = cur.fetchall()
		cur.close()
		if len(data) == 0:
			return jsonify('Usuario no registrado')
		else:
			return jsonify(data[0])
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
	try:
		nombres = request.json['nombres']
		apellidos = request.json['apellidos']
		username = request.json['username']
		email = request.json['email']
		password = request.json['password']
		role = request.json['role']
		cur = mysql.connection.cursor()
		cur.execute('UPDATE usuarios SET nombres = %s, apellidos = %s, username = %s, email = %s, pass = %s, role = %s WHERE id = %s', (nombres, apellidos, username, email, password, role, id))
		mysql.connection.commit()
		cur.close()
		return jsonify('Usuario actualizado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
	try:
		cur = mysql.connection.cursor()
		cur.execute('DELETE FROM usuarios WHERE id = {0}'.format(id))
		mysql.connection.commit()
		cur.close()
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
		cur = mysql.connection.cursor()
		cur.execute('INSERT INTO publicaciones (codigo, username, imagen, descripcion) VALUES (%s,%s,%s,%s)', (codigo, username, imagen, descripcion))
		mysql.connection.commit()
		cur.close()
		return jsonify('Publicacion creada correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/posts', methods=['GET'])
def getPosts():
	try:
		cur = mysql.connection.cursor()
		cur.execute('SELECT * FROM publicaciones')
		data = cur.fetchall()
		cur.close()
		if len(data) == 0:
			return jsonify('No hay publicaciones creadas')
		else:
			return jsonify(data)
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/posts/<codigo>', methods=['GET'])
def getPost(codigo):
	try:
		cur = mysql.connection.cursor()
		cur.execute('SELECT * FROM publicaciones WHERE codigo = {0}'.format(codigo) )
		data = cur.fetchall()
		cur.close()
		if len(data) == 0:
			return jsonify('Publicaciones no creada')
		else:
			return jsonify(data[0])
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/posts/<codigo>', methods=['PUT'])
def updatePost(codigo):
	try:
		username = request.json['username']
		imagen = request.json['imagen']
		descripcion = request.json['descripcion']
		cur = mysql.connection.cursor()
		cur.execute('UPDATE publicaciones SET username = %s, imagen = %s, descripcion = %s WHERE codigo = %s', (username, imagen, descripcion, codigo))
		mysql.connection.commit()
		cur.close()
		return jsonify('Publicacion actualizada correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/posts/<codigo>', methods=['DELETE'])
def deletePost(codigo):
	try:
		cur = mysql.connection.cursor()
		cur.execute('DELETE FROM publicaciones WHERE codigo = {0}'.format(codigo))
		mysql.connection.commit()
		cur.close()
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
		cur = mysql.connection.cursor()
		cur.execute('INSERT INTO comentarios (codigo, username, comentario, codigo_publicacion) VALUES (%s,%s,%s,%s)', (codigo, username, comentario, codigo_publicacion))
		mysql.connection.commit()
		cur.close()
		return jsonify('Comentario creado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/comments', methods=['GET'])
def getComments():
	try:
		cur = mysql.connection.cursor()
		cur.execute('SELECT * FROM comentarios')
		data = cur.fetchall()
		cur.close()
		if len(data) == 0:
			return jsonify('No hay comentarios en la publicacion')
		else:
			return jsonify(data)
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/comments/<codigo>', methods=['GET'])
def getComment(codigo):
	try:
		cur = mysql.connection.cursor()
		cur.execute('SELECT * FROM comentarios WHERE codigo = {0}'.format(codigo) )
		data = cur.fetchall()
		cur.close()
		if len(data) == 0:
			return jsonify('Comentario no registrado')
		else:
			return jsonify(data[0])
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/comments/<codigo>', methods=['PUT'])
def updateComment(codigo):
	try:
		username = request.json['username']
		comentario = request.json['comentario']
		codigo_publicacion = request.json['codigo_publicacion']
		cur = mysql.connection.cursor()
		cur.execute('UPDATE comentarios SET username = %s, comentario = %s, codigo_publicacion = %s WHERE codigo = %s', (username, comentario, codigo_publicacion, codigo))
		mysql.connection.commit()
		cur.close()
		return jsonify('Comentario actualizado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/comments/<codigo>', methods=['DELETE'])
def deleteComment(codigo):
	try:
		cur = mysql.connection.cursor()
		cur.execute('DELETE FROM comentarios WHERE codigo = {0}'.format(codigo))
		mysql.connection.commit()
		cur.close()
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
		cur = mysql.connection.cursor()
		cur.execute('INSERT INTO mensajes (codigo, username_enviado, username_recivido, mensaje) VALUES (%s,%s,%s,%s)', (codigo, username_enviado, username_recivido, mensaje))
		mysql.connection.commit()
		cur.close()
		return jsonify('Mensaje creado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/messages', methods=['GET'])
def getMessages():
	try:
		cur = mysql.connection.cursor()
		cur.execute('SELECT * FROM mensajes')
		data = cur.fetchall()
		cur.close()
		if len(data) == 0:
			return jsonify('No hay mensajes recividos')
		else:
			return jsonify(data)
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/messages/<codigo>', methods=['GET'])
def getMessage(codigo):
	try:
		cur = mysql.connection.cursor()
		cur.execute('SELECT * FROM mensajes WHERE codigo = {0}'.format(codigo) )
		data = cur.fetchall()
		cur.close()
		if len(data) == 0:
			return jsonify('Mensaje no registrado')
		else:
			return jsonify(data[0])
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/messages/<codigo>', methods=['PUT'])
def updateMessage(codigo):
	try:
		username_enviado = request.json['username_enviado']
		username_recivido = request.json['username_recivido']
		mensaje = request.json['mensaje']
		cur = mysql.connection.cursor()
		cur.execute('UPDATE mensajes SET username_enviado = %s, username_recivido = %s, mensaje = %s WHERE codigo = %s', (username_enviado, username_recivido, mensaje, codigo))
		mysql.connection.commit()
		cur.close()
		return jsonify('Mensaje actualizado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

@app.route('/messages/<codigo>', methods=['DELETE'])
def deleteMessage(codigo):
	try:
		cur = mysql.connection.cursor()
		cur.execute('DELETE FROM mensajes WHERE codigo = {0}'.format(codigo))
		mysql.connection.commit()
		cur.close()
		return jsonify('Mensaje eliminado correctamente')
	except:
		return jsonify('Ocurrió un error al realizar la operación')

if __name__ == '__main__':
	app.run(port = 5000, debug= True)