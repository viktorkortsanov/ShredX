const baseUrl = 'http://localhost:3030';

const programApi = {
    createProgram: async (programData, token) => {
        try {
            const response = await fetch(`${baseUrl}/programs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(programData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err || 'Failed to create program');
            }

            return await response.json();
        } catch (err) {
            console.error('Create program error:', err);
            throw new Error(err.message);
        }
    },

    getAllPrograms: async () => {
        try {
            const response = await fetch(`${baseUrl}/programs/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error('Fetch programs error:', err);
            return [];
        }
    },

    getProgramById: async (programId) => {
        try {
            const response = await fetch(`${baseUrl}/programs/${programId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error(`Fetch program ${programId} error:`, err);
            return null;
        }
    },

    updateProgram: async (programId, programData, token) => {
        try {
            const response = await fetch(`${baseUrl}/programs/${programId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(programData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err || 'Failed to update program');
            }

            return await response.json();
        } catch (err) {
            console.error('Update program error:', err);
            throw new Error(err.message);
        }
    },

    deleteProgram: async (programId, token) => {
        try {
            const response = await fetch(`${baseUrl}/programs/${programId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err || 'Failed to delete program');
            }

            return await response.json();
        } catch (err) {
            console.error('Delete program error:', err);
            throw new Error(err.message);
        }
    }
};

export default programApi;