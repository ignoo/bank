import { useContext } from "react"
import { Accounts } from "../../Contexts/Accounts"
import AccountRow from "./AccountRow"


export default function Table({ setShowEditModal, setShowDeleteModal }) {

    const { accounts } = useContext(Accounts);

    if (!accounts) return (<h1 className="nothing">Loading...</h1>);

    return(
        <table>
            <tbody>
                <tr className='top row'>
                    <th className='name h'>Vardas</th>
                    <th className='surname h'>Pavardė</th>
                    <th className='account h'>Sąskaitos Nr.</th>
                    <th className='sum h'>Sąskaitos likutis</th>
                    <th className='eur h'></th>
                    <th className='edit h'></th>
                    <th className='delete h'></th>
                </tr>
                {
                    accounts.map(account => <AccountRow key={account.id} account={account} setShowEditModal={setShowEditModal} setShowDeleteModal={setShowDeleteModal} />)
                }
                
            </tbody>
        </table>
    )
}