import { useContext } from "react";
import { Stats } from "../../Contexts/Stats";


export default function StatBoxes() {

  const { stats } = useContext(Stats);

  if (!stats) return (<div>LOADING...</div>)

  return (
    <>
      <div className='lower-container'>
        <img className='l' src={require("../../pics/woman-on-pier.jpg")} alt="woman on pier" />
        <div className='text-box r'>Mūsų banku naudojasi net {stats.allAccounts} klientai.</div>
      </div>
      <div className='lower-container'>
        <div className='text-box l'>Mūsų klientų sąskaitose jau {stats.allSum} pinigų.</div>
        <img className='r' src={require("../../pics/monay1.jpg")} alt="taupykle" />
      </div>
      <div className='lower-container'>
        <img className='l' src={require("../../pics/taupykle.jpg")} alt="taupykle" />
        <div className='text-box r'>Vidutinė suma sąskaitoje: {(stats.allSum / stats.allAccounts).toFixed(2)} pinigų.</div>
      </div>
      <div className='lower-container'>
        <div className='text-box l'>Kam Jums reikalingi pinigai? Geriau atiduokite juos mums.</div>
        <img className='r' src={require("../../pics/monetos.jpg")} alt="monetos" />
      </div>
      <div className='lower-container'>
        <img className='l' src={require("../../pics/handshake.jpg")} alt="handshake" />
        <div className='text-box r'>Kievienam naujam klientui pažadame, kad bendradarbiaudami sieksime tik naudos sau.</div>
      </div>
    </>
  )
}