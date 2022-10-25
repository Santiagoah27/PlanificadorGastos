import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ExpenseLista from "./components/ExpenseLista"
import Modal from "./components/Modal";
import { generateId } from "./helpers" 
import NewExpenseIcon from "./img/nuevo-gasto.svg";

function App() {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  )
  const [editExpense, setEditExpense] = useState({})
  const [filter, setFilter] = useState('')
  const [filterExpenses, setFilterExpenses] = useState([])

  useEffect(() => {
    if(Object.keys(editExpense).length > 0)
    setModal(true)
    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    if(filter){
      const filterExpenses = expenses.filter(expense => expense.cathegory === filter)
      setFilterExpenses(filterExpenses)
    }
  }, [filter])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0

    if( budgetLS > 0 ) {
      setIsValidBudget(true)
    }
  }, [])


  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})
    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }

  const saveExpense = expense => {
    if(expense.id) {
      const updatedExpenses = expenses.map( stateExpense =>  stateExpense.id === expense.id ? expense : stateExpense)
      setExpenses(updatedExpenses)
      setEditExpense({})
    } else {
      expense.id = generateId();
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }

    setModal(false)
    setTimeout( () => {
        setAnimateModal(false)
    }, 500)

  }

  const deleteExpense = id  => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(updatedExpenses)
  }


  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenses={expenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        setExpenses={setExpenses}
      />
      {isValidBudget && (
        <>
        <main>
          <Filters 
          filter={filter}
          setFilter={setFilter}
          />
          <ExpenseLista
             expenses={expenses}
             setEditExpense={setEditExpense}
             deleteExpense={deleteExpense}
             filter={filter}
             filterExpenses={filterExpenses}
          />
        </main>
        <div className="nuevo-gasto">
          <img src={NewExpenseIcon} alt="New Expense Icon" onClick={handleNewExpense} />
        </div>
        </>
      )}

      {modal && <Modal 
                  setModal={setModal}
                  animateModal={animateModal}
                  setAnimateModal={setAnimateModal}
                  saveExpense={saveExpense}
                  editExpense={editExpense}
                  setEditExpense={setEditExpense}
                />}
    </div>
  );
}

export default App;
