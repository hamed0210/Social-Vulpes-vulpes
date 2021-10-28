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
const CERRAR_SESION = 'CERRAR_SESION'

// Reducer
export default function loginReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_USUARIOS_EXITO:
			return {
				...state,
				array: action.payload.array,
				message: '',
			}
		case OBTENER_USUARIOS_ERROR:
			return {
				...state,
				message: action.payload.message,
			}
		case CERRAR_SESION:
			return {
				array: [],
				message: action.payload.message,
			}
		// return { ...dataInicial }
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
		}
		error.request.response &&
			dispath({
				type: OBTENER_USUARIOS_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})
		console.log(error)
	}
}
