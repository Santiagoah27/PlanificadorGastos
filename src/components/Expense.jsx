import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { dateFormat } from "../helpers";
import SaveIcon from '../img/icono_ahorro.svg'
import HouseIcon from '../img/icono_casa.svg'
import FoodIcon from '../img/icono_comida.svg'
import ExpensesIcon from '../img/icono_gastos.svg'
import LeisureIcon from '../img/icono_ocio.svg'
import HealthIcon from '../img/icono_salud.svg'
import SuscriptionsIcon from '../img/icono_suscripciones.svg'

const IconDictionary = {
    ahorro : SaveIcon,
    comida : FoodIcon,
    casa : HouseIcon,
    gastos : ExpensesIcon,
    ocio : LeisureIcon,
    salud : HealthIcon,
    suscripciones : SuscriptionsIcon
}

const Expense = ({ expense, setEditExpense, deleteExpense }) => {
  const { cathegory, name, amount, id, date } = expense;

  const leadingActions = () => (
      <LeadingActions>
        <SwipeAction onClick={() => setEditExpense(expense)}>
            Editar
        </SwipeAction>
      </LeadingActions>
  )
  
  const trailingActions = () => (
    <TrailingActions>
        <SwipeAction 
           onClick={() => deleteExpense(id)}
           destructive={true}
        >
            Eliminar
        </SwipeAction>
    </TrailingActions>
  )
  return (
    <SwipeableList>
        <SwipeableListItem
           leadingActions={leadingActions()}
           trailingActions={trailingActions()}
        >
    <div className="gasto sombra">
      <div className="contenido-gasto">
        <img src={IconDictionary[cathegory]} alt="" />
        <div className="descripcion-gasto">
          <p className="categoria">{cathegory}</p>
          <p className="nombre-gasto">{name}</p>
          <p className="fecha-gasto">
             Agregado el: {''}
             <span>{dateFormat(date)}</span>
          </p>
        </div>
      </div>
        <p className="cantidad-gasto">${amount}</p>
    </div>    
    </SwipeableListItem>    
    </SwipeableList>
  );
};

export default Expense;
