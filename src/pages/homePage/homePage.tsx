import { useSelector } from 'react-redux';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import EventCard from '../../components/EventCard/EventCard';
import './homePage.css'
import { RootState } from '../../store';

const HomePage = () => {


const email = useSelector((state: RootState) => state.contact.email);

console.log(email)

    return (
        <main className="home-page">
            <EventCard
                image='https://i.ibb.co/mc3ZT4G/free-photo-of-abundance-of-flowers-in-greenhouse-edit.jpg'
                title='Gröna Erbjudanden'
                text='Black week 25 nov - 1 dec'
            />
            <CategoryCard 
                image = 'https://i.ibb.co/G91DVh3/pexels-vuralyavas-1076607.jpg'
                name = 'Blommor' 
            />
            <CategoryCard 
                image = 'https://i.ibb.co/mSYrvzP/pexels-polina-tankilevitch-3872399.jpg'
                name = 'Grönsaker' 
            />
            <CategoryCard 
                image = 'https://i.ibb.co/ZhV9pp2/pexels-wendywei-1660533.jpg'
                name = 'Kryddor' 
            />
            <CategoryCard 
                image = 'https://i.ibb.co/ggMX2BP/pexels-nc-farm-bureau-mark-2889344.jpg'
                name = 'Lökar & Knölar' 
            />
            <CategoryCard 
                image = 'https://i.ibb.co/myb7rVk/pexels-julia-volk-5272938.jpg'
                name = 'Träd & Buskar' 
            />
        </main>
    )
}

export default HomePage;