import { Link } from 'react-router-dom';
import './Navigation.css'
import { useState, useEffect } from 'react';
import NavBlock from '../NavBlock/NavBlock';

const Navigation = () => {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    const handleMouseEnter = (category: string) => {
        setHoveredCategory(category)
    };

    const handleMouseLeave = () => {
        setHoveredCategory(null)
    };

    useEffect(() => {
        const handleScroll = () => {
            setHoveredCategory(null);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    return (
        <nav>
            <div className='navigation__links'>
                <Link 
                    to='/blommor' 
                    className='nav__link'
                    onMouseEnter={() => handleMouseEnter('blommor')}
                > 
                    <h2>Blommor</h2>
                </Link>
                <h2>-</h2>
                <Link 
                    to='/grönsaker' 
                    className='nav__link'
                    onMouseEnter={() => handleMouseEnter('grönsaker')}
                > 
                    <h2>Grönsaker</h2>
                </Link>
                <h2>-</h2>
                <Link 
                    to='/kryddor' 
                    className='nav__link'
                    onMouseEnter={() => handleMouseEnter('kryddor')}
                > 
                    <h2>Kryddor</h2>
                </Link>
                <h2>-</h2>
                <Link 
                    to='/lökar & knölar' 
                    className='nav__link'
                    onMouseEnter={() => handleMouseEnter('lökar & knölar')}
                > 
                    <h2>Lökar & Knölar</h2>
                </Link>
                <h2>-</h2>
                <Link 
                    to='/träd & buskar' 
                    className='nav__link'
                    onMouseEnter={() => handleMouseEnter('träd & buskar')}
                > 
                    <h2 className='navigation__category'>Träd & Buskar</h2>
                </Link>
            </div>
        {hoveredCategory && (
        <div className="navigation__navblock-container"
                onMouseLeave={handleMouseLeave}
                >
          <NavBlock category={hoveredCategory} />
        </div>
      )}
        </nav>
    )
}

export default Navigation;