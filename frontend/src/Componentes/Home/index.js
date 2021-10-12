import Styles from './home.module.css'
import Post from 'Componentes/Post'

const Home = () => {
	return (
		<div className={Styles.container}>
			<Post />
		</div>
	)
}

export default Home
