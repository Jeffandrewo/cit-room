import React from "react"

const Modal = ({ isVisible, onClose, children, onCloseDashboard }) => {
    if ( !isVisible ) return null;

    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();
    }
    const handleModalClose = () => {
        onClose();
        if (onCloseDashboard) {
          onCloseDashboard();
        }
    };

    return (
        <div className="fixed inset-0 bg-black 
        bg-opacity-25 background-blur-sm flex 
        justify-center items-center" id="wrapper"
        onClick={handleClose}>
            <div className='w-100 bg-red-500 flex flex-col rounded-lg'>
                <div className='bg-white p-2 rounded-t-lg'>
                    {children}
                </div>
                <button className="text-white text-x1 font-bold"
                onClick={handleModalClose}>CLOSE</button>

            </div>
        </div>
    )
}

export default Modal;