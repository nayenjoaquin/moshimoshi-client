import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MangaSuggestion from "./manga-suggestion";

const SearchBar = (props) => {

    const {mangasNameList} = {...props}

    const navigate = useNavigate()

    const [suggestedSearch, setSuggestedSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const handleSearchInputChange = (name) => {
        if(!suggestedSearch)setSuggestedSearch(true)
        else if(name==='') setSuggestedSearch(false)

        setSearchValue(name)
    }

    const handleSuggestionClick = (id) => {
        const input = document.getElementById('search-manga-input');
        input.value=''
        if(suggestedSearch)setSuggestedSearch(false)
        navigate("/product/"+id,{replace:true})
    }


    return(
        <div className="search-bar">
            <input className="search-input" placeholder="Buscar..." autoComplete="off" onChange={e=>{
                handleSearchInputChange(e.target.value)
            }} id='search-manga-input'></input>
            <div className="suggested-search-container">
                {
                    suggestedSearch
                    ?mangasNameList.filter(manga => manga[0].toLowerCase().includes(searchValue.toLowerCase())).map((value,key)=>{
                        return <MangaSuggestion manga={value} key={key} handleSuggestionClick={handleSuggestionClick}/>
                    })
                    :<></>
                }
            </div>
        </div>
    )
}

export default SearchBar;