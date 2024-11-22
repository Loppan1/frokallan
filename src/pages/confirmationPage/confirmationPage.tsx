import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './confirmationPage.css'

const ConfirmationPage = () => {
    const contactDetails = useSelector((state: RootState) => state.contact)

    
    return ( 
        <main className='confirmation-page'>
            <h1>Tack för ditt köp!</h1>
            <h2>Order nummer: 123456</h2>
            <h2>Du kommer att få kvitto till {contactDetails.email}</h2>
            <Link to="/"><button>Tillbaka till butiken</button></Link>
        </main>
    )
}

export default ConfirmationPage;