import Expense from "./Expense"

const ExpenseLista = ({expenses, setEditExpense, deleteExpense, filter, filterExpenses}) => {
  return (
    <div className="listado-gastos contenedor">
       {
        filter ? (
          <>
            <h2>{filterExpenses.length ? 'Gastos' : 'No hay Gastos en este categoría'}</h2>
            {filterExpenses.map( expense => (
                <Expense
                  key={expense.id}
                  expense={expense}
                  setEditExpense={setEditExpense}
                  deleteExpense={deleteExpense}
            />
         ))}
          </>
        ) : (
          <>
            {expenses.map( expense => (
                <Expense
                  key={expense.id}
                  expense={expense}
                  setEditExpense={setEditExpense}
                  deleteExpense={deleteExpense}
          />
         ))}
          </>
        )
       } 
    </div>
  )
}

export default ExpenseLista