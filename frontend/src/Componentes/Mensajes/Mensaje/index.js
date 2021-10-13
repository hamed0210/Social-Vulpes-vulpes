import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import Styles from './mensaje.module.css'

const Mensaje = () => {
	return (
		<div className={Styles.container}>
			<div className={Styles.avatar_container}>
				<div className={Styles.avatar}>
					<img src={'./avatar.jpg'} alt='' />
				</div>
			</div>
			<div className={Styles.info_mensaje_container}>
				<span className={Styles.username}>hduran10</span>
				<span className={Styles.mensaje}>
					Lorem Ipsum is simply dummy text of the printing and typesetti...
				</span>
			</div>
			<span className={Styles.opciones}>
				<FontAwesomeIcon icon={faEllipsisV} />
			</span>
		</div>
	)
}

export default Mensaje
