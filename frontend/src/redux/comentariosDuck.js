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
const OBTENER_COMENTARIOS_EXITO = 'OBTENER_COMENTARIOS_EXITO'
const OBTENER_COMENTARIOS_ERROR = 'OBTENER_COMENTARIOS_ERROR'
const NUEVO_COMENTARIO_EXITO = 'NUEVO_COMENTARIO_EXITO'
const NUEVO_COMENTARIO_ERROR = 'NUEVO_COMENTARIO_ERROR'
const ELIMINAR_COMENTARIO_EXITO = 'ELIMINAR_COMENTARIO_EXITO'
const ELIMINAR_COMENTARIO_MESSAGE_EXITO = 'ELIMINAR_COMENTARIO_MESSAGE_EXITO'
const ELIMINAR_COMENTARIO_ERROR = 'ELIMINAR_COMENTARIO_ERROR'

// Reducer
export default function comentariosReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_COMENTARIOS_EXITO:
			return {
				...state,
				array: action.payload.data,
			}
		case OBTENER_COMENTARIOS_ERROR:
			return {
				...state,
				message: action.payload.message,
			}
		case NUEVO_COMENTARIO_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case NUEVO_COMENTARIO_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		case ELIMINAR_COMENTARIO_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_COMENTARIO_MESSAGE_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_COMENTARIO_ERROR:
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

export const obtenerComentariosAccion =
	(history, setLoadingState, setLoadingStateNewPost) => async (dispath) => {
		try {
			const result = await axios.get(`${URI}${PORT}/comments`)

			/*
			Recorremos el resultado de la peticion para cambiar codigo de campo foraneo con el nombre de la categoria
		 */
			// result.data.data.map((el) => {
			// 	el['categoria'] = el['category'].nombre
			// 	return delete el['category']
			// })
			dispath({
				type: OBTENER_COMENTARIOS_EXITO,
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
					type: OBTENER_COMENTARIOS_ERROR,
					payload: {
						message: 'Error de conexión con el servidor',
					},
				})
			} else
				dispath({
					type: OBTENER_COMENTARIOS_ERROR,
					payload: {
						message: JSON.parse(error.request.response).message,
					},
				})
			// setTimeout(() => {
			// 	dispath({
			// 		type: OBTENER_COMENTARIOS_ERROR,
			// 		payload: {
			// 			message: '',
			// 		},
			// 	})
			// }, 5000)
			console.log(error.request)
		}
	}

export const nuevoComentarioAccion =
	(data, history, setResetForm) => async (dispath) => {
		try {
			const result = await axios.post(`${URI}${PORT}/comments`, data)
			dispath({
				type: NUEVO_COMENTARIO_EXITO,
				payload: {
					message: result.data.message,
				},
			})

			setResetForm(true)

			// setTimeout(() => {
			// 	dispath({
			// 		type: NUEVO_COMENTARIO_EXITO,
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
					type: NUEVO_COMENTARIO_ERROR,
					payload: {
						message: 'Error de conexión con el servidor',
					},
				})
			} else
				dispath({
					type: NUEVO_COMENTARIO_ERROR,
					payload: {
						message: JSON.parse(error.request.response).message,
					},
				})
			setResetForm(false)

			// setTimeout(() => {
			// 	dispath({
			// 		type: NUEVO_COMENTARIO_ERROR,
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

// 			const result = await axios.put(`${URI}${PORT}/comments/${data.codigo}`, data)

// 			// const productoEditado = getState().productos.array.map((el) => {
// 			// 	return el.codigo === result.data.data.codigo
// 			// 		? (el = result.data.data)
// 			// 		: el
// 			// })

// 			dispath({
// 				type: ELIMINAR_COMENTARIO_EXITO,
// 				payload: {
// 					// array: productoEditado,
// 					message: result.data.message,
// 				},
// 			})

// 			setLoading(false)
// 			handleVerEditarCerrar()

// 			// setTimeout(() => {
// 			// 	dispath({
// 			// 		type: ELIMINAR_COMENTARIO_MESSAGE_EXITO,
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
// 					type: ELIMINAR_COMENTARIO_ERROR,
// 					payload: {
// 						message: 'Error de conexión con el servidor',
// 					},
// 				})
// 			} else
// 				dispath({
// 					type: ELIMINAR_COMENTARIO_ERROR,
// 					payload: {
// 						message: JSON.parse(error.request.response).message,
// 					},
// 				})

// 			setLoading(false)
// 			handleVerEditarCerrar()

// 			// setTimeout(() => {
// 			// 	dispath({
// 			// 		type: ELIMINAR_COMENTARIO_ERROR,
// 			// 		payload: {
// 			// 			message: '',
// 			// 		},
// 			// 	})
// 			// }, 5000)
// 			console.log(error.request)
// 		}
// 	}

export const eliminarComentarioAccion =
	(data, history, setLoading, setShowEliminar) => async (dispath, getState) => {
		// const token = getLocalStorage()
		try {
			setLoading(true)

			const result = await axios.delete(`${URI}${PORT}/comments/${data}`)

			getState().publicaciones.array.map((el) => {
				const newComentarios = []
				el.comentarios.map((element) => {
					return element.codigo !== data && newComentarios.push(element)
				})
				el.comentarios = newComentarios
				return el
			})

			dispath({
				type: ELIMINAR_COMENTARIO_EXITO,
				payload: {
					message: result.data.message,
				},
			})

			setLoading(false)
			setShowEliminar(false)

			// setTimeout(() => {
			// 	dispath({
			// 		type: ELIMINAR_COMENTARIO_MESSAGE_EXITO,
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
					type: ELIMINAR_COMENTARIO_ERROR,
					payload: {
						message: 'Error de conexión con el servidor',
					},
				})
			} else
				dispath({
					type: ELIMINAR_COMENTARIO_ERROR,
					payload: {
						message: JSON.parse(error.request.response).message,
					},
				})

			setLoading(false)
			setShowEliminar(false)

			// setTimeout(() => {
			// 	dispath({
			// 		type: ELIMINAR_COMENTARIO_ERROR,
			// 		payload: {
			// 			message: '',
			// 		},
			// 	})
			// }, 5000)
			console.log(error.request)
		}
	}
