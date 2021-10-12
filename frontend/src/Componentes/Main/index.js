import { Route, Redirect } from 'react-router-dom'

import Styles from './main.module.css'
import Home from 'Componentes/Home'

const Main = () => {
	return (
		<section className={Styles.container}>
			<Route exact path='/'>
				<Home />
			</Route>
		</section>
	)
}

export default Main
