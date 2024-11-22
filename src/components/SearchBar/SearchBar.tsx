import { MdOutlineSearch } from "react-icons/md";
import './SearchBar.css'


const SearchBar = () => {

    return (
        <div className='search-bar'>
            <input 
                placeholder='Sök...'
             />
             <MdOutlineSearch size={24} className="search-bar__search-icon" />
        </div>
    )
}

export default SearchBar;