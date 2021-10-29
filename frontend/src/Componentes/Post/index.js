import { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

import Styles from './post.module.css'
import useButtonLoader from 'hooks/useButtonLoader'
import {
	eliminarPublicacionAccion,
	obtenerPublicacionesAccion,
} from 'redux/publicacionesDuck'
import {
	eliminarComentarioAccion,
	nuevoComentarioAccion,
} from 'redux/comentariosDuck'

const Post = ({ publicaciones, history }) => {
	const dispatch = useDispatch()
	const userStore = useSelector((state) => state.login.user)
	const [buttonLoad, setLoading] = useButtonLoader('Eliminar', 'Eliminando')
	const [resetForm, setResetForm] = useState(false)
	const [showPublicar, setShowPublicar] = useState(false)
	const [showEliminar, setShowEliminar] = useState(false)
	const [dataEliminar, setDataEliminar] = useState('')
	const [datos, setDatos] = useState({
		id_usuario: userStore.id,
	})

	useEffect(() => {
		dispatch(obtenerPublicacionesAccion(history))
		if (resetForm) {
			document.querySelector(`.${Styles.new_comentario_container}`).reset()
			setDatos({
				id_usuario: userStore.id,
			})
			setShowPublicar(false)
			setResetForm(false)
		}
	}, [dispatch, history, resetForm, userStore.id])

	const handleInputChange = (e, item) => {
		const value = e.target.value
		value.length === 0 ? setShowPublicar(false) : setShowPublicar(true)

		setDatos({
			...datos,
			[e.target.name]: e.target.value,
			codigo_publicacion: item,
		})
	}

	const handleEditarPost = () => {}

	const handleEliminarPost = () => {
		dataEliminar.opcion === 'publicacion'
			? dispatch(
					eliminarPublicacionAccion(
						dataEliminar.item,
						history,
						setLoading,
						setShowEliminar
					)
			  )
			: dispatch(
					eliminarComentarioAccion(
						dataEliminar.item,
						history,
						setLoading,
						setShowEliminar
					)
			  )
	}

	const handleShowElimiar = (item, opcion = 'publicacion') => {
		setDataEliminar({ item, opcion })
		setShowEliminar(true)
	}

	const handleCancelar = () => {
		setDataEliminar('')
		setShowEliminar(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(nuevoComentarioAccion(datos, history, setResetForm))
	}

	const handleRenderPostOption = (el) => {
		if (userStore)
			if (userStore.role === 'User' && userStore.id === el.usuario.id)
				return (
					<>
						<button
							className={Styles.opciones_editar_btn}
							disabled={showEliminar}
						>
							<FontAwesomeIcon
								icon={faPen}
								onClick={() => handleEditarPost(el)}
							/>
						</button>
						<button
							className={Styles.opciones_eliminar_btn}
							disabled={showEliminar}
							onClick={() => handleShowElimiar(el.codigo)}
						>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</>
				)
		if (userStore.role === 'Admin')
			return (
				<>
					<button
						className={Styles.opciones_editar_btn}
						disabled={showEliminar}
					>
						<FontAwesomeIcon
							icon={faPen}
							onClick={() => handleEditarPost(el)}
						/>
					</button>
				</>
			)
		if (userStore.role === 'Admin' && userStore.id === el.usuario.id)
			return (
				<>
					<button
						className={Styles.opciones_editar_btn}
						disabled={showEliminar}
					>
						<FontAwesomeIcon
							icon={faPen}
							onClick={() => handleEditarPost(el)}
						/>
					</button>
					<button
						className={Styles.opciones_eliminar_btn}
						disabled={showEliminar}
						onClick={() => handleShowElimiar(el.codigo)}
					>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</>
			)
		if (userStore.role === 'Superadmin')
			return (
				<>
					<button
						className={Styles.opciones_editar_btn}
						disabled={showEliminar}
					>
						<FontAwesomeIcon
							icon={faPen}
							onClick={() => handleEditarPost(el)}
						/>
					</button>
					<button
						className={Styles.opciones_eliminar_btn}
						disabled={showEliminar}
						onClick={() => handleShowElimiar(el.codigo)}
					>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</>
			)
	}

	const handleRenderComentarioDelete = (el, element) => {
		if (userStore)
			if (
				(userStore.role === 'User' && userStore.id === el.usuario.id) ||
				userStore.id === element.usuario.id
			)
				return (
					<button
						className={Styles.comentario_eliminar_btn}
						disabled={showEliminar}
						onClick={() => handleShowElimiar(element.codigo, 'comentario')}
					>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				)
		if (userStore.role === 'Admin' || userStore.role === 'Superadmin')
			return (
				<button
					className={Styles.comentario_eliminar_btn}
					disabled={showEliminar}
					onClick={() => handleShowElimiar(element.codigo, 'comentario')}
				>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			)
	}

	return (
		<>
			{publicaciones.length !== 0 &&
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
									{handleRenderPostOption(el)}
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
								{el.comentarios !== 0 &&
									el.comentarios.map((element) => {
										return (
											<div
												className={Styles.comentario_post_container}
												key={element.codigo}
											>
												<div className={Styles.comentario_post}>
													<span className={Styles.comentario_username}>
														{element.usuario.username}
													</span>
													<span className={Styles.comentario_comentario}>
														{element.comentario}
													</span>
												</div>
												<div className={Styles.comentario_post_opciones}>
													{handleRenderComentarioDelete(el, element)}
												</div>
											</div>
										)
									})}
							</div>
							<form
								onSubmit={handleSubmit}
								className={Styles.new_comentario_container}
							>
								<div className={Styles.new_comentario_avatar}>
									<img
										src={`${process.env.REACT_APP_URI}${process.env.REACT_APP_PORT}/imagen/${el.usuario.avatar}`}
										alt=''
									/>
								</div>
								<span className={Styles.new_comentario_input_container}>
									<input
										onChange={(e) => handleInputChange(e, el.codigo)}
										className={Styles.new_comentario_input}
										type='text'
										name='comentario'
										placeholder='Escribir comentario'
									/>
								</span>
								<button
									type='submit'
									className={
										showPublicar
											? `${Styles.new_comentario_btnPublicar} ${Styles.new_comentario_btnPublicarShow}`
											: `${Styles.new_comentario_btnPublicar}`
									}
								>
									Publicar
								</button>
							</form>
						</div>
					)
				})}
			<div
				className={Styles.eliminar_container}
				style={showEliminar ? { display: 'flex' } : { display: 'none' }}
			>
				<h4 className={Styles.eliminar_message}>
					Seguro quiere eliminar este elemento?
				</h4>
				<div className={Styles.eliminar_btns_container}>
					<button
						onClick={handleEliminarPost}
						className={`btn btn_delete ${Styles.eliminar_btn}`}
						ref={buttonLoad}
					>
						Eliminar
					</button>
					<button
						onClick={handleCancelar}
						className={`btn btn_cancel ${Styles.cancelar_btn}`}
						// disabled={}
					>
						Cancelar
					</button>
				</div>
			</div>
		</>
	)
}

export default withRouter(Post)
