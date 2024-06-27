import { useContext } from 'react';
import { Auth } from '../Contexts/Auth';


export default function NavBarBtns() {

    const { user, logout } = useContext(Auth);

    return (
        <div className="btns">
            {
              user && <a href='#accounts' className='username'>{user.user}</a>
            }
            {
              user && <a href='#home' onClick={logout} className='btn logout'>Atsijungti<img className='lock' src={require("../pics/lockwhite.png")} alt='lock'/></a>
            }
            {
              !user && <a href='#register' className='btn register'>Registruotis</a>
            }
            {
              !user && <a href='#login' className='btn login'>Prisijungti<img className='lock' src={require("../pics/lockwhite.png")} alt='lock'/></a>
            }
        </div>
    );
}