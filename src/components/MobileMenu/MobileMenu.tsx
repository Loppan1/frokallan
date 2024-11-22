import { MdOutlinePersonOutline, MdOutlineSearch, MdOutlineShoppingBasket } from 'react-icons/md';
import './MobileMenu.css'
import { useSelector } from 'react-redux';
import { selectTotalItems } from '../../reducers/selectors';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
    menuExit: () => void;
    cartOpen: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({menuExit, cartOpen}) => {
    const totalItems = useSelector(selectTotalItems);

    return (
        <div className='mobile-menu'>
            <div className='cart-block__exit' onClick={menuExit}>
                <div className='exit-line-one'/>
                <div className='exit-line-two'/>
            </div>
            <div className='mobile-menu__icons'>
                <MdOutlinePersonOutline size={52} className='mobile-menu__icon' />
                <MdOutlineSearch size={48} className='mobile-menu__icon' />
                <div className='mobile-menu__basket-section'>
                    <MdOutlineShoppingBasket 
                        size={44} 
                        className='mobile-menu__icon'
                        onClick={cartOpen}    
                    />
                    {totalItems > 0 && (
                        <div className='mobile-menu__basket-counter'>
                            {totalItems}
                        </div>
                    )}
                </div>
            </div>
            <Link to='/blommor' onClick={menuExit} className='mobile-menu__link'><h1 className='mobile-menu__title'>Blommor</h1></Link>
            <Link to='/grönsaker' onClick={menuExit} className='mobile-menu__link'><h1 className='mobile-menu__title'>Grönsaker</h1></Link>
            <Link to='/lökar & knölar' onClick={menuExit} className='mobile-menu__link'><h1 className='mobile-menu__title'>Lökar & Knölar</h1></Link>
            <Link to='/kryddor' onClick={menuExit} className='mobile-menu__link'><h1 className='mobile-menu__title'>Kryddor</h1></Link>
            <Link to='/träd & buskar' onClick={menuExit} className='mobile-menu__link'><h1 className='mobile-menu__title'>Träd & Buskar</h1></Link>
            <h1 className='mobile-menu__title'>Information</h1>
            <h1 className='mobile-menu__title'>Hjälp</h1>
            <div className='mobile-menu__contact'>
                <h2>Kontaktuppgifter</h2>
                <p>Frökällan ekologiska fröer <br/>
                    Postadress: Härnågonstans <br/>
                    Långbortistan <br/>
                    Org. nr: 42069-1337
                </p>
            </div>
        </div>
    )
}

export default MobileMenu;