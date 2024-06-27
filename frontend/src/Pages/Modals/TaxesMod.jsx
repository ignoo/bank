import { useContext } from "react";
import { Accounts } from "../../Contexts/Accounts";

export default function TaxesMod({ showTaxModal, setShowTaxModal }) {

    const { accounts, setAccounts, setUpdateAccount } = useContext(Accounts);

    const payTaxes = _ => {
        setAccounts(accounts => accounts.map(acc => ({...acc, sum: acc.sum - 5})));
        setUpdateAccount({tax: true});
        setShowTaxModal('hide');
    }
    
    return (
        <>
            <div className={`blanket ${showTaxModal}`} onClick={_ => setShowTaxModal('hide')}></div>
            <div className={`modal-container ${showTaxModal}`}>
                <div className="btn-container">
                    <button className="close" onClick={_ => setShowTaxModal('hide')}>x</button>
                </div>
                <div className="info">Mokesčiai</div>
                <div className="info">Patvirtinus nuo visų sąskaitų bus nuskaičiuota po 5 EUR.</div>
                <button className="btn yes" onClick={payTaxes}>Patvirtinti</button>
                <button className="btn no" onClick={_ => setShowTaxModal('hide')}>Atšaukti</button>
            </div>
        </>
    )
}