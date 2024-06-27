import { useContext, useRef, useState } from 'react';
import { Accounts } from '../../Contexts/Accounts';
import useImage from '../../Hooks/useImage';
import { v4 as uuid } from 'uuid';
import * as v from '../../Validators/validateInputs';
import { MessagesContext } from "../../Contexts/Messages";


export default function CreateNewMod({ showCreateModal, setShowCreateModal }) {

    const { setCreateAccount, setAccounts } = useContext(Accounts);

    const { image, setImage, readImage } = useImage();

    const imageInput = useRef();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const { addMessage } = useContext(MessagesContext);
    const [e, setE] = useState(new Map());

    // Atsitiktinio skaičiaus generatorius
    function rand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Random saskaitos nr sukurimas
    const newAccount = _ => {
        let account = 'LT';
        for (let i = 0; i < 18; i++) {
            account += rand(1, 9);
        }
        return account;
    }

    const firstToUpperCase = sentence => {
        let splitSentence = sentence.toLowerCase().split(' ');
        
        let newSplitSentence = splitSentence.map(word => {
            let firstLet = word[0].toUpperCase()
            let remainder = word.split('');
            remainder.shift();
            return firstLet + remainder.join('');
        });
        return newSplitSentence.join(' ');
    }

    const addAccount = _ => {
        const errors = new Map();
        v.validate(name, 'vardas', errors, [v.required, v.string, v.lettersOnly, [v.min, 2], [v.max, 25]]);
        v.validate(lastName, 'pavardė', errors, [v.required, v.string, v.lettersOnly, [v.min, 2], [v.max, 25]]);
        // v.validate(imageInput.current.filer[0], 'image', errors, [v.sometimes, [v.imageType, ['jpeg', 'png']], [v.imageSize, 1000000]]);

        if (errors.size > 0) {
            errors.forEach(err => addMessage({ type: 'danger', text: err }));
            setE(errors);
            return;
        }
        const account = {
            name: firstToUpperCase(name),
            lastName: firstToUpperCase(lastName),
            account: newAccount(),
            sum: 0,
            status: 'unblocked',
            image,
            id: uuid(),
            temp: false
        };
        setCreateAccount(account);
        setAccounts(acc => [...acc, { ...account, temp: true }]);
        imageInput.current.value = '';
        hide();
        setE(new Map());
    }

    const hide = _ => {
        setShowCreateModal('hide');
        setName('');
        setLastName('');
        setImage(null);
    }




    return (
        <>
            <div className={`blanket ${showCreateModal}`} onClick={hide}></div>
            <div className={`modal-container ${showCreateModal}`}>
                <div className="btn-container">
                    <button className="close" onClick={hide}>x</button>
                </div>
                <div className="info">Pridėti naują sąskaitą</div>
                <label htmlFor="addName" className="name-txt">Vardas</label>
                <input type="text" id="addName" className="input name" style={{borderColor: e.has('vardas') ? 'crimson' : null, backgroundColor: e.has('vardas') ? 'rgb(255, 190, 190)' : null}} value={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="addLastname" className="name-txt">Pavardė</label>
                <input type="text" id="addLastname" className="input lastname" style={{borderColor: e.has('pavardė') ? 'crimson' : null, backgroundColor: e.has('pavardė') ? 'rgb(255, 190, 190)' : null}} value={lastName} onChange={e => setLastName(e.target.value)} />
                <div className='image-container'>
                    <label htmlFor="addImage" className='image-label'>Asmens dokumento kopija</label>
                    <input ref={imageInput} type="file" id='addImage' className='image-input' onChange={readImage} />
                </div>
                {
                    image &&
                    <img src={image} alt='selected-img' className='image-fluid' />
                }
                <div className="btns">
                    <button className="btn yes" onClick={addAccount}>Pridėti</button>
                    <button className="btn no" onClick={hide}>Atšaukti</button>
                </div>
            </div>
        </>
    )
}