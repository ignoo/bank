import { useContext } from "react";
import { Accounts } from "../../Contexts/Accounts";
import { SERVER_URL } from "../../Constants/main";

export default function DeleteMod({ showDeleteModal, setShowDeleteModal }) {

    const { setAccounts, deleteAccount, setDeleteAccount, setDestroyAccount } = useContext(Accounts);

    const hide = _ => {
        setDeleteAccount(null);
        setShowDeleteModal('hide');
        window.location.href = '#accounts';
    }

    const destroy = _ => {
        setAccounts(accounts => accounts.map(acc => acc.id === deleteAccount.id ? {...acc, temp: true} : acc))
        // KONSOLEEEEEEEEE LOG
        console.log('destroy, pasirinktas akauntas:');
        console.log(deleteAccount);
        setDestroyAccount(deleteAccount.id);
        hide();
    }

    return (
        <>
            <div className={`blanket ${showDeleteModal}`} onClick={hide}></div>
            <div className={`modal-container ${showDeleteModal}`}>
                <div className="btn-container">
                    <button className="close" onClick={hide}>x</button>
                </div>
                <div className="representation">
                    {deleteAccount?.image && <img src={deleteAccount?.image} alt={deleteAccount?.name} className="image-id" />}
                    {!deleteAccount?.image && <img src={SERVER_URL + '/accounts/noId.jpg'} alt="no id" className="image-id" />}
                    <div className="name-container">
                        {deleteAccount?.name && <div className="name">{deleteAccount.name}</div>}
                        {deleteAccount?.lastName && <div className="last-name">{deleteAccount.lastName}</div>}
                    </div>
                </div>
                <div className="info">Ar tikrai norite ištrinti šią sąskaitą?</div>
                <button className="btn delete" onClick={destroy}>Ištrinti</button>
                <button className="btn no" onClick={hide}>Atšaukti</button>
            </div>
        </>
    )
}