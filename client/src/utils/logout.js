export const logout = async (navigate) => {
    try {
        const response = await fetch('http://localhost:3030/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        navigate('/');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};