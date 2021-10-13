import { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Styles from './login.module.css'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'

const Login = ({ history }) => {
	const [showPassword, setShowPassword] = useState(false)
	const [datos, setDatos] = useState({
		email: '',
		pass: '',
	})

	const handlePassword = (e) => {
		const icon = e.target
		const inputPassword = icon.parentNode.previousSibling

		if (showPassword) {
			setShowPassword(false)
			inputPassword.type = 'text'
		} else {
			setShowPassword(true)
			inputPassword.type = 'password'
		}
	}

	const handleInputChange = (e) => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		history.push('/')
	}

	return (
		<div className={Styles.container}>
			<h2 className={Styles.title}>Social Vulpes vulpes</h2>
			<div className={Styles.login_container}>
				<div className={Styles.login}>
					<form onSubmit={handleSubmit} className={Styles.form}>
						<div className={Styles.inputGroup}>
							<input
								onChange={handleInputChange}
								className={`${Styles.input} ${Styles.input_email}`}
								type='text'
								name='email'
								id='email'
								placeholder='Correo electronico'
								required
								autoFocus
							/>
							<div className={Styles.input_password_container}>
								<input
									onChange={handleInputChange}
									className={Styles.input}
									type='password'
									name='pass'
									id='pass'
									placeholder='Contraseña'
									required
								/>
								<span onClick={handlePassword} className={Styles.icon}>
									{showPassword ? (
										<FontAwesomeIcon icon={faEye} />
									) : (
										<FontAwesomeIcon icon={faEyeSlash} />
									)}
								</span>
							</div>
						</div>
						<div className={Styles.recordarme_container}>
							<span className={Styles.recordarme_check} />
							<label className={Styles.recordarme}>
								<input type='checkbox' name='recordarme' />
								Recordame
							</label>
						</div>
						<button className={`btn btn_success ${Styles.btn}`} type='submit'>
							Entrar
						</button>
						<Link className={Styles.link_registro} to={'/registro'}>
							Registrate
						</Link>
					</form>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Login)
