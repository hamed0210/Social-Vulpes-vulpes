import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'

import Styles from 'App.module.css'
import Header from 'Componentes/Header'
import Main from 'Componentes/Main'
import Login from 'Componentes/Login'
import Registro from 'Componentes/Registro'
import { checkToken } from 'redux/loginDuck'

function App({ history }) {
	const dispatch = useDispatch()
	const userStore = useSelector((store) => store.login)
	const [loadingState, setLoadingState] = useState(false)

	useEffect(() => {
		const cargarUsuario = async () => {
			const token = localStorage.getItem('token')

			if (token) {
				dispatch(checkToken(token, userStore, history, setLoadingState))
			} else {
				setLoadingState(true)
				history.push('/login')
			}
		}
		cargarUsuario()
	}, [history, userStore, dispatch])

	return (
		<main className={Styles.conatiner_body}>
			<Switch>
				{loadingState !== false ? (
					userStore.user.length !== 0 ? (
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
				) : (
					<h1>Loader</h1>
				)}
			</Switch>
		</main>
	)
}

export default withRouter(App)
