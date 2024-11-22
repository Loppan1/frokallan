import './EventCard.css'

interface EventCardProps {
    image: string;
    title: string;
    text: string;
}

const EventCard: React.FC<EventCardProps> = ({ image, title, text }) => {

    return (
        <div className='event-card' style={{ backgroundImage: `url(${image})`}}>
            <div className='event-card__button'>
                <h1 className='event-card__title'>{title}</h1>
                <h2 className='event-card__text'>{text}</h2>
            </div>
        </div>
    )
}

export default EventCard;