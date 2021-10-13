// import { useEffect, useState } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
// import axios from 'axios'

import Styles from 'App.module.css'
import Header from 'Componentes/Header'
import Main from 'Componentes/Main'
import Login from 'Componentes/Login'
import Registro from 'Componentes/Registro'

function App({ history }) {
	const { pathname } = history.location

	return (
		<main className={Styles.conatiner_body}>
			<Switch>
				{pathname !== '/login' && pathname !== '/registro' ? (
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
				)}
			</Switch>
		</main>
	)
}

export default withRouter(App)
