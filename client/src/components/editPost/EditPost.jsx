import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm.js";
import postApi from "../../api/postApi.js";
import "./editpost.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function EditPost() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const userId = useSelector(state => state.auth.user?._id);
    const isAdmin = useSelector(state => state.auth.user.isAdmin);
    const { t } = useTranslation();

    const { values, setValues, handleChange, handleSubmit, error, setError } = useForm({
        title: "",
        content: "",
    });

    useEffect(() => {
        async function fetchPost() {
            try {
                const post = await postApi.get(postId);

                if (post.owner !== userId && !isAdmin) {
                    navigate('/404');
                    return;
                }

                setValues({ title: post.title, content: post.content });
            } catch (err) {
                setError(err.message);
            }
        }

        fetchPost();
    }, [postId, setValues, setError, userId, navigate]);

    const submitPost = async (postData) => {
        try {
            await postApi.edit(postId, postData);
            navigate(`/forum/${postId}/details`);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="create-post-container">
            <form className="create-post-form" onSubmit={handleSubmit(submitPost)} method="POST">
                <h2>{t('forum.editPostForm')}</h2>

                {error && <p className="error-message">{error}</p>}

                <div className="input-group">
                    <label htmlFor="title">{t('forum.editFormTitle')}:</label>
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
                    <label htmlFor="content">{t('forum.editFormContent')}:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        placeholder={t('forum.editFormContentPlaceholder')}
                    ></textarea>
                </div>

                <button className="submit-btn" type="submit">{t('forum.editFormButtons')}</button>
                <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => navigate(`/forum/${postId}/details`)}
                >
                    {t('confirmDialog.cancel')}
                </button>
            </form>
        </div>
    );
}