import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
// import axios from 'axios'

import Styles from 'App.module.css'
import Header from 'Componentes/Header'
import Main from 'Componentes/Main'
import Login from 'Componentes/Login'
import Registro from 'Componentes/Registro'

function App({ history }) {
	const userStore = useSelector((store) => store.login)
	// const [loadingState, setLoadingState] = useState(false)
	// const { pathname } = history.location

	useEffect(() => {
		const cargarUsuario = async () => {
			const user = JSON.parse(localStorage.getItem('user'))
			if (user) {
				userStore.user = user
			}
			// if (user) {
			// 	try {
			// 		const result = await axios.get(`hhtp://localhost:5000/signin`, user)
			// 		userStore.user = result.data
			// 		if (userStore.user.id) setLoadingState(true)
			// 	} catch (error) {
			// 		if (error.request.status === 401) {
			// 			setLoadingState(null)
			// 			localStorage.removeItem('user')
			// 			userStore.message = 'La sesion a caducado, inicia sesion nuevamente'
			// 			history.push('/login')
			// 		}
			// 		// if (error.message === 'Network Error') {
			// 		// 	setLoadingState(null)
			// 		// 	userStore.message = 'Error de conexión con el servidor'
			// 		// 	history.push('/login')
			// 		// }
			// 		console.log(error)
			// 	}
			// } else {
			// 	setLoadingState(null)
			// 	history.push('/login')
			// }
		}
		cargarUsuario()
	}, [history, userStore])

	return (
		<main className={Styles.conatiner_body}>
			<Switch>
				{
					// loadingState !== false ? (
					userStore.user.id ? (
						// pathname !== '/login' ? (
						<>
							<Header />
							<Main />
						</>
					) : (
						<>
							<Route exact path='/login'>
								<Login />
							</Route>
							<Route exact path='/registro'>
								<Registro />
							</Route>
						</>
					)
					// )
					// : (
					// 	<h1>Loader</h1>
					// )
				}
			</Switch>
		</main>
	)
}

export default withRouter(App)
