import React from "react";
import "../../styles/common/Modal.css";


function Modal ({children}) {
    return (
        <div className="modal-container">
            <div className="modal-body">
                {children}
            </div>
        </div>
    );
}


export default Modal;
