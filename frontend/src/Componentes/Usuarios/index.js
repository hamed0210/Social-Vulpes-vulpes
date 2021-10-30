import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

import Styles from './usuarios.module.css'

function Usuarios() {
	const usuariosStore = useSelector((store) => store.usuarios.array)

	const handleSearch = (e) => {
		let hasSearch = []
		usuariosStore.forEach((el) => {
			const dataList = el

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

	return (
		usuariosStore.length !== 0 && (
			<div className={Styles.container}>
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
									<th className={Styles.title}>Fecha Creacion</th>
									<th className={Styles.title}></th>
								</tr>
							</thead>
							<tbody>
								<tr className={Styles.item}>
									{usuariosStore.map((el) => {
										el['fecha_creacion'] = el['fecha_creacion'].substr(0, 10)
										return (
											<>
												<td className={Styles.data}>{el.id}</td>
												<td className={Styles.data}>{el.nombres}</td>
												<td className={Styles.data}>{el.apellidos}</td>
												<td className={Styles.data}>{el.username}</td>
												<td className={Styles.data}>{el.email}</td>
												<td className={Styles.data}>{el.fecha_creacion}</td>
												<span className={Styles.btns}>
													<span
														// onClick={() => handleEditButton(el)}
														className={Styles.btn}
													>
														<FontAwesomeIcon icon={faPen} />
														{/* <i className={`${Styles.btn_edit} fas fa-edit`}></i> */}
													</span>
													<span
														// onClick={() =>
														// 	handleDeleteButton(el.codigo || el.id)
														// }
														className={Styles.btn}
													>
														<FontAwesomeIcon icon={faTrash} />
														{/* <i
														// className={`${Styles.btn_delete} fas fa-trash-alt`}
														></i> */}
													</span>
												</span>
											</>
										)
									})}
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	)
}

export default Usuarios
