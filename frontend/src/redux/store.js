import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import loginDuck from './loginDuck'
import publicacionesDuck from './publicacionesDuck'
import mensajesDuck from './mensajesDuck'
import comentariosDuck from './comentariosDuck'
import usuariosDuck from './usuariosDuck'

const rootReducer = combineReducers({
	login: loginDuck,
	publicaciones: publicacionesDuck,
	mensajes: mensajesDuck,
	comentarios: comentariosDuck,
	usuarios: usuariosDuck,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore() {
	const store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(thunk))
	)
	return store
}
