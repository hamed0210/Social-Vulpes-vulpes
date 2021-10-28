import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { cerrarSesionAccion } from 'redux/loginDuck'
import { obtenerUsuariosAccion } from 'redux/usuariosDuck'
import Styles from './header.module.css'

function Header({ history }) {
	const dispatch = useDispatch()
	const usuarioStore = useSelector((store) => store.login.user)
	const usuariosStore = useSelector((store) => store.usuarios.array)
	const [usuarioBuscado, setusuarioBuscado] = useState([])
	const [profile, setProfile] = useState(false)

	useEffect(() => {
		dispatch(obtenerUsuariosAccion())
	}, [dispatch])

	console.log(usuarioBuscado)

	const handleInputChange = (e) => {
		const value = e.target.value
		usuariosStore.map((el) => {
			if (el.username.includes(value) && value !== '') {
				// console.log(el.username)
				setusuarioBuscado(el)
				return null
			} else {
				// usuarioBuscado.filter()
			}
		})
		// value.length === 0 ? setShowPublicar(false) : setShowPublicar(true)
	}

	const handleMenuProfile = () => {
		profile ? setProfile(false) : setProfile(true)
	}

	const handleCerrarSesion = () => {
		dispatch(cerrarSesionAccion(history))
	}

	return (
		<div className={Styles.container}>
			<div className={Styles.header}>
				<div className={Styles.logo_container}>
					<Link className={Styles.logo} to='/'>
						Social Vulpes vulpes
					</Link>
				</div>
				<div className={Styles.secundary}>
					<div className={Styles.searcher_container}>
						<input
							onChange={handleInputChange}
							className={Styles.searcher_input}
							type='text'
							placeholder='Buscar'
						/>
					</div>
					<div className={Styles.mensajes_container}>
						<Link className={Styles.mensajes_link} to='/mensajes'>
							<FontAwesomeIcon icon={faCommentAlt} />
						</Link>
					</div>
					<div className={Styles.avatar_container}>
						{/* <span className={Styles.name}></span> */}
						<span className={Styles.separator}></span>
						<div className={Styles.avatar}>
							<img
								src={`${process.env.REACT_APP_URI}${process.env.REACT_APP_PORT}/imagen/${usuarioStore.avatar}`}
								alt=''
							/>
						</div>
						<div
							onClick={handleMenuProfile}
							className={Styles.btn_avatar_container}
						>
							<span className={Styles.btn_avatar}>
								<FontAwesomeIcon icon={faCaretDown} />
							</span>
							{profile ? (
								<div className={Styles.profile_container}>
									<ul className={Styles.profile_menu}>
										<li className={Styles.profile_item}>
											<Link
												className={Styles.profile_link}
												to={`/perfil/${usuarioStore.username}`}
											>
												<FontAwesomeIcon
													className={Styles.profile_item_icon}
													icon={faUser}
												/>
												<span className={Styles.profile_item_title}>
													Perfil
												</span>
											</Link>
										</li>
										<li
											onClick={handleCerrarSesion}
											className={Styles.profile_item}
										>
											<Link className={Styles.profile_link} to='/login'>
												<FontAwesomeIcon
													className={Styles.profile_item_icon}
													icon={faSignOutAlt}
												/>
												<span className={Styles.profile_item_title}>
													Cerrar sesión
												</span>
											</Link>
										</li>
									</ul>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Header)
