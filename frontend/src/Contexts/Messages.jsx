import { createContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);


    const addMessage = useCallback(({text, type}) => {
        const id = uuidv4();
        setMessages(m => [...m, { text, type, id }]);
        setTimeout(_ => {
            setMessages(m => m.filter(m => m.id !== id));
        }, 5000);
    }, []);


    return (
        <MessagesContext.Provider value={{
            addMessage
        }}>
            <>
                {
                messages.length > 0 &&
                <div className="message">
                    {
                        messages.map(message => (
                            <div key={message.id} className={`alert alert-${message.type}`} 
                            role="alert" onClick={_ => setMessages(m => m.filter(m => m.id !== message.id))}>
                                {message.text}
                            </div>
                        ))
                    }
                </div>
                }


                {children}
            </>

        </MessagesContext.Provider>
    );
}