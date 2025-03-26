const baseUrl = 'http://localhost:3030';

const userApi = {
    register: async (userData) => {
        try {
            const response = await fetch(`${baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            const { token, user } = await response.json();
            return { token, user };
        } catch (err) {
            throw new Error(err.message);
        }
    },

    login: async (userData) => {
        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            const { token, user } = await response.json();
            return { token, user };
        } catch (err) {
            throw new Error(err.message);
        }
    },

    logout: async () => {
        try {
            await fetch(`${baseUrl}/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
        } catch (err) {
            console.error('Logout error:', err);
        }
    },

    getAll: async () => {
        try {
            const response = await fetch(`${baseUrl}/users`, {
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

    getOne: async (userId) => {
        try {
            const response = await fetch(`${baseUrl}/users/${userId}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            return await response.json();
        } catch (error) {
            console.error('Fetch users error:', err);
            return null;
        }
    }

};

export default userApi;
