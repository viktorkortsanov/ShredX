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
    }
}

export default postApi;