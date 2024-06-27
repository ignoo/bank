import { useContext } from "react"
import { Accounts } from "../../Contexts/Accounts"


export default function FilterSort() {

    const { filter, setFilter, sort, setSort } = useContext(Accounts);

    // const [copyAccounts, setCopyAccounts] = useState({...accounts});
    

    return (
        <div className='upper-bar'>
          <section>
            <label htmlFor="rusiuoti">Rūšiuoti:</label>
            <select id="rusiuoti" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="Pradinis">Pradinis</option>
              <option value="pavarde a-z">Pavardė A-Z</option>
              <option value="pavarde z-a">Pavardė Z-A</option>
              <option value="suma did">Suma &uarr;</option>
              <option value="suma maz">Suma &darr;</option>
            </select>
          </section>
          <section>
            <label htmlFor="filtruoti">Filtruoti:</label>
            <select id="filtruoti" value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="visos">Visos</option>
              <option value="blokuotos">Blokuotos</option>
              <option value="neblokuotos">Neblokuotos</option>
              <option value="tuscios">Tuščios</option>
              <option value="likutis teigiamas">Likutis teigiamas</option>
              <option value="likutis neigiamas">Likutis neigiamas</option>
            </select>
          </section>
        </div>
    )
}