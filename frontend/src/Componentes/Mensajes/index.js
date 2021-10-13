import Styles from './mensajes.module.css'
import Mensaje from 'Componentes/Mensajes/Mensaje'

const Mensajes = () => {
	return (
		<div className={Styles.container}>
			<span className={Styles.title}>Chats</span>
			<div className={Styles.mensajes_container}>
				<Mensaje />
				<Mensaje />
			</div>
		</div>
	)
}

export default Mensajes
