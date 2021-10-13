import { Route, Redirect } from 'react-router-dom'

import Styles from './main.module.css'
import Home from 'Componentes/Home'
import Perfil from 'Componentes/Perfil'
import Mensajes from 'Componentes/Mensajes'
import Chat from 'Componentes/Chat'

const Main = () => {
	return (
		<section className={Styles.container}>
			<Route exact path='/'>
				<Chat />
			</Route>
		</section>
	)
}

export default Main
