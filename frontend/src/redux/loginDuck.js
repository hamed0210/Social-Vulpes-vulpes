import axios from 'axios'

// Constantes
const URI = process.env.REACT_APP_URI
const PORT = process.env.REACT_APP_PORT

const dataInicial = {
	user: [],
	message: '',
}

// Types
const INICIAR_SESION_EXITO = 'INICIAR_SESION_EXITO'
const INICIAR_SESION_ERROR = 'INICIAR_SESION_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'

// Reducer
export default function loginReducer(state = dataInicial, action) {
	switch (action.type) {
		case INICIAR_SESION_EXITO:
			return {
				...state,
				user: action.payload.user,
				message: '',
			}
		case INICIAR_SESION_ERROR:
			return {
				...state,
				message: action.payload.message,
			}
		case CERRAR_SESION:
			return {
				user: [],
				message: action.payload.message,
			}
		// return { ...dataInicial }
		default:
			return state
	}
}

//Acciones

export const iniciarSesionAccion =
	(data, history, setLoading) => async (dispath) => {
		try {
			setLoading(true)

			const res = await axios.post(`${URI}${PORT}/signin`, data)

			if (res.length !== 0) {
				dispath({
					type: INICIAR_SESION_EXITO,
					payload: {
						user: res.data,
						message: '',
					},
				})
				setLoading(false)
				localStorage.setItem('user', JSON.stringify(res.data))
				history.push('/')
			}
		} catch (error) {
			// setLoading(false)
			if (error.message === 'Network Error') {
				dispath({
					type: INICIAR_SESION_ERROR,
					payload: {
						message: 'Error de conexión con el servidor',
					},
				})
			}
			// error.request.response &&
			// 	dispath({
			// 		type: INICIAR_SESION_ERROR,
			// 		payload: {
			// 			message: JSON.parse(error.request.response).message,
			// 		},
			// 	})
			console.log(error)
		}
	}

export const cerrarSesionAccion =
	(history, message = '') =>
	async (dispath) => {
		dispath({
			type: CERRAR_SESION,
			payload: {
				message,
			},
		})
		localStorage.removeItem('user')
		history.push('/login')
	}
