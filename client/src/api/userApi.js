const userApi = {
    register: async (userData) => {
        try {
            const response = await fetch('http://localhost:3030/register', {
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
            localStorage.setItem('user', JSON.stringify({ id: user._id, email: user.email }));
            localStorage.setItem('token', token);

            return { token, user };
        } catch (err) {
            throw new Error(err.message);
        }
    },

    login: async (userData) => {
        try {
            const response = await fetch('http://localhost:3030/login', {
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
            localStorage.setItem('user', JSON.stringify({ id: user._id, email: user.email }));
            localStorage.setItem('token', token);

            return { token, user };
        } catch (err) {
            throw new Error(err.message);
        }
    },

    logout: async () => {
        try {
            await fetch('http://localhost:3030/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } catch (err) {
            console.error('Logout error:', err);
        }
    }
};

export default userApi;
