import './NavBlock.css'
import categories from '../../assets/categories.json'
import { Link } from 'react-router-dom';

interface NavBlockProps {
    category: string;
}

const NavBlock: React.FC<NavBlockProps> = ({category}) => {
    const parentCategory = categories.find(cat => cat.title.toLowerCase() === category.toLowerCase());

    if (!parentCategory || !parentCategory.children) {
        return <div>Category not found</div>
    }

    const childrenCategories = parentCategory.children.map(childTitle => 
        categories.find(cat => cat.title.toLowerCase() === childTitle.toLowerCase())
    ).filter(child => child !== undefined);
    
    return (
        <div className='nav-block'>
            <section className='nav-block__nav-cards'>
                {childrenCategories.map((cat, index) => (
                <Link key={index} to={`/${cat.title}`} className='nav-block__nav-link'>
                    <article className='nav-block__nav-card'>
                        <img src={cat.image} alt={cat.title} />
                        <h2>{cat.title}</h2>
                    </article>
                </Link>
                ))}
            </section>
            <div className='nav-block__bottom-line'></div>
        </div>
    )
}

export default NavBlock;