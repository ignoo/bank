import { createContext, useEffect, useState } from "react";
import HomeIndex from '../Pages/Home/Index.jsx';
import Login from '../Pages/Auth/Login.jsx';
import AccountsIndex from '../Pages/Accounts/Index.jsx';
import Page404 from "../Pages/Page404.jsx";
import { MessagesProvider } from "./Messages.jsx";

export const Router = createContext();


export const RouterProvider = ({ children }) => {

    const [route, setRoute] = useState(_ => {
        const hash = window.location.hash || '#home';
        return hash.split('/').shift()
    });
    const [params, setParams] = useState(_ => {
        const hash = window.location.hash.split('/');
        hash.shift();
        return hash;
    });

    useEffect(() => {

        const handleHashChange = _ => {
            const hash = window.location.hash.split('/');
            setRoute(hash.shift());
            setParams(hash);


            // setRoute(window.location.hash);
        }

        window.addEventListener('hashchange', handleHashChange);

        //dingus komponentui dings ir eventListener'is
        return _ => window.removeEventListener('haschange', handleHashChange);
    }, []);

    const routes = [
        {path: '#home', component: <HomeIndex />},
        {path: '#login', component: <Login />},
        {path: '#accounts', component: <AccountsIndex />}

    ];

    const routeComponent = routes.find(r => r.path === route)?.component || <Page404 />;

    return (
        <Router.Provider value ={params}>
            <MessagesProvider>
                {routeComponent}
            </MessagesProvider>
        </Router.Provider>
    )
}