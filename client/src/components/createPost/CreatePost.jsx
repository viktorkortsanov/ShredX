import { useState } from "react";
import "./createpost.css";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            setError("Title and content are required.");
            return;
        }

        console.log("New Post:", { title, content });

        setTitle("");
        setContent("");
        setError("");
    };

    return (
        <div className="create-post-container">
            <form className="create-post-form" onSubmit={handleSubmit} method="POST">
                <h2>Create a New Post</h2>
                
                {error && <p className="error-message">{error}</p>}
                
                <div className="input-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post content"
                    ></textarea>
                </div>

                <button className="submit-btn" type="submit">Create Post</button>
            </form>
        </div>
    );
}
