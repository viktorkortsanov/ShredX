import './confirmdialog.css';

const ConfirmationDialog = ({ onCancel, onConfirm }) => {
    return (
        <>
            <div className="overlay"></div>
            <div className="confirmation-dialog">
                <p className="confirm-p">Are you sure you want to delete this post?</p>
                <div className="buttons">
                    <button className="confirm-btn-dialog" onClick={onConfirm}>Delete</button>
                    <button className="cancel-btn-dialog" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </>
    );
};

export default ConfirmationDialog;