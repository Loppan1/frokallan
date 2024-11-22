import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import './notFoundPage.css'

const NotFoundPage = () => {    
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(-1);
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate])

    return (
        <>
            <p>Något gick fel, du kommer omdirrigeras till föregående sida</p>
        </>
    )
}

export default NotFoundPage;