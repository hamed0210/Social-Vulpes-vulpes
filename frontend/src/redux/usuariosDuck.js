import axios from 'axios'

// Constantes
const URI = process.env.REACT_APP_URI
const PORT = process.env.REACT_APP_PORT

const dataInicial = {
	array: [],
	message: '',
}

// Types
const OBTENER_USUARIOS_EXITO = 'OBTENER_USUARIOS_EXITO'
const OBTENER_USUARIOS_ERROR = 'OBTENER_USUARIOS_ERROR'
const NUEVO_USUARIO_EXITO = 'NUEVO_USUARIO_EXITO'
const NUEVO_USUARIO_ERROR = 'NUEVO_USUARIO_ERROR'
const ELIMINAR_USUARIO_EXITO = 'ELIMINAR_USUARIO_EXITO'
const ELIMINAR_USUARIO_MESSAGE_EXITO = 'ELIMINAR_USUARIO_MESSAGE_EXITO'
const ELIMINAR_USUARIO_ERROR = 'ELIMINAR_USUARIO_ERROR'

// Reducer
export default function loginReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_USUARIOS_EXITO:
			return {
				...state,
				array: action.payload.array,
			}
		case OBTENER_USUARIOS_ERROR:
			return {
				...state,
				message: action.payload.message,
			}
		case NUEVO_USUARIO_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case NUEVO_USUARIO_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		case ELIMINAR_USUARIO_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_USUARIO_MESSAGE_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_USUARIO_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		default:
			return state
	}
}

//Acciones

export const obtenerUsuariosAccion = () => async (dispath) => {
	try {
		const res = await axios.get(`${URI}${PORT}/users`)

		if (res) {
			dispath({
				type: OBTENER_USUARIOS_EXITO,
				payload: {
					array: res.data,
					message: '',
				},
			})
			// setLoading(false)
		}
	} catch (error) {
		if (error.message === 'Network Error') {
			dispath({
				type: OBTENER_USUARIOS_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: OBTENER_USUARIOS_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})
		// setTimeout(() => {
		// 	dispath({
		// 		type: OBTENER_USUARIOS_ERROR,
		// 		payload: {
		// 			message: '',
		// 		},
		// 	})
		// }, 5000)
		console.log(error.request)
	}
}

export const eliminarUsuarioAccion =
	(data, history, setLoading, setShowEliminar) => async (dispath) => {
		// const token = getLocalStorage()
		try {
			setLoading(true)

			const result = await axios.delete(`${URI}${PORT}/users/${data}`)

			dispath({
				type: ELIMINAR_USUARIO_EXITO,
				payload: {
					message: result.data.message,
				},
			})

			setLoading(false)
			setShowEliminar(false)

			// setTimeout(() => {
			// 	dispath({
			// 		type: ELIMINAR_USUARIO_MESSAGE_EXITO,
			// 		payload: {
			// 			message: '',
			// 		},
			// 	})
			// }, 5000)
		} catch (error) {
			// if (error.request.status === 401) {
			// 	// removeLocalStorage()
			// 	const message = 'La sesion a caducado, inicia sesion nuevamente'
			// 	// dispath(cerrarSesionAccion(history, message))
			// 	return history.push('/login')
			// }
			if (error.message === 'Network Error') {
				dispath({
					type: ELIMINAR_USUARIO_ERROR,
					payload: {
						message: 'Error de conexión con el servidor',
					},
				})
			} else
				dispath({
					type: ELIMINAR_USUARIO_ERROR,
					payload: {
						message: JSON.parse(error.request.response).message,
					},
				})

			setLoading(false)
			setShowEliminar(false)

			// setTimeout(() => {
			// 	dispath({
			// 		type: ELIMINAR_USUARIO_ERROR,
			// 		payload: {
			// 			message: '',
			// 		},
			// 	})
			// }, 5000)
			console.log(error.request)
		}
	}
