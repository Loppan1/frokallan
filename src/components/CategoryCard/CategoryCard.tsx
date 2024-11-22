import { Link } from 'react-router-dom';
import './CategoryCard.css'

interface CategoryCardProps {
    image: string | undefined;
    name: string | undefined;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, name }) => {

    return (
        <Link to={`/${name?.toLowerCase()}`} className="category-card">
            <img src={image} className='category-card__image'/>
            <h1 className='category-card__title'>{name}</h1>
        </Link>
    )
}

export default CategoryCard;