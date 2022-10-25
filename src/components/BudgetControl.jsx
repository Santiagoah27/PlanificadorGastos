import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
const BudgetControl = ({budget, expenses, setExpenses, setBudget, setIsValidBudget}) => {

    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        const spentTotal = expenses.reduce( (total, expense) => expense.amount + total, 0)
        const availableTotal = budget - spentTotal
        const newPercentage = (( ( budget - availableTotal) / budget) * 100).toFixed(2);

        setSpent(spentTotal)
        setAvailable(availableTotal)
        setTimeout(() => {
            setPercentage(newPercentage)        
        }, 1000);
    }, [expenses])

    const formatAmount = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const result = confirm('¿ Deseas reiniciar presupuesto y gastos ?')

        if(result){
            setExpenses([])
            setBudget(0)
            setIsValidBudget(false)
        }
    }
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
               value={percentage}
               styles={buildStyles({
                pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
               })}
               text={`${percentage}% Gastado`}
            />
        </div>
        <div className="contenido-presupuesto">
            <button
              className="reset-app"
              type="button"
              onClick={handleResetApp}
            >
                resetar app
            </button>
            <p>
                <span> Presupuesto: </span>{formatAmount(budget)}
            </p>
            <p className={`${available < 0 ? 'negativo': ''}`}>
                <span> Disponible: </span>{formatAmount(available)}
            </p>
            <p>
                <span> Gastado: </span>{formatAmount(spent)}
            </p>
        </div>
        
    </div>
  )
}

export default BudgetControl