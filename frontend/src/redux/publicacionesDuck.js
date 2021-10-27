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
const OBTENER_PUBLICACIONES_EXITO = 'OBTENER_PUBLICACIONES_EXITO'
const OBTENER_PUBLICACIONES_ERROR = 'OBTENER_PUBLICACIONES_ERROR'
const NUEVO_PUBLICACION_EXITO = 'NUEVO_PUBLICACION_EXITO'
const NUEVO_PUBLICACION_ERROR = 'NUEVO_PUBLICACION_ERROR'
const ELIMINAR_PUBLICACION_EXITO = 'ELIMINAR_PUBLICACION_EXITO'
const ELIMINAR_PUBLICACION_MESSAGE_EXITO = 'ELIMINAR_PUBLICACION_MESSAGE_EXITO'
const ELIMINAR_PUBLICACION_ERROR = 'ELIMINAR_PUBLICACION_ERROR'

// Reducer
export default function publicacionesReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_PUBLICACIONES_EXITO:
			return {
				...state,
				array: action.payload.data,
			}
		case OBTENER_PUBLICACIONES_ERROR:
			return {
				...state,
				message: action.payload.message,
			}
		case NUEVO_PUBLICACION_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case NUEVO_PUBLICACION_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		case ELIMINAR_PUBLICACION_EXITO:
			return {
				...state,
				array: action.payload.array,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_PUBLICACION_MESSAGE_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_PUBLICACION_ERROR:
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

export const obtenerPublicacionesAccion = (history) => async (dispath) => {
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
			type: OBTENER_PUBLICACIONES_EXITO,
			payload: {
				data: result.data,
			},
		})
	} catch (error) {
		// if (error.request.status === 401) {
		// 	removeLocalStorage()
		// 	const message = 'La sesion a caducado, inicia sesion nuevamente'
		// 	dispath(cerrarSesionAccion(history, message))
		// }
		if (error.message === 'Network Error') {
			dispath({
				type: OBTENER_PUBLICACIONES_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: OBTENER_PUBLICACIONES_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})
		// setTimeout(() => {
		// 	dispath({
		// 		type: OBTENER_PUBLICACIONES_ERROR,
		// 		payload: {
		// 			message: '',
		// 		},
		// 	})
		// }, 5000)
		console.log(error.request)
	}
}

export const nuevaPublicacionAccion =
	(data, history, setLoading, setResetForm) => async (dispath) => {
		try {
			setLoading(true)

			const result = await axios.post(`${URI}${PORT}/posts`, data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			// dispath({
			// 	type: NUEVO_PUBLICACION_EXITO,
			// 	payload: {
			// 		message: result.data.message,
			// 	},
			// })

			setLoading(false)
			// setResetForm(true)

			// setTimeout(() => {
			// 	dispath({
			// 		type: NUEVO_PUBLICACION_EXITO,
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
					type: NUEVO_PUBLICACION_ERROR,
					payload: {
						message: 'Error de conexión con el servidor',
					},
				})
			} else
				dispath({
					type: NUEVO_PUBLICACION_ERROR,
					payload: {
						message: JSON.parse(error.request.response).message,
					},
				})
			setLoading(false)
			// setResetForm(false)

			// setTimeout(() => {
			// 	dispath({
			// 		type: NUEVO_PUBLICACION_ERROR,
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
// 				type: ELIMINAR_PUBLICACION_EXITO,
// 				payload: {
// 					// array: productoEditado,
// 					message: result.data.message,
// 				},
// 			})

// 			setLoading(false)
// 			handleVerEditarCerrar()

// 			// setTimeout(() => {
// 			// 	dispath({
// 			// 		type: ELIMINAR_PUBLICACION_MESSAGE_EXITO,
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
// 					type: ELIMINAR_PUBLICACION_ERROR,
// 					payload: {
// 						message: 'Error de conexión con el servidor',
// 					},
// 				})
// 			} else
// 				dispath({
// 					type: ELIMINAR_PUBLICACION_ERROR,
// 					payload: {
// 						message: JSON.parse(error.request.response).message,
// 					},
// 				})

// 			setLoading(false)
// 			handleVerEditarCerrar()

// 			// setTimeout(() => {
// 			// 	dispath({
// 			// 		type: ELIMINAR_PUBLICACION_ERROR,
// 			// 		payload: {
// 			// 			message: '',
// 			// 		},
// 			// 	})
// 			// }, 5000)
// 			console.log(error.request)
// 		}
// 	}

// export const eliminarPublicacionAccion =
// 	(data, history, setLoading, setVerEliminar) => async (dispath) => {
// 		// const token = getLocalStorage()
// 		try {
// 			setLoading(true)

// 			const result = await axios.delete(`${URI}${PORT}/posts/${data.item}`)

// 			dispath({
// 				type: ELIMINAR_PUBLICACION_EXITO,
// 				payload: {
// 					array: data.data,
// 					message: result.data.message,
// 				},
// 			})

// 			setLoading(false)
// 			setVerEliminar(false)

// 			// setTimeout(() => {
// 			// 	dispath({
// 			// 		type: ELIMINAR_PUBLICACION_MESSAGE_EXITO,
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
// 					type: ELIMINAR_PUBLICACION_ERROR,
// 					payload: {
// 						message: 'Error de conexión con el servidor',
// 					},
// 				})
// 			} else
// 				dispath({
// 					type: ELIMINAR_PUBLICACION_ERROR,
// 					payload: {
// 						message: JSON.parse(error.request.response).message,
// 					},
// 				})

// 			setLoading(false)
// 			setVerEliminar(false)

// 			// setTimeout(() => {
// 			// 	dispath({
// 			// 		type: ELIMINAR_PUBLICACION_ERROR,
// 			// 		payload: {
// 			// 			message: '',
// 			// 		},
// 			// 	})
// 			// }, 5000)
// 			console.log(error.request)
// 		}
// 	}
