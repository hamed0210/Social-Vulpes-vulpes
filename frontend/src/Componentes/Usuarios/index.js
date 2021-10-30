import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

import Styles from './usuarios.module.css'
import useButtonLoader from 'hooks/useButtonLoader'
import { eliminarUsuarioAccion } from 'redux/usuariosDuck'

function Usuarios({ history }) {
	const dispatch = useDispatch()
	const usuariosStore = useSelector((store) => store.usuarios.array)
	const loginStore = useSelector((store) => store.login.user)
	const [buttonLoad, setLoading] = useButtonLoader('Eliminar', 'Eliminando')
	const [showEliminar, setShowEliminar] = useState(false)
	const [dataEliminar, setDataEliminar] = useState('')

	const handleSearch = (e) => {
		let hasSearch = []
		const itemsTable = document.querySelectorAll(`.${Styles.item}`)
		itemsTable.forEach((el) => {
			const dataList = el.childNodes

			dataList.forEach((element, index) => {
				if (e.target.value !== '') {
					if (dataList.length - 1 !== index) {
						element.innerHTML
							.toLowerCase()
							.includes(e.target.value.toLowerCase())
							? hasSearch.push(el)
							: (el.style.display = 'none')
					}
				} else el.style.display = 'flex'
			})

			hasSearch.length !== 0 &&
				hasSearch.forEach((hasSearchItem) => {
					hasSearchItem.style.display = 'flex'
				})
		})
	}

	const handleShowElimiar = (item) => {
		let usuariosFiltrado = []

		usuariosFiltrado = usuariosStore.filter((el) => el.id !== item)

		setDataEliminar({ item, usuariosFiltrado })
		setShowEliminar(true)
	}

	const handleEliminarPost = () => {
		dispatch(
			eliminarUsuarioAccion(
				dataEliminar.item,
				history,
				setLoading,
				setShowEliminar
			)
		)
	}

	const handleCancelar = () => {
		setDataEliminar('')
		setShowEliminar(false)
	}

	return (
		<div className={Styles.container}>
			<div
				className={Styles.eliminar_container}
				style={showEliminar ? { display: 'flex' } : { display: 'none' }}
			>
				<h4 className={Styles.eliminar_message}>
					Seguro quiere eliminar este elemento?
				</h4>
				<div className={Styles.eliminar_btns_container}>
					<button
						onClick={handleEliminarPost}
						className={`btn btn_delete ${Styles.eliminar_btn}`}
						ref={buttonLoad}
					>
						Eliminar
					</button>
					<button
						onClick={handleCancelar}
						className={`btn btn_cancel ${Styles.cancelar_btn}`}
						// disabled={}
					>
						Cancelar
					</button>
				</div>
			</div>
			<div className={Styles.filters}>
				<div className={Styles.search_container}>
					<label className={Styles.label} htmlFor='search'>
						Filtar
					</label>
					<input
						onChange={handleSearch}
						className={Styles.input}
						type='search'
						name='search'
						id='search'
						placeholder='Escriba busqueda'
					/>
					<span className={Styles.search_icon}>
						<i className='fas fa-search'></i>
					</span>
				</div>
			</div>
			<div className={Styles.result}>
				<div className={Styles.table_container}>
					<table className={Styles.table}>
						<thead>
							<tr className={Styles.header}>
								<th className={Styles.title}>Id</th>
								<th className={Styles.title}>Nombres</th>
								<th className={Styles.title}>Apellidos</th>
								<th className={Styles.title}>Usuario</th>
								<th className={Styles.title}>Email</th>
								<th className={Styles.title}>Role</th>
								<th className={Styles.title}>Fecha Creacion</th>
								<th className={Styles.title}></th>
							</tr>
						</thead>
						<tbody>
							{usuariosStore && usuariosStore.length !== 0 ? (
								usuariosStore.map((el) => {
									el['fecha_creacion'] = el['fecha_creacion'].substr(0, 10)
									return el.id !== loginStore.id ? (
										<tr className={Styles.item}>
											<td className={Styles.data}>{el.id}</td>
											<td className={Styles.data}>{el.nombres}</td>
											<td className={Styles.data}>{el.apellidos}</td>
											<td className={Styles.data}>{el.username}</td>
											<td className={Styles.data}>{el.email}</td>
											<td className={Styles.data}>{el.role}</td>
											<td className={Styles.data}>{el.fecha_creacion}</td>
											<span className={`${Styles.data} ${Styles.btns}`}>
												<button
													// onClick={() => handleEditButton(el)}
													className={Styles.btn}
													disabled={showEliminar}
												>
													<FontAwesomeIcon icon={faPen} />
												</button>
												{loginStore.role === 'Superadmin' && (
													<button
														onClick={() => handleShowElimiar(el.id)}
														className={Styles.btn}
														disabled={showEliminar}
													>
														<FontAwesomeIcon icon={faTrash} />
													</button>
												)}
											</span>
										</tr>
									) : (
										usuariosStore.length === 1 && (
											<tr className={Styles.item}>
												<td className={Styles.data_null}>
													{'No hay otros usuarios registrados'}
												</td>
											</tr>
										)
									)
								})
							) : (
								<tr className={Styles.item}>
									<td className={Styles.data_null}>
										{'No hay otros usuarios registrados'}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Usuarios)
