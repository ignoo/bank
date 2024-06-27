import { StatsProvider } from '../../Contexts/Stats';
import '../../Style/App.scss';
import NavBarBtns from '../NavBarBtns';
import StatBoxes from './StatBoxes';

export default function Index() {


  return (
      <div className='body'>
        <header className="header">
          <div className='header-container'>
            <a href="#home"><h1>.B.ANKA.S.</h1></a>
          </div>
          <NavBarBtns />
        </header>
        <main>
          <div className='top-container'>
            <img src={require("../../pics/kupiuros.jpg")} alt="kupiuros" />
            <div className='text'>
              <div className='inner-text slogan'>Mes mėgstame jūsų pinigus.</div>
              <div className='inner-text name'>.B.ANKA.S.</div>
            </div>
          </div>
          <StatsProvider>
            <StatBoxes />  
          </StatsProvider>
        </main>
        <footer>
          <span className='tiny'>.B.ANKA.S.</span>
          <p>Rekomenduojame prieš sudarant bet kokią finansinių paslaugų sutartį pasikliauti mūsų darbuotojų žodžiu ir neskaityti paslaugų teikimo sąlygų.</p>
          <span className='tiny'>.B.ANKA.S.</span>
        </footer>
      </div>
  );
}

