import React from 'react';
import './confirmdialog.css';

const ConfirmationDialog = ({ onCancel, onConfirm }) => {
    return (
        <>
            <div className="overlay"></div>
            <div className="confirmation-dialog">
                <p>Are you sure you want to delete this post?</p>
                <div className="buttons">
                    <button className="confirm-btn" onClick={onConfirm}>Delete</button>
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </>
    );
};

export default ConfirmationDialog;