import { useEffect, useRef, useState } from 'react'

const useButtonLoader = (defaultText = 'Enviar') => {
	const [loading, setLoading] = useState(false)
	const element = useRef(null)

	useEffect(() => {
		if (loading) {
			element.current.disabled = true
			element.current.innerHTML = `Enviando...`
		} else {
			element.current.disabled = false
			element.current.innerHTML = defaultText
		}
	}, [loading, defaultText])

	return [element, setLoading]
}

export default useButtonLoader
