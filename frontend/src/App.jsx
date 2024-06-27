import './Style/App.scss';
import { AuthProvider } from './Contexts/Auth';
import { RouterProvider } from './Contexts/Router';


export default function App() {

  return (
    <div className='app'>
      <AuthProvider>
        <RouterProvider />
      </AuthProvider>
    </div>
  );
}