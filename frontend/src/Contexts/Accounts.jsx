import { createContext } from "react";
import useAccounts from "../Hooks/useAccounts"

export const Accounts = createContext();

export const AccountsProvider = ({ children }) => {


    const {accounts, setAccounts, createAccount, setCreateAccount, editAccount, setEditAccount, updateAccount, setUpdateAccount, deleteAccount, setDeleteAccount, destroyAccount, setDestroyAccount, addMoreAccount, setAddMoreAccount, filter, setFilter, sort, setSort } = useAccounts();



    return (
        <Accounts.Provider value={{
            accounts, setAccounts,
            createAccount, setCreateAccount,
            editAccount, setEditAccount,
            updateAccount, setUpdateAccount,
            deleteAccount, setDeleteAccount,
            destroyAccount, setDestroyAccount,
            addMoreAccount, setAddMoreAccount,
            filter, setFilter,
            sort, setSort
        }}>
            {children}
        </Accounts.Provider>
    );
}