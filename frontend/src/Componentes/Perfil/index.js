import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
			<div className={Styles.posts}>
				{datos &&
					datos.posts.map((el) => {
						return (
							<div className={Styles.post} key={el.codigo}>
								<img
									src={`${process.env.REACT_APP_URI}${
										process.env.REACT_APP_PORT
									}/imagen/${datos && datos.avatar}`}
									alt=''
								/>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default Perfil
