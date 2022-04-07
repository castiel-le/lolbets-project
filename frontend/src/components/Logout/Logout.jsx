import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'

export default function Logout() {
    const navigate = useNavigate();

    /**
     * Attempts a DELETE request to logout on the backend.
     * Redirects to 404 page or home page depdending on 
     */
    const logout = async () => {
        const url = "/api/logout";
        try {
            await fetch(url, {method: "DELETE"});
            navigate("/", {replace: true});
        } catch(e) {
            navigate("/", {replace: true});
        }
    }

    useEffect(async () => {
        logout()
    }, []);

    return <></>
}