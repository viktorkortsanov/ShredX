import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm.js";
import postApi from "../../api/postApi.js";
import "./editpost.css";

export default function EditPost() {
    const { postId } = useParams();
    const navigate = useNavigate();

    const { values, setValues, handleChange, handleSubmit, error, setError } = useForm({
        title: "",
        content: "",
    });

    useEffect(() => {
        postApi.get(postId)
            .then(post => {
                setValues({ title: post.title, content: post.content });
            })
            .catch(err => {
                setError(err.message);
            });
    }, [postId, setValues, setError]);

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
                <h2>Edit Post</h2>

                {error && <p className="error-message">{error}</p>}

                <div className="input-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        placeholder="Enter post title"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        placeholder="Write your post content"
                    ></textarea>
                </div>

                <button className="submit-btn" type="submit">Update Post</button>
            </form>
        </div>
    );
}