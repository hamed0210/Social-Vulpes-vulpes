import { Route } from 'react-router-dom'

import Styles from './main.module.css'
import Home from 'Componentes/Home'
import Perfil from 'Componentes/Perfil'
import Mensajes from 'Componentes/Mensajes'
import Chat from 'Componentes/Chat'
import Usuarios from 'Componentes/Usuarios'

const Main = () => {
	return (
		<section className={Styles.container}>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route exact path='/mensajes'>
				<Mensajes />
			</Route>
			<Route exact path='/usuarios'>
				<Usuarios />
			</Route>
			<Route exact path='/perfil/:username' component={Perfil} />
			<Route exact path='/chat'>
				<Chat />
			</Route>
		</section>
	)
}

export default Main
