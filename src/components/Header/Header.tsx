
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import SearchBar from '../SearchBar/SearchBar';
import Navigation from '../Navigation/Navigation';
import CartBlock from '../CartBlock/CartBlock';
import { MdOutlinePersonOutline, MdOutlineShoppingBasket } from "react-icons/md";
import logo from '../../assets/long-logo.png'
import './Header.css'
import { selectTotalItems } from '../../reducers/selectors';

const Header = () => {
    const location = useLocation();
    const totalItems = useSelector(selectTotalItems);
    const [cartVisible, setCartVisible] = useState(false);
    
    console.log(totalItems)

    const toggleCart = () => {
        setCartVisible(!cartVisible);
    }

    if (location.pathname.startsWith('/checkout'))
        { return (
            <header>
                <div className='header__continue-shopping span-one'>
                    <Link to='/' className='header__link'><p>Fortsätt handla</p></Link>
                </div>
                <div className='empty span-one'></div>
                <div className='header__logo span-two'><Link to='/'><img src={logo} className='logo'/></Link></div>
                <div className='empty span-two'></div>
            </header>
        )}
    
        return (
            <header>
                <Link to='/'><div className='header__logo span-two'><img src={logo} className='logo'/></div></Link>
                <div className='header__navigation span-three'><Navigation /></div>
                <div className='header__search-bar span-two'>
                    <SearchBar />
                    <MdOutlinePersonOutline size={48} className='header__profile-icon' />
                    <div className='header__basket-section'>
                        <MdOutlineShoppingBasket 
                            size={40} 
                            className='header__basket-icon'
                            onClick={toggleCart}    
                        />
                        {totalItems > 0 && (
                            <div className='header__basket-counter'>
                                {totalItems}
                            </div>
                        )}
                    </div>
                </div>
                {cartVisible && <div className='overlay' onClick={toggleCart}> <CartBlock exitFunct={toggleCart} /></div>}
            </header>
        )
}

export default Header;