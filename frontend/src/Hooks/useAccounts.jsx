import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
import { MessagesContext } from "../Contexts/Messages";


export default function useAccounts() {
    
    const [accounts, setAccounts] = useState(null);
    const [createAccount, setCreateAccount] = useState(null);
    const [editAccount, setEditAccount] = useState(null);
    const [updateAccount, setUpdateAccount] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(null);
    const [destroyAccount, setDestroyAccount] = useState(null);
    const [addMoreAccount, setAddMoreAccount] = useState(null);

    const [filter, setFilter] = useState('visos');
    const [sort, setSort] = useState('pradinis');

    const { addMessage } = useContext(MessagesContext);
    const { user } = useContext(Auth);

    

    useEffect(_ => {
        const withTokenUrl =
        user ? `${SERVER_URL}/accounts?token=${user?.token}&sort=${sort}&filter=${filter}` : `${SERVER_URL}/accounts`;
        
        axios.get(withTokenUrl)
            .then(res => {
                setAccounts(res.data);
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        window.location.href = '#login';
                    }
                }
                console.log(err);
            });
    }, [user, sort, filter]);

    useEffect(_ => {
        if (null !== createAccount) {
            axios.post(`${SERVER_URL}/accounts`, createAccount)
            .then(res => {
                setCreateAccount(null);
                setAccounts(acc => acc.map(account => account.id === res.data.uuidv4 ? {...account, id: res.data.id, image: res.data.image, temp: false} : account));
                addMessage(res.data.message);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [createAccount, addMessage]);

    useEffect(_ => {
        if (null !== updateAccount) {
            axios.put(`${SERVER_URL}/accounts`, updateAccount)
            .then(res => {
                setUpdateAccount(null);
                setAccounts(accounts => accounts.map(acc => acc.id === res.data.id ? {...acc, temp: false} : acc));
                addMessage(res.data.message);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [updateAccount, addMessage]);

    useEffect(_ => {
        if (null !== destroyAccount) {
            axios.delete(`${SERVER_URL}/accounts/${destroyAccount}`)
            .then(res => {
                setDestroyAccount(null);
                setAccounts(accounts => accounts.filter(acc => acc.id !== res.data.id));
                addMessage(res.data.message);
            })
            .catch(err => {
                console.log(err);
                setAccounts(accounts => accounts.map(acc => acc.id === destroyAccount ? {...acc, temp: false} : acc));
                setDestroyAccount(null);
            });
        }
    }, [destroyAccount, addMessage]);


    return {
        accounts, 
        setAccounts,
        createAccount, 
        setCreateAccount,
        editAccount, 
        setEditAccount,
        updateAccount,
        setUpdateAccount,
        deleteAccount, 
        setDeleteAccount,
        destroyAccount,
        setDestroyAccount,
        addMoreAccount,
        setAddMoreAccount,
        filter,
        setFilter,
        sort,
        setSort
    }
}