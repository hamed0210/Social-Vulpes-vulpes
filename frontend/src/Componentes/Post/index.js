import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import Styles from './post.module.css'

const Post = () => {
	return (
		<div className={Styles.container}>
			<div className={Styles.header}>
				<div className={Styles.user_container}>
					<div className={Styles.avatar}>
						<img src={'./avatar.jpg'} alt='' />
					</div>
					<span className={Styles.username}>hduran10</span>
				</div>
				<span className={Styles.opciones}>
					<FontAwesomeIcon icon={faEllipsisV} />
				</span>
			</div>
			<div className={Styles.imagen_container}>
				<img src={'./post.jpg'} alt='' />
			</div>
			<div className={Styles.comentarios_container}>
				<div className={Styles.comentario_container}>
					<div className={Styles.comentario_avatar}>
						<img src={'./avatar.jpg'} alt='' />
					</div>
					<span className={Styles.comentario_input_container}>
						<input
							className={Styles.comentario_input}
							type='text'
							placeholder='Escribir comentario'
						/>
					</span>
					<span className={Styles.comentarion_btnEnviar}></span>
				</div>
			</div>
		</div>
	)
}

export default Post
