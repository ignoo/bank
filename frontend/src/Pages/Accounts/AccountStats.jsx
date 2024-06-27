import { useContext } from "react";
import { Stats } from "../../Contexts/Stats";


export default function AccountStats() {

  const { stats } = useContext(Stats);

  if (!stats) return (<div>LOADING...</div>)

  return (
    <table className='stats-container'>
        <thead>
            <tr className="top cont">
                <th className='stats client'>Viso klientų: {stats.allAccounts}</th>
                <th className='stats sum'>Bendra suma: {stats.allSum} EUR</th>
                <th className='stats picture'>Klientai be id: {stats.countNoImage}</th>
                <th className='stats empty'>Tuščios sąsk.: {stats.countEmpty}</th>
                <th className='stats pos'>Teigiamos sąsk.: {stats.countPositive}</th>
                <th className='stats neg'>Neigiamos sąsk.: {stats.countNegative}</th>
            </tr>
        </thead>
    </table>
  )
}