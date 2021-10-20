// import { useDispatch } from 'react-redux'

import Styles from './home.module.css'
import Post from 'Componentes/Post'

const Home = () => {
	// const dispatch = useDispatch()
	// const publicacionesStore = useSelector((store) => store.publicaciones)
	const publicacionesStore = []

	return (
		<div className={Styles.container}>
			{publicacionesStore.length === 0 ? (
				<Post />
			) : (
				<h1>No hay publicaciones creadas</h1>
			)}
		</div>
	)
}

export default Home
