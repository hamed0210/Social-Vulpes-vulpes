import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import Styles from './registro.module.css'

const Registro = ({ history }) => {
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

	const handleCancel = () => {
		history.push('/login')
	}

	return (
		<div className={Styles.container}>
			<span className={Styles.title}>Registro</span>
			<div className={Styles.registro_container}>
				<form onSubmit={handleSubmit} className={Styles.form}>
					<div className={Styles.inputGroup}>
						<input
							onChange={handleInputChange}
							className={`${Styles.input} ${Styles.input_marginBotton}`}
							type='number'
							name='id'
							placeholder='Escriba su Identificacion'
							required
							autoFocus
						/>
						<input
							onChange={handleInputChange}
							className={`${Styles.input} ${Styles.input_marginBotton}`}
							type='text'
							name='nombres'
							placeholder='Escriba sus Nombres'
							required
						/>
						<input
							onChange={handleInputChange}
							className={`${Styles.input} ${Styles.input_marginBotton}`}
							type='text'
							name='apellidos'
							placeholder='Escriba sus Apellidos'
							required
						/>
						<input
							onChange={handleInputChange}
							className={`${Styles.input} ${Styles.input_marginBotton}`}
							type='text'
							name='username'
							placeholder='Escriba su Username'
							required
						/>
						<input
							onChange={handleInputChange}
							className={`${Styles.input} ${Styles.input_marginBotton}`}
							type='text'
							name='email'
							placeholder='Escriba su Correo electronico'
							required
						/>
						<div className={Styles.input_password_container}>
							<input
								onChange={handleInputChange}
								className={Styles.input}
								type='password'
								name='password'
								placeholder='Escriba su Contraseña'
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
						<div className={Styles.input_password_container}>
							<input
								onChange={handleInputChange}
								className={Styles.input}
								type='password'
								name='password_confirm'
								placeholder='Escriba nuevamente su contraseña'
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
					<button className={`btn btn_success ${Styles.btn}`} type='submit'>
						Sign Up
					</button>
					<button
						onClick={handleCancel}
						className={`btn btn_cancel ${Styles.btn}`}
					>
						Cancelar
					</button>
				</form>
			</div>
		</div>
	)
}

export default withRouter(Registro)
