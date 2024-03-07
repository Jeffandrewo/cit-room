import React from "react";

const Modal = ({ isVisible, onClose, children}) => {
    if ( !isVisible ) return null;

    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();

    }

    return (
        <div className="fixed inset-0 bg-black 
        bg-opacity-25 background-blur-sm flex 
        justify-center items-center" id="wrapper"
        onClick={handleClose}>
            <div className='w-[600px] flex flex-col'>
                <div className='bg-white p-2 rounded'>
                    {children}
                </div>
                <button className="text-white text-x1 font-sm font-bold"
                onClick={() => onClose()}>CLOSE</button>

            </div>

        </div>
    )
}

export default Modal;