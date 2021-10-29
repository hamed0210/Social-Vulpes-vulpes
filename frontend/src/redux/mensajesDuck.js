import axios from 'axios'

// import { cerrarSesionAccion } from 'redux/loginDuck'

const URI = process.env.REACT_APP_URI
const PORT = process.env.REACT_APP_PORT

const dataInicial = {
	array: [],
	message: '',
	success: false,
}

// Types
const OBTENER_MENSAJES_EXITO = 'OBTENER_MENSAJES_EXITO'
const OBTENER_MENSAJES_ERROR = 'OBTENER_MENSAJES_ERROR'
const NUEVO_MENSAJE_EXITO = 'NUEVO_MENSAJE_EXITO'
const NUEVO_MENSAJE_ERROR = 'NUEVO_MENSAJE_ERROR'
const ELIMINAR_MENSAJE_EXITO = 'ELIMINAR_MENSAJE_EXITO'
const ELIMINAR_MENSAJE_MESSAGE_EXITO = 'ELIMINAR_MENSAJE_MESSAGE_EXITO'
const ELIMINAR_MENSAJE_ERROR = 'ELIMINAR_MENSAJE_ERROR'

// Reducer
export default function mensajesReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_MENSAJES_EXITO:
			return {
				...state,
				array: action.payload.data,
			}
		case OBTENER_MENSAJES_ERROR:
			return {
				...state,
				message: action.payload.message,
			}
		case NUEVO_MENSAJE_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case NUEVO_MENSAJE_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		case ELIMINAR_MENSAJE_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_MENSAJE_MESSAGE_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_MENSAJE_ERROR:
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

export const obtenerMensajesAccion =
	(history, setLoadingState, setLoadingStateNewPost) => async (dispath) => {
		try {
			const result = await axios.get(`${URI}${PORT}/posts`)

			/*
			Recorremos el resultado de la peticion para cambiar codigo de campo foraneo con el nombre de la categoria
		 */
			// result.data.data.map((el) => {
			// 	el['categoria'] = el['category'].nombre
			// 	return delete el['category']
			// })
			dispath({
				type: OBTENER_MENSAJES_EXITO,
				payload: {
					data: result.data,
				},
			})
			setLoadingState(true)
			result && setLoadingStateNewPost(false)
		} catch (error) {
			setLoadingState(true)
			setLoadingStateNewPost(false)
			// if (error.request.status === 401) {
			// 	removeLocalStorage()
			// 	const message = 'La sesion a caducado, inicia sesion nuevamente'
			// 	dispath(cerrarSesionAccion(history, message))
			// }
			if (error.message === 'Network Error') {
				dispath({
					type: OBTENER_MENSAJES_ERROR,
					payload: {
						message: 'Error de conexión con el servidor',
					},
				})
			} else
				dispath({
					type: OBTENER_MENSAJES_ERROR,
					payload: {
						message: JSON.parse(error.request.response).message,
					},
				})
			// setTimeout(() => {
			// 	dispath({
			// 		type: OBTENER_MENSAJES_ERROR,
			// 		payload: {
			// 			message: '',
			// 		},
			// 	})
			// }, 5000)
			console.log(error.request)
		}
	}

export const nuevoMensajeAccion =
	(data, history, setLoading, setResetForm) => async (dispath) => {
		try {
			setLoading(true)

			const result = await axios.post(`${URI}${PORT}/posts`, data)
			dispath({
				type: NUEVO_MENSAJE_EXITO,
				payload: {
					message: result.data.message,
				},
			})

			setLoading(false)
			setResetForm(true)

			// setTimeout(() => {
			// 	dispath({
			// 		type: NUEVO_MENSAJE_EXITO,
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
					type: NUEVO_MENSAJE_ERROR,
					payload: {
						message: 'Error de conexión con el servidor',
					},
				})
			} else
				dispath({
					type: NUEVO_MENSAJE_ERROR,
					payload: {
						message: JSON.parse(error.request.response).message,
					},
				})
			setLoading(false)
			setResetForm(false)

			// setTimeout(() => {
			// 	dispath({
			// 		type: NUEVO_MENSAJE_ERROR,
			// 		payload: {
			// 			message: '',
			// 		},
			// 	})
			// }, 5000)
			console.log(error.request)
		}
	}

// export const editarPublicacionAccion =
// 	(data, history, setLoading, handleVerEditarCerrar) =>
// 	async (dispath, getState) => {
// 		// const token = getLocalStorage()
// 		try {
// 			setLoading(true)

// 			const result = await axios.put(`${URI}${PORT}/posts/${data.codigo}`, data)

// 			// const productoEditado = getState().productos.array.map((el) => {
// 			// 	return el.codigo === result.data.data.codigo
// 			// 		? (el = result.data.data)
// 			// 		: el
// 			// })

// 			dispath({
// 				type: ELIMINAR_MENSAJE_EXITO,
// 				payload: {
// 					// array: productoEditado,
// 					message: result.data.message,
// 				},
// 			})

// 			setLoading(false)
// 			handleVerEditarCerrar()

// 			// setTimeout(() => {
// 			// 	dispath({
// 			// 		type: ELIMINAR_MENSAJE_MESSAGE_EXITO,
// 			// 		payload: {
// 			// 			message: '',
// 			// 		},
// 			// 	})
// 			// }, 5000)
// 		} catch (error) {
// 			if (error.request.status === 401) {
// 				// removeLocalStorage()
// 				const message = 'La sesion a caducado, inicia sesion nuevamente'
// 				// dispath(cerrarSesionAccion(history, message))
// 				return history.push('/login')
// 			}
// 			if (error.message === 'Network Error') {
// 				dispath({
// 					type: ELIMINAR_MENSAJE_ERROR,
// 					payload: {
// 						message: 'Error de conexión con el servidor',
// 					},
// 				})
// 			} else
// 				dispath({
// 					type: ELIMINAR_MENSAJE_ERROR,
// 					payload: {
// 						message: JSON.parse(error.request.response).message,
// 					},
// 				})

// 			setLoading(false)
// 			handleVerEditarCerrar()

// 			// setTimeout(() => {
// 			// 	dispath({
// 			// 		type: ELIMINAR_MENSAJE_ERROR,
// 			// 		payload: {
// 			// 			message: '',
// 			// 		},
// 			// 	})
// 			// }, 5000)
// 			console.log(error.request)
// 		}
// 	}

export const eliminarMensajeAccion =
	(data, history, setLoading, setShowEliminar) => async (dispath) => {
		// const token = getLocalStorage()
		try {
			setLoading(true)

			const result = await axios.delete(`${URI}${PORT}/posts/${data}`)

			dispath({
				type: ELIMINAR_MENSAJE_EXITO,
				payload: {
					message: result.data.message,
				},
			})

			setLoading(false)
			setShowEliminar(false)

			// setTimeout(() => {
			// 	dispath({
			// 		type: ELIMINAR_MENSAJE_MESSAGE_EXITO,
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
					type: ELIMINAR_MENSAJE_ERROR,
					payload: {
						message: 'Error de conexión con el servidor',
					},
				})
			} else
				dispath({
					type: ELIMINAR_MENSAJE_ERROR,
					payload: {
						message: JSON.parse(error.request.response).message,
					},
				})

			setLoading(false)
			setShowEliminar(false)

			// setTimeout(() => {
			// 	dispath({
			// 		type: ELIMINAR_MENSAJE_ERROR,
			// 		payload: {
			// 			message: '',
			// 		},
			// 	})
			// }, 5000)
			console.log(error.request)
		}
	}
