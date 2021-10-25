import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'

import Styles from './home.module.css'
import Post from 'Componentes/Post'
import { obtenerPublicacionesAccion } from 'redux/publicacionesDuck'

const Home = ({ history }) => {
	const dispatch = useDispatch()
	const publicaciones = useSelector((store) => store.publicaciones.array)
	// const publicacionesMessage = useSelector((store) => store.publicaciones.message)

	useEffect(() => {
		dispatch(obtenerPublicacionesAccion(history))
	}, [dispatch, history])

	return (
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
	)
}

export default withRouter(Home)
