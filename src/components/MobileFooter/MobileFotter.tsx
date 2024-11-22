import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import './MobileFooter.css'

const MobileFooter = () => {
    
    return (
        <footer className='mobile-footer'>
            <section className='mobile-footer__content'>
                <article className='mobile-footer__content-info'>
                    <h2>Kontaktuppgifter</h2>
                    <p>Frökällan ekologiska fröer <br/>
                    Postadress: Härnågonstans <br/>
                    Långbortistan <br/>
                    Org. nr: 42069-1337
                    </p>
                </article>
                <article className='mobile-footer__content-info'>
                    <div className='footer-content__social-media'>
                        <FaInstagram size={36}/>
                        <FaFacebookSquare size={36} />
                        <p>Följ oss för inspiration</p>
                    </div>
                    <p>Ekologiska fröer från Långbortistan sedan 2024</p>
                </article>
            </section>
        </footer>
    )
}

export default MobileFooter