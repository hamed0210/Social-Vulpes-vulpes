import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

import Styles from './home.module.css'
import Post from 'Componentes/Post'
import {
	obtenerPublicacionesAccion,
	nuevaPublicacionAccion,
} from 'redux/publicacionesDuck'
import useButtonLoader from 'hooks/useButtonLoader'

const Home = ({ history }) => {
	const dispatch = useDispatch()
	const usuario = useSelector((store) => store.login.user)
	const publicaciones = useSelector((store) => store.publicaciones.array)
	const [buttonLoad, setLoading] = useButtonLoader('Publicar', 'Publicando')
	const [resetForm, setResetForm] = useState(false)
	const [showNewPost, setShowNewPost] = useState(false)
	const [descripcionData, setDescripcionData] = useState('')
	const [fileData, setFileData] = useState('')

	useEffect(() => {
		dispatch(obtenerPublicacionesAccion(history))
		if (resetForm) {
			document.querySelector(`.${Styles.newPost_form}`).reset()
			setFileData('')
			setShowNewPost(false)
			setResetForm(false)
		}
	}, [dispatch, history, resetForm])

	const handleShowNewPost = () => {
		showNewPost ? setShowNewPost(false) : setShowNewPost(true)
	}

	const handleInputChange = (e) => {
		setDescripcionData(e.target.value)
	}

	const handleInputFileChange = (e) => {
		if (e.target.files.length > 0) setFileData(e.target.files[0])
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const datos = new FormData()
		datos.append('descripcion', descripcionData)
		datos.append('id_usuario', usuario.id)
		datos.append('imagen', fileData)
		setResetForm(true)
		dispatch(nuevaPublicacionAccion(datos, history, setLoading, setResetForm))
	}

	return (
		<>
			<div className={Styles.container}>
				{publicaciones.length !== 0 ? (
					<Post publicaciones={publicaciones} />
				) : (
					<div className={Styles.noPost_container}>
						<span className={Styles.noPost_icon}>
							<FontAwesomeIcon icon={faCameraRetro} />
						</span>
						<h1 className={Styles.noPost_text}>No hay publicaciones creadas</h1>
					</div>
				)}
			</div>
			<div className={Styles.newPost_container}>
				<div className={Styles.addPost_container}>
					<span
						onClick={handleShowNewPost}
						className={
							showNewPost
								? `${Styles.addPost} ${Styles.addPostRotate}`
								: Styles.addPost
						}
					>
						<FontAwesomeIcon icon={faPlus} />
					</span>
					<span className={Styles.addPost_text}>Nueva Publicacion</span>
				</div>
				<form
					onSubmit={handleSubmit}
					className={
						showNewPost
							? `${Styles.newPost_form} ${Styles.newPost_form_show}`
							: Styles.newPost_form
					}
				>
					<div className={Styles.inputGroup}>
						<label className={Styles.input_label} htmlFor='descripcion'>
							Descripcion:
						</label>
						<textarea
							onChange={handleInputChange}
							className={Styles.textarea}
							name='descripcion'
							id='descripcion'
							cols='30'
							rows='10'
							maxLength='250'
						/>
					</div>
					<div className={Styles.inputGroup}>
						<label className={Styles.input_label} htmlFor='imagen'>
							Imagen:
						</label>
						<div className={Styles.file_container}>
							<span className={Styles.file_name}>
								{/* {console.log(fileData)} */}
								{fileData && fileData.name && fileData.name.length >= 17
									? `${fileData.name.substr(0, 17)}...`
									: fileData.name}
							</span>
							<input
								onChange={handleInputFileChange}
								className={Styles.input_file}
								type='file'
								name='imagen'
								id='imagen'
								accept='image/*'
								required
							/>
							<button className={Styles.btn_file} type={'button'}>
								<FontAwesomeIcon icon={faFileUpload} />
							</button>
						</div>
					</div>
					<button
						className={`btn btn_success ${Styles.btn_post}`}
						type='submit'
						ref={buttonLoad}
					>
						Publicar
					</button>
				</form>
			</div>
		</>
	)
}

export default withRouter(Home)
