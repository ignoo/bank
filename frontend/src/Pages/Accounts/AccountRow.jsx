import { useContext, useState } from "react";
import { SERVER_URL } from "../../Constants/main";
import { Accounts } from "../../Contexts/Accounts";
import { MessagesContext } from "../../Contexts/Messages";
import * as v from '../../Validators/validateInputs';


export default function AccountRow({ account, setShowEditModal, setShowDeleteModal }) {

  const { setAccounts, setEditAccount, setUpdateAccount, setDeleteAccount, setAddMoreAccount } = useContext(Accounts)
  const { addMessage } = useContext(MessagesContext);
  const [sum, setSum] = useState('');
  const imageToServer = null;

  const [e, setE] = useState(new Map());

  const editSum = pos => {
    if (account.status === 'blocked') {
      addMessage({ type: 'danger', text: 'Operacija negalima, kol sąskaita yra užblokuota' });
    } else {
      const errors = new Map();
      v.validate(sum, 'lėšos', errors, [v.required, v.integer, [v.max, 6]]);

      if (errors.size > 0) {
        errors.forEach(err => addMessage({ type: 'danger', text: err }));
        setE(errors);
        return;
      }
      const toAdd = sum * pos;
      if (toAdd > 1000) {
        setAddMoreAccount({ ...account, addition: toAdd });
        setSum('')
        setE(new Map());
      } else if (toAdd < 0 && account.sum < toAdd) {
        addMessage({ type: 'danger', text: 'Sąskaitoje nepakanka lėšų' });
      } else {
        setAccounts(accounts => accounts.map(acc => acc.id === account.id ? { ...account, sum: account.sum + toAdd, temp: true } : acc));
        setUpdateAccount({ ...account, sum: account.sum + toAdd, image: imageToServer });
        setSum('')
        setE(new Map());
      }
    }
  }

  const addIdToUrl = _ => {
    window.location.href = '#accounts/' + account.id;
  }

  const blockOrUnblock = _ => {
    let accountBlock = { ...account };
    accountBlock.status === 'blocked' ? accountBlock.status = 'unblocked' : accountBlock.status = 'blocked';
    setAccounts(accounts => accounts.map(acc => acc.id === accountBlock.id ? { ...accountBlock, temp: true } : acc));
    setUpdateAccount({ ...accountBlock, image: imageToServer });
  }

  const handleDelete = _ => {
    if (account.status === 'blocked') {
      addMessage({ type: 'danger', text: 'Operacija negalima, kol sąskaita yra užblokuota' });
    } else if (account.sum !== 0) {
      addMessage({ type: 'danger', text: 'Norint sąskaitą ištrinti, jos likutis turi būti lygus 0' });
    } else {
      setShowDeleteModal('show');
      setDeleteAccount(account);
      addIdToUrl();
    }
  }

  const handleEdit = _ => {
    if (account.status === 'blocked') {
      addMessage({ type: 'danger', text: 'Operacija negalima, kol sąskaita yra užblokuota' });
    } else {
      setShowEditModal('show');
      setEditAccount(account);
    }
  }

  return (
    <>
      <tr className='row'>
        <td className='name'>{account.name}</td>
        <td className='surname'>{account.lastName}</td>
        <td className='account'>{account.account}</td>
        <td className='sum'>{account.sum}</td>
        <td className='eur'>EUR</td>
        <td className='edit'>
          <div className='edit-container'>
            <input type="text" id={account.id} value={sum} maxLength={6} style={{borderColor: e.has('lėšos') ? 'crimson' : null, backgroundColor: e.has('lėšos') ? 'rgb(255, 190, 190)' : null}} onChange={e => setSum(e.target.value)} />
            <div className='edit-buttons'>
              <button className={`prideti ${account.status}`} onClick={_ => editSum(+1)}>Pridėti lėšas</button>
              <button className={`nuskaiciuoti ${account.status}`} onClick={_ => editSum(-1)}>Nuskaičiuoti lėšas</button>
              <button className={`keisti ${account.status}`} onClick={handleEdit}>Redaguoti</button>
              {account.status === 'unblocked' ? <button className='blokuoti' onClick={blockOrUnblock}>Blokuoti</button> : <button className='blokuoti' onClick={blockOrUnblock}>Atblokuoti</button>}
            </div>
          </div>
        </td>
        <td className='delete'><button className={`delete-btn ${account.status}`} onClick={handleDelete}><img className='trash' src={require("../../pics/trash-can.png")} alt="trash can" /></button></td>
      </tr>
      <tr className="image row">
        <td colSpan="7" className="id-container">
          {account?.image && <img src={account?.image} alt={account?.name} className="image-id" />}
          {!account?.image && <img src={SERVER_URL + '/accounts/noId.jpg'} alt="no" className="image-id" />}
        </td>
      </tr>
    </>
  );
}