import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'

import Styles from './perfil.module.css'

const Perfil = ({ match }) => {
	const userStore = useSelector((store) => store.usuarios.array)
	const [datos, setDatos] = useState()

	useEffect(() => {
		if (userStore.length !== 0)
			userStore.forEach((el) => {
				if (el.username === match.params.username) return setDatos(el)
			})
	}, [userStore, match])

	return (
		<div className={Styles.container}>
			<div className={Styles.info_usuario_container}>
				<div className={Styles.avatar_container}>
					<div className={Styles.avatar}>
						<img
							src={`${process.env.REACT_APP_URI}${
								process.env.REACT_APP_PORT
							}/imagen/${datos && datos.avatar}`}
							alt=''
						/>
					</div>
				</div>
				<div className={Styles.info_usuario}>
					<span className={Styles.nombres}>{`${datos && datos.nombres} ${
						datos && datos.apellidos
					}`}</span>
					<span className={Styles.username}>{datos && datos.username}</span>
					<span className={Styles.descripcion}>
						{datos && datos.descripcion}
					</span>
				</div>
			</div>
			{datos && datos.posts.length !== 0 ? (
				<div className={Styles.posts}>
					{datos.posts.map((el) => {
						return (
							<div className={Styles.post} key={el.codigo}>
								<img
									src={`${process.env.REACT_APP_URI}${process.env.REACT_APP_PORT}/imagen/${el.imagen}`}
									alt=''
								/>
							</div>
						)
					})}
				</div>
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

export default Perfil
