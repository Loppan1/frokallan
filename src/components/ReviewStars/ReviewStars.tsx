import './ReviewStars.css'
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
 
interface ReviewStarsProps {
    stars: number;
}

const ReviewStars: React.FC<ReviewStarsProps>  = ({ stars }) => {
    const fullStars = Math.floor(stars);
    const halfStar = stars - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);


    return (
        <div className="review-stars">
            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={`full-${index}`}  size={25} />
            ))}
            {halfStar && <FaStarHalfAlt  size={25} />}
            {[...Array(emptyStars)].map((_, index) => (
                <FaRegStar key={`empty-${index}`} size={25}  />
            ))}
        </div>
    )
}

export default ReviewStars;