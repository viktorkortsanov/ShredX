import { createContext, useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import programApi from '../api/programApi';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [lastProgramsFetch, setLastProgramsFetch] = useState(null);
    const CACHE_TIME = 5 * 60 * 1000;
    const reduxUser = useSelector(state => state.auth.user);
    const reduxToken = useSelector(state => state.auth.token);
    const authStatus = useSelector(state => state.auth.isAuthenticated);
    const [programImages, setProgramImages] = useState({});
    const [recipeImages, setRecipeImages] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        if (authStatus && reduxToken) {

            setIsAuthenticated(true);
            setToken(reduxToken);

            if (reduxUser) {
                setUser(reduxUser);
                if (reduxUser.isAdmin) {
                    setIsAdmin(true);
                }
            }
        } else {

            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (storedToken) {
                setToken(storedToken);
                setIsAuthenticated(true);

                if (storedUser) {
                    const userObj = JSON.parse(storedUser);
                    setUser(userObj);

                    if (userObj.isAdmin) {
                        setIsAdmin(true);
                    }
                }
            }
        }
    }, [authStatus, reduxUser, reduxToken]);


    const deleteProgram = async (programId) => {
        if (!isAdmin) {
            console.error('Permission denied: Only admins can delete programs');

        }

        try {
            const result = await programApi.deleteProgram(programId, token);
            invalidateProgramsCache();
            return result;
        } catch (error) {
            console.error('Failed to delete program:', error);
        }
    };
    const onUpdateProgram = async (programId, programData) => {
        if (!isAdmin) {
            console.error('Permission denied: Only admins can update programs');
        }

        try {
            const result = await programApi.updateProgram(programId, programData, token);
            return result;
        } catch (error) {
            console.error('Failed to update program:', error);
        }
    };



    const getAllPrograms = async () => {
        const now = Date.now();

        if (programs.length > 0 && lastProgramsFetch && (now - lastProgramsFetch < CACHE_TIME)) {
            return programs;
        }

        try {

            const fetchedPrograms = await programApi.getAllPrograms();
            setPrograms(fetchedPrograms);
            setLastProgramsFetch(now);
            return fetchedPrograms;
        } catch (error) {
            console.error('Failed to fetch programs:', error);

            if (programs.length > 0) {
                return programs;
            }
        }
    };

    const invalidateProgramsCache = () => {
        setLastProgramsFetch(null);
    };

    const onSubmitProgram = async (programData) => {
        if (!isAdmin) {
            console.error('Permission denied: Only admins can create programs');
            return;
        }
    
        try {
            const result = await programApi.createProgram(programData, token);
            invalidateProgramsCache();

            if (result) {
                setPrograms(prevPrograms => {

                    const exists = prevPrograms.some(p => p.id === result.id);
                    if (!exists) {
                        return [...prevPrograms, result];
                    }
                    return prevPrograms;
                });
            }
            
            navigate('/programs');
            return result;
        } catch (error) {
            console.error('Failed to create program:', error);
        }
    };

    const initiatePaymentForProgram = async (programId, paymentData) => {
        if (!isAuthenticated) {
            console.error('Payment error: User not authenticated');
            throw new Error('You must be logged in to purchase a program');
        }

        try {

            const purchasedPrograms = JSON.parse(localStorage.getItem('purchasedPrograms')) || [];
            if (purchasedPrograms.includes(programId.toString())) {
                throw new Error('You have already purchased this program');
            }

            const paymentResult = await programApi.initiatePayment(programId, paymentData, token);

            if (paymentResult && paymentResult.message === 'Payment successful') {
                const updatedPrograms = [...purchasedPrograms, programId.toString()];
                localStorage.setItem('purchasedPrograms', JSON.stringify(updatedPrograms));

                const purchaseDates = JSON.parse(localStorage.getItem('purchaseDates')) || {};
                purchaseDates[programId] = new Date().toISOString();
                localStorage.setItem('purchaseDates', JSON.stringify(purchaseDates));

                invalidateProgramsCache();
            }
            navigate('/programs')
            return paymentResult;
        } catch (error) {
            console.error('Failed to process payment:', error);
        }
    };
    const saveProgramImage = (programId, imageUrl) => {
        setProgramImages(prev => ({
            ...prev,
            [programId]: imageUrl
        }));
    };
    const saveRecipeImage = (recipeId, imageUrl) => {
        setRecipeImages(prev => ({
            ...prev,
            [recipeId]: imageUrl
        }));
    };

    const clearLocalData = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    const authContext = {
        isAuthenticated,
        isAdmin,
        user,
        token,
        clearLocalData,
        initiatePaymentForProgram,
        onSubmitProgram,
        deleteProgram,
        onUpdateProgram,
        getAllPrograms,
        programs,
        invalidateProgramsCache,
        programImages,
        recipeImages,
        saveProgramImage,
        saveRecipeImage
    };

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};