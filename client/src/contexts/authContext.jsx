import { createContext, useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import programApi from '../api/programApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const reduxUser = useSelector(state => state.auth.user);
    const reduxToken = useSelector(state => state.auth.token);
    const authStatus = useSelector(state => state.auth.isAuthenticated);

    
    useEffect(() => {
        if (authStatus) {
            console.log('User is authenticated in Redux');
            setIsAuthenticated(true);
            setToken(reduxToken);
            
            if (reduxUser) {
                setUser(reduxUser);
                
                if (reduxUser.isAdmin) {
                    setIsAdmin(true);
                }
            }
        } else {
            const storedToken = localStorage.getItem('auth_token');
            const storedUser = localStorage.getItem('user');

            if (storedToken) {
                console.log('Token found in localStorage');
                setToken(storedToken);
                setIsAuthenticated(true);
                
                if (storedUser) {
                    const userObj = JSON.parse(storedUser);
                    console.log('Setting user from localStorage:', userObj);
                    setUser(userObj);
                    
                    if (userObj.isAdmin) {
                        console.log('User from localStorage is admin:', userObj.isAdmin);
                        setIsAdmin(true);
                    }
                }
            }
        }
    }, [authStatus, reduxUser, reduxToken]);

    useEffect(() => {
        console.log('AuthContext state updated:', {
            isAuthenticated,
            isAdmin,
            user,
            token
        });
    }, [isAuthenticated, isAdmin, user, token]);

    const onSubmitProgram = async (programData) => {
        if (!isAdmin) {
            console.error('Permission denied: Only admins can create programs');
            throw new Error('Permission denied: Only admins can create programs');
        }

        try {
            const result = await programApi.createProgram(programData, token);
            console.log('Program created successfully:', result);
            return result;
        } catch (error) {
            console.error('Failed to create program:', error);
            throw error;
        }
    };

    const deleteProgram = async (programId) => {
        if (!isAdmin) {
            console.error('Permission denied: Only admins can delete programs');
            throw new Error('Permission denied: Only admins can delete programs');
        }

        try {
            const result = await programApi.deleteProgram(programId, token);
            console.log('Program deleted successfully:', result);
            return result;
        } catch (error) {
            console.error('Failed to delete program:', error);
            throw error;
        }
    };
    const onUpdateProgram = async (programId, programData) => {
        if (!isAdmin) {
            console.error('Permission denied: Only admins can update programs');
            throw new Error('Permission denied: Only admins can update programs');
        }

        try {
            const result = await programApi.updateProgram(programId, programData, token);
            console.log('Program updated successfully:', result);
            return result;
        } catch (error) {
            console.error('Failed to update program:', error);
            throw error;
        }
    };


    const getAllPrograms = async () => {
        try {
            const programs = await programApi.getAllPrograms();
            console.log('Programs fetched successfully:', programs);
            return programs;
        } catch (error) {
            console.error('Failed to fetch programs:', error);
            throw error;
        }
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
 
        onSubmitProgram,
        deleteProgram,
        onUpdateProgram,
        getAllPrograms
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