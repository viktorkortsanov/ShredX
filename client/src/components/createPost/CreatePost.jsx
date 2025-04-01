import { useNavigate, Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import "./createpost.css";
import postApi from "../../api/postApi.js";
import { useTranslation } from "react-i18next";

export default function CreatePost() {
    const { values, handleChange, handleSubmit, error, setError } = useForm({
        title: "",
        content: "",
    });

    const { t } = useTranslation();
    const navigate = useNavigate();

    const submitPost = async (postData) => {
        try {
            await postApi.create(postData);
            navigate('/forum');
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="create-post-container">
            <div className="create-post-wrapper">
                <form className="create-post-form" onSubmit={handleSubmit(submitPost)} method="POST">
                    <h2>{t('forum.createPost')}</h2>

                    {error && <p className="error-message">{error}</p>}

                    <div className="input-group">
                        <label htmlFor="title">{t('forum.editFormTitle')}</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            placeholder={t('forum.editFormTitlePlaceholder')}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="content">{t('forum.editFormContent')}</label>
                        <textarea
                            id="content"
                            name="content"
                            value={values.content}
                            onChange={handleChange}
                            placeholder={t('forum.editFormContentPlaceholder')}
                        ></textarea>
                    </div>

                    <div className="form-actions">
                        <button className="submit-btn" type="submit">{t('forum.createPost')}</button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate('/forum')}
                        >
                            {t('confirmDialog.cancel')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}