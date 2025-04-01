import { useTranslation } from 'react-i18next';
import './confirmdialog.css';

const ConfirmationDialog = ({ onCancel, onConfirm }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="overlay"></div>
            <div className="confirmation-dialog">
                <p className="confirm-p">{t('confirmDialog.dialog_message')}</p>
                <div className="buttons">
                    <button className="confirm-btn-dialog" onClick={onConfirm}>{t('confirmDialog.delete')}</button>
                    <button className="cancel-btn-dialog" onClick={onCancel}>{t('confirmDialog.cancel')}</button>
                </div>
            </div>
        </>
    );
};

export default ConfirmationDialog;