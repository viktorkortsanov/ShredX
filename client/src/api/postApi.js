const postApi = {
    getAll: async () => {
        try {
            const response = await fetch('http://localhost:3030/forum', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error('Fetch users error:', err);
            return null;
        }
    },
    create: async (postData) => {
        try {
            const response = await fetch("http://localhost:3030/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            return true;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    get: async (id) => {
        try {
            const response = await fetch(`http://localhost:3030/forum/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            return await response.json();
        } catch (err) {
            throw new Error(err.message);
        }
    },
    edit: async (id, postData) => {
        try {
            const response = await fetch(`http://localhost:3030/forum/${id}/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            return true;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    delete: async (id) => {
        try {
            const response = await fetch(`http://localhost:3030/forum/${id}/delete`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            return true;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    like: async (postId, userId) => {
        try {
            const response = await fetch(`http://localhost:3030/forum/${postId}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            const updatedPost = await response.json();
            return updatedPost.likes;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    comment: async (postId, content) => {
        try {
            const response = await fetch(`http://localhost:3030/forum/${postId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            return true;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    editComment: async (postId, commentId, content) => {
        try {
            const response = await fetch(`http://localhost:3030/forum/${postId}/comment/${commentId}/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            return true;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    deleteComment: async (postId, commentId) => {
        try {
            const response = await fetch(`http://localhost:3030/forum/${postId}/comment/${commentId}/delete`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            return true;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    getUserPosts: async () => {
        try {
            const response = await fetch(`http://localhost:3030/user/posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            const posts = await response.json();
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getDetails: async (id) => {
        try {
            const response = await fetch(`http://localhost:3030/forum/${id}/details`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            return await response.json();
        } catch (err) {
            throw new Error(err.message);
        }
    },

    likeToggle: async (id) => {
        try {
            const response = await fetch(`http://localhost:3030/forum/${id}/like-toggle`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to toggle like');
            }

            return await response.json();
        } catch (err) {
            throw new Error(err.message);
        }
    },

    likeComment: async (postId, commentId) => {
        try {
            const response = await fetch(`http://localhost:3030/forum/${postId}/comment/${commentId}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to toggle like');
            }

            return await response.json();
        } catch (err) {
            throw new Error(err.message);
        }
    },

    getLikedPosts: async () => {
        try {
            const response = await fetch(`http://localhost:3030/user/posts/liked`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            const posts = await response.json();
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
};
export default postApi;