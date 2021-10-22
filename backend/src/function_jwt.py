from flask import jsonify
from jwt import encode, decode, exceptions
from os import getenv
from datetime import datetime, timedelta

def expire_date(days: int):
	now = datetime.now()
	new_date = now + timedelta(days)
	return new_date


def write_token(data):
	token = encode(payload={'username':data, "exp": expire_date(1)}, key=getenv("SECRET_KEY"), algorithm="HS256")
	return token.encode("UTF-8")


def valida_token(token, output=False):
	try:
		if output:
			return decode(token, key=getenv("SECRET_KEY"), algorithms="HS256")
		decode(token, key=getenv("SECRET_KEY"), algorithms="HS256")
	except exceptions.DecodeError:
		response = jsonify({'message': 'Invalid Token'})
		response.status_code = 401
		return response
	except exceptions.ExpiredSignatureError:
		response = jsonify({'message': 'Token Expired'})
		response.status_code = 401
		return response
		