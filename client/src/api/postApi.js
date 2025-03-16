const postApi = {
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
            const response = await fetch(`http://localhost:3030/forum/${id}/edit`, {
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
    }
};
export default postApi;
