import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import "./createpost.css";
import postApi from "../../api/postApi.js";

export default function CreatePost() {
    const { values, handleChange, handleSubmit, error, setError } = useForm({
        title: "",
        content: "",
    });

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
            <form className="create-post-form" onSubmit={handleSubmit(submitPost)} method="POST">
                <h2>Create a New Post</h2>

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

                <button className="submit-btn" type="submit">Create Post</button>
            </form>
        </div>
    );
}
