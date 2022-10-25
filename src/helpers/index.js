export const generateId = () => {
    const random = Math.random().toString(36).substring(2);
    const dateRandom = Date.now().toString(36)
    return random + dateRandom
}

export const dateFormat = date => {
    const newDate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return newDate.toLocaleDateString('es-ES', options)

}