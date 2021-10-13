import Styles from './perfil.module.css'

const Perfil = () => {
	return (
		<div className={Styles.container}>
			<div className={Styles.info_usuario_container}>
				<div className={Styles.avatar_container}>
					<div className={Styles.avatar}>
						<img src={'./avatar.jpg'} alt='' />
					</div>
				</div>
				<div className={Styles.info_usuario}>
					<span className={Styles.nombres}>Hamed Duran Mendoza</span>
					<span className={Styles.username}>hduran10</span>
					<span className={Styles.descripcion}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</span>
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
