import { useContext, useEffect, useState } from "react";
import { Accounts } from "../../Contexts/Accounts";

export default function AddMoreMod() {

    const { setAccounts, setUpdateAccount, addMoreAccount, setAddMoreAccount} = useContext(Accounts);
    const [showAddMoreModal, setShowAddMoreModal] = useState('hide');

    const hide = _ => {
        setShowAddMoreModal('hide');
        setAddMoreAccount(null);
    }

    const confirm = _ => {
        const imageToServer = null;
        setAccounts(accounts => accounts.map(acc => acc.id === addMoreAccount.id ? {...acc, sum: acc.sum + addMoreAccount.addition, temp: true} : acc));
        setUpdateAccount({...addMoreAccount, sum: addMoreAccount.sum + addMoreAccount.addition, image: imageToServer});
        hide();
    }

    useEffect(_ => {
        if (null !== addMoreAccount) {
            setShowAddMoreModal('show')
        } else {
            setShowAddMoreModal('hide')
        }
    }, [addMoreAccount]);

    return (
        <>
            <div className={`blanket ${showAddMoreModal}`} onClick={hide}></div>
            <div className={`modal-container ${showAddMoreModal}`}>
                <div className="btn-container">
                    <button className="close" onClick={hide}>x</button>
                </div>
                <div className="info">Ar tikrai norite pridėti {addMoreAccount?.addition} EUR į šią sąskaitą?</div>
                <div className="info">{addMoreAccount?.name} {addMoreAccount?.lastName}</div>
                <div className="info">{addMoreAccount?.account}</div>
                <button className="btn yes" onClick={confirm}>Pridėti</button>
                <button className="btn no" onClick={hide}>Atšaukti</button>
            </div>
        </>
    )
}