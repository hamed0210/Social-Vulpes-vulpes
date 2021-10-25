import { useEffect, useRef, useState } from 'react'

const useButtonLoader = (
	defaultText = 'Enviar',
	defaultTextSending = 'Enviando'
) => {
	const [loading, setLoading] = useState(false)
	const element = useRef(null)

	useEffect(() => {
		if (loading) {
			element.current.disabled = true
			element.current.innerHTML = `${defaultTextSending}...`
		} else {
			element.current.disabled = false
			element.current.innerHTML = defaultText
		}
	}, [loading, defaultText, defaultTextSending])

	return [element, setLoading]
}

export default useButtonLoader
