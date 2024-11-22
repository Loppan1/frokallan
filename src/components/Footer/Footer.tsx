import './Footer.css'
import { FaInstagram, FaFacebookSquare  } from "react-icons/fa";

const Footer = () => {

    return (
        <footer>
            <section className='footer-content'>
                <article className='footer-content__info'>
                    <h2>Information</h2>
                    <a>Betalningssätt</a>
                    <a>Om oss</a>
                    <a>Presentkort</a>
                    <a>Köpvillkor</a>
                    <a>Råd om frösådd</a>
                    <a>Jobba hos oss</a>
                </article>
                <article className='footer-content__info'>
                    <h2>Hjälp</h2>
                    <a>Kundservice</a>
                    <a>Återförsäljare</a>
                    <a>GDPR</a>
                </article>
                <article className='footer-content__info'>
                    <h2>Kontaktuppgifter</h2>
                    <p>Frökällan ekologiska fröer <br/>
                    Postadress: Härnågonstans <br/>
                    Långbortistan <br/>
                    Org. nr: 42069-1337
                    </p>
                </article>
                <article className='footer-content__right'>
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

export default Footer;