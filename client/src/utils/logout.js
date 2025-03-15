export const logout = async () => {
    try {
        await fetch("http://localhost:3030/logout", {
            method: "GET",
            headers: {
                'Content-Type': 'aplication/json'
            },
            credentials: "include",
        });
    } catch (err) {
        console.error("Logout error:", err);
    }
};