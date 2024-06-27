import { useContext, useEffect, useState } from 'react';
import '../../Style/App.scss';
import '../../Style/login.scss';
import useLogin from '../../Hooks/useLogin';
import { Auth } from '../../Contexts/Auth';
import { AFTER_LOGIN_URL, SITE_URL } from '../../Constants/main';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [setInputs, response] = useLogin();
  const { user } = useContext(Auth);

  const go = _ => {
    setInputs({username, password});
    setPassword('');
  }

  useEffect(_ => {
    if (user) {
      window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
    }
  }, [user]);

  if (!user) {
    return (
      <div className='body'>
        <header className="header">
          <span className='header-container'>
            <a href="#home"><h1>.B.ANKA.S.</h1></a>
          </span>
          <span className='top-container'>
            <a href="#home" className='btn back'>Atgal</a>
          </span>
        </header>
        <main>
          <div className='login-container'>
            <form>
              <div className='response'>
                {
                  response && !response.ok && <span>{response.message}</span>
                }
              </div>
              <label className='name-txt' htmlFor='username'>Prisijungimo vardas</label>
              <input type="text" id='username' className='input name' autoComplete='username' value={username} onChange={e => setUsername(e.target.value)}/>
              <label className='name-txt' htmlFor='password'>Slaptažodis</label>
              <input type="password" id='password' className='input password' autoComplete='current-password' value={password} onChange={e => setPassword(e.target.value)}/>
              <button type='button' className='btn login' onClick={go}>Prisijungti</button>
            </form>
          </div>        
        </main>
      </div>
    );
  } else {
    return null;
  }
}