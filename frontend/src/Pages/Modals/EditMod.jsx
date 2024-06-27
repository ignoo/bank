import { useContext, useEffect, useRef, useState } from "react";
import { Accounts } from "../../Contexts/Accounts";
import useImage from "../../Hooks/useImage";
import { MessagesContext } from "../../Contexts/Messages";
import * as v from '../../Validators/validateInputs';


export default function EditMod({ showEditModal, setShowEditModal }) {

    const { setAccounts, editAccount, setEditAccount, setUpdateAccount } = useContext(Accounts);

    const { image, setImage, readImage } = useImage();

    const [deleteImage, setDeleteImage] = useState(false);

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const imageInput = useRef();

    const { addMessage } = useContext(MessagesContext);
    const [e, setE] = useState(new Map());

    useEffect(_ => {
        setImage(editAccount?.image);
    }, [editAccount, setImage]);

    useEffect(_ => {
        if (image && image !== editAccount.image) {
            setDeleteImage(true);
        }
    }, [image, editAccount]);

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

    const hide = _ => {
        setEditAccount(null)
        setShowEditModal('hide');
        setName('');
        setLastName('');
        setImage(null);
        setDeleteImage(false);
    }

    const update = _ => {
        const errors = new Map();
        v.validate(name, 'vardas', errors, [v.required, v.string, v.lettersOnly, [v.min, 2], [v.max, 25]]);
        v.validate(lastName, 'pavardė', errors, [v.required, v.string, v.lettersOnly, [v.min, 2], [v.max, 25]]);
        // v.validate(imageInput.current.filer[0], 'image', errors, [v.sometimes, [v.imageType, ['jpeg', 'png']], [v.imageSize, 1000000]]);

        if (errors.size > 0) {
            errors.forEach(err => addMessage({ type: 'danger', text: err }));
            setE(errors);
            return;
        }

        const imageToServer = image !== editAccount.image ? image : null;


        let editedAccount = { ...editAccount }
        editedAccount.name = firstToUpperCase(name);
        editedAccount.lastName = firstToUpperCase(lastName);
        setAccounts(accounts => accounts.map(acc => acc.id === editedAccount.id ? { ...editedAccount, image, temp: true } : acc));
        setUpdateAccount({ ...editedAccount, image: imageToServer, del: deleteImage });
        hide();
        setE(new Map());

    }

    useEffect(_ => {
        if (editAccount !== null) {
            setName(editAccount.name);
            setLastName(editAccount.lastName);
        }
    }, [editAccount]);

    return (
        <>
            <div className={`blanket ${showEditModal}`} onClick={hide}></div>
            <div className={`modal-container ${showEditModal}`}>
                <div className="btn-container">
                    <button className="close" onClick={hide}>x</button>
                </div>
                <div className="info">Redaguoti</div>
                <label htmlFor="nameEdit" className="name-txt">Vardas</label>
                <input type="text" id="nameEdit" className="input name" style={{ borderColor: e.has('vardas') ? 'crimson' : null, backgroundColor: e.has('vardas') ? 'rgb(255, 190, 190)' : null }} value={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="lastnameEdit" className="name-txt">Pavardė</label>
                <input type="text" id="lastnameEdit" className="input lastname" style={{ borderColor: e.has('pavardė') ? 'crimson' : null, backgroundColor: e.has('pavardė') ? 'rgb(255, 190, 190)' : null }} value={lastName} onChange={e => setLastName(e.target.value)} />
                <div className='image-container'>
                    <label htmlFor="editImage" className='image-label'>Asmens dokumento kopija</label>
                    <input ref={imageInput} type="file" id='editImage' className='image-input' onChange={readImage} />
                </div>
                <h6 style={{ cursor: 'pointer', marginLeft: '10px', display: image ? 'inline-block' : 'none' }} onClick={_ => {
                    setDeleteImage(true);
                    setImage(null);
                    imageInput.current.value = null;
                }}>Pašalinti nuotrauką</h6>
                {
                    image &&
                    <img src={image} alt={editAccount.name} className='image-fluid' />
                }
                <div className="btns">
                    <button className="btn yes" onClick={update}>Išsaugoti</button>
                    <button className="btn no" onClick={hide}>Atšaukti</button>
                </div>
            </div>
        </>
    )
}