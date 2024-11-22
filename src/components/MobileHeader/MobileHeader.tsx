import mobileLogo from '../../assets/square-logo.png'
import './MobileHeader.css'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlinePersonOutline, MdOutlineShoppingBasket, MdOutlineSearch, MdOutlineMenu  } from 'react-icons/md';
import { selectTotalItems } from '../../reducers/selectors';
import CartBlock from '../CartBlock/CartBlock';
import MobileMenu from '../MobileMenu/MobileMenu';

const MobileHeader = () => {
    const totalItems = useSelector(selectTotalItems);
    const [cartVisible, setCartVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleCart = () => {
        setCartVisible(!cartVisible);
    }

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    }

    return (
        <header className='mobile-header'>
            <MdOutlineMenu size={48} className='mobile-header__icon' onClick={toggleMenu}/>
            <MdOutlinePersonOutline size={48} className='mobile-header__icon' />
            <Link to='/'><div className='header__logo span-two'><img src={mobileLogo} className='logo'/></div></Link>
            
            <MdOutlineSearch size={48} className='mobile-header__icon' />
                <div className='header__basket-section'>
                    <MdOutlineShoppingBasket 
                        size={40} 
                        className='mobile-header__icon'
                        onClick={toggleCart}    
                    />
                    {totalItems > 0 && (
                        <div className='header__basket-counter'>
                            {totalItems}
                        </div>
                    )}
                </div>
            {cartVisible && <div className='overlay' onClick={toggleCart}> <CartBlock exitFunct={toggleCart} /></div>}
            {menuVisible && 
                <MobileMenu 
                    menuExit={toggleMenu}
                    cartOpen={toggleCart}
                    />}
        </header>
    )
}

export default MobileHeader;