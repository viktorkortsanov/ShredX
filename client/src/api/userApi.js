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
    },

    getPurchasedPrograms: async (userId) => {
        try {
            const response = await fetch(`${baseUrl}/programs/${userId}/purchased`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err);
            }

            return response;
        } catch (error) {
            console.error('Fetch users error:', error);
            return null;
        }
    },

    updateProfileImage: async (userId, imageUrl) => {
        try {
            const response = await fetch(`/api/users/${userId}/updateProfileImage`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ profileImageUrl: imageUrl }),
            });
    
            if (!response.ok) {
                throw new Error('Неуспешно обновяване на снимката');
            }
    
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error updating profile image:', error);
            throw error;
        }
    }

};

export default userApi;
