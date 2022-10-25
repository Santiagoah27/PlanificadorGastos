import { useState, useEffect } from 'react'
import Message from './Message'
import CloseButton from '../img/cerrar.svg'
const Modal = ({setModal, animateModal, setAnimateModal, saveExpense, editExpense, setEditExpense}) => {

    const [message,setMessage] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('') 
    const [cathegory, setCathegory] = useState('')
    const [date, setDate] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if(Object.keys(editExpense).length > 0){
            setName(editExpense.name)
            setAmount(editExpense.amount)
            setCathegory(editExpense.cathegory)
            setId(editExpense.id)
            setDate(editExpense.date)
        }
    }, [])

    const hideModal = () => {
        setModal(false)
        setEditExpense({})
        setTimeout( () => {
            setAnimateModal(false)
        }, 500)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if([ name, amount, cathegory].includes('')) {
            setMessage('Todos los campos son obligatorios')
            setTimeout(() => {
                setMessage('')
            }, 3000);
            return;
        }
        saveExpense({name, amount, cathegory, id, date})
    }
  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img
             src={CloseButton}
             alt="cerrar modal"
             onClick={hideModal}
            />
        </div>
        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animateModal ? "animar" :'cerrar'}`}>
            <legend>{editExpense.name ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {message && <Message tipo="error">{message}</Message>}
            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                  id='nombre'
                  type="text"
                  placeholder='Añade el nombre del gatos'
                  value={name}
                  onChange={e => setName(e.target.value)}
                   />
            </div>
            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                  id='cantidad'
                  type="text"
                  placeholder='Añade la cantidad del gasto: ej. 300'
                  value={amount}
                  onChange={ e => setAmount(Number(e.target.value))}
                   />
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>
                <select 
                   id="categoria"
                   value={cathegory}
                   onChange={e => setCathegory(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input 
               type="submit"
               value={editExpense.name ? 'Guardar cambios' : 'Añadir gasto'}
            />
        </form>
    </div>
  )
}

export default Modal