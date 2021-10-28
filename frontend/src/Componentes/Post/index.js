import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import Styles from './post.module.css'

const Post = ({ publicaciones }) => {
	const [showMenuOpcionesPost, setShowMenuOpcionesPost] = useState(false)
	const [showPublicar, setShowPublicar] = useState(false)

	const handleInputChange = (e) => {
		const value = e.target.value
		value.length === 0 ? setShowPublicar(false) : setShowPublicar(true)
	}

	const handleShowMenuOption = () => {
		showMenuOpcionesPost
			? setShowMenuOpcionesPost(false)
			: setShowMenuOpcionesPost(true)
	}

	return (
		publicaciones.length !== 0 &&
		publicaciones.map((el, value) => {
			return (
				<div className={Styles.container} key={value}>
					<div className={Styles.header}>
						<div className={Styles.user_container}>
							<Link
								className={Styles.avatar}
								to={`/perfil/${el.usuario.username}`}
							>
								<img
									src={`${process.env.REACT_APP_URI}${process.env.REACT_APP_PORT}/imagen/${el.usuario.avatar}`}
									alt=''
								/>
							</Link>
							<Link
								className={Styles.username}
								to={`/perfil/${el.usuario.username}`}
							>
								{el.usuario.username}
							</Link>
						</div>
						<div className={Styles.opciones}>
							<FontAwesomeIcon
								icon={faEllipsisV}
								onClick={handleShowMenuOption}
							/>
							{showMenuOpcionesPost ? (
								<div className={Styles.opciones_menu_container}>
									<ul className={Styles.opciones_menu}>
										<li className={Styles.opciones_menu_item}>Editar</li>
										<li className={Styles.opciones_menu_item}>Eliminar</li>
									</ul>
								</div>
							) : null}
						</div>
					</div>
					<div className={Styles.imagen_container}>
						<img
							src={`${process.env.REACT_APP_URI}${process.env.REACT_APP_PORT}/imagen/${el.imagen}`}
							alt=''
						/>
					</div>
					<span className={Styles.descripcion}>{el.descripcion}</span>
					<div className={Styles.comentarios_container}>
						<div className={Styles.comentario_container}>
							<div className={Styles.comentario_avatar}>
								<img
									src={`${process.env.REACT_APP_URI}${process.env.REACT_APP_PORT}/imagen/${el.usuario.avatar}`}
									alt=''
								/>
							</div>
							<span className={Styles.comentario_input_container}>
								<input
									onChange={handleInputChange}
									className={Styles.comentario_input}
									type='text'
									placeholder='Escribir comentario'
								/>
							</span>
							<button
								className={
									showPublicar
										? `${Styles.comentario_btnPublicar} ${Styles.comentario_btnPublicarShow}`
										: `${Styles.comentario_btnPublicar}`
								}
							>
								Publicar
							</button>
						</div>
					</div>
				</div>
			)
		})
	)
}

export default Post
