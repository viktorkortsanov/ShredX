const baseUrl = 'http://localhost:3030';

const programApi = {

    createProgram: async (programData, token) => {
        try {
            const response = await fetch(`${baseUrl}/programs/create`, {
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
    },

    checkProgramPurchase: async (programId, token) => {
        try {
      
            const userId = JSON.parse(localStorage.getItem('user'))?._id;
            if (!userId) return { purchased: false };

            const response = await fetch(`${baseUrl}/programs/${userId}/purchased`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const programs = await response.json();
            return { purchased: programs.some(p => p._id === programId || p === programId) };

        } catch (err) {
            console.error('Check program purchase error:', err);
            return { purchased: false }; 
        }
    },
    getUserPurchasedPrograms: async (userId, token) => {
        try {
            const response = await fetch(`${baseUrl}/programs/${userId}/purchased`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error('Fetch user purchased programs error:', err);

            const purchasedPrograms = JSON.parse(localStorage.getItem('purchasedPrograms')) || [];
            return purchasedPrograms;
        }
    },
    initiatePayment: async (programId, paymentData, token) => {
        try {
            const response = await fetch(`${baseUrl}/programs/pay/${programId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include', 
                body: JSON.stringify({
                    ...paymentData,
                    userId: JSON.parse(localStorage.getItem('user'))?._id 
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || errorData.message || 'Failed to process payment');
            }

            return await response.json();
        } catch (err) {
            console.error('Payment processing error:', err);
            throw new Error(err.message);
        }
    }
};

export default programApi;