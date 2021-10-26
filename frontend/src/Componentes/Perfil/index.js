import { useSelector } from 'react-redux'

import Styles from './perfil.module.css'

const Perfil = ({ match }) => {
	const userStore = useSelector((store) => store.login.user)

	console.log(match.params)
	return (
		<div className={Styles.container}>
			<div className={Styles.info_usuario_container}>
				<div className={Styles.avatar_container}>
					<div className={Styles.avatar}>
						<img src={'./avatar.jpg'} alt='' />
					</div>
				</div>
				<div className={Styles.info_usuario}>
					<span
						className={Styles.nombres}
					>{`${userStore.nombres} ${userStore.apellidos}`}</span>
					<span className={Styles.username}>{userStore.username}</span>
					<span className={Styles.descripcion}>{userStore.descripcion}</span>
				</div>
			</div>
			<div className={Styles.posts}>
				<div className={Styles.post}>
					<img src={'./post.jpg'} alt='' />
				</div>
				<div className={Styles.post}>
					<img src={'./post.jpg'} alt='' />
				</div>
				<div className={Styles.post}>
					<img src={'./post.jpg'} alt='' />
				</div>
				<div className={Styles.post}>
					<img src={'./post.jpg'} alt='' />
				</div>
			</div>
		</div>
	)
}

export default Perfil
