// import { useEffect, useState } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
// import axios from 'axios'

import Styles from 'App.module.css'
import Header from 'Componentes/Header'
import Main from 'Componentes/Main'
// import Login from 'Componentes/Login'

function App({ history }) {
	return (
		<main className={Styles.conatiner_body}>
			<Switch>
				<>
					<Header />
					<Main />
				</>
			</Switch>
		</main>
	)
}

export default withRouter(App)
