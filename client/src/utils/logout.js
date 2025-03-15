export const logout = async (setIsAuthenticated, navigate) => {
    try {
        await fetch("http://localhost:3030/logout", {
            method: "GET",
            headers: {
                'Content-Type': 'aplication/json'
            },
            credentials: "include",
        });

        setIsAuthenticated(false);
        navigate("/");
    } catch (err) {
        console.error("Logout error:", err);
    }
};