import { useState } from 'react'

import Styles from './chat.module.css'

const Chat = () => {
	const [showPublicar, setShowPublicar] = useState(false)

	const handleInputChange = (e) => {
		const value = e.target.value
		value.length === 0 ? setShowPublicar(false) : setShowPublicar(true)
	}

	return (
		<div className={Styles.container}>
			<span className={Styles.username_user_chat}>Bats</span>
			<div className={Styles.chat_container}>
				<div className={Styles.mensajes_container}></div>
				<div className={Styles.mensaje_new_container}>
					<div className={Styles.mensaje_new_avatar_container}>
						<div className={Styles.mensaje_new_avatar}>
							<img src={'./avatar.jpg'} alt='' />
						</div>
					</div>
					<span className={Styles.mensaje_new_input_container}>
						<input
							onChange={handleInputChange}
							className={Styles.mensaje_new_input}
							type='text'
							placeholder='Escribir mensaje'
						/>
					</span>
					<button
						className={
							showPublicar
								? `${Styles.comentario_btnPublicar} ${Styles.comentario_btnPublicarShow}`
								: `${Styles.comentario_btnPublicar}`
						}
					>
						<svg className={Styles.btn_icon}>
							<path
								d='M.01 18L21 9 .01 0 0 7l15 2-15 2 .01 7z'
								fill='#1E2A78'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Chat
