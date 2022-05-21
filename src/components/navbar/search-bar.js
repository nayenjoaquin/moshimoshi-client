import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MangaSuggestion from "./manga-suggestion";

const SearchBar = (props) => {

    const {mangas,setMangas,setLoading} = {...props}

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

    const handleSearchInputSubmit = (name) => {
        setLoading(true);
        const input = document.getElementById('search-manga-input');
        input.value=''
        if(suggestedSearch)setSuggestedSearch(false)
        fetch('https://moshimoshi-server.herokuapp.com/getMangasByName/'+name)
        .then(res=>res.json())
        .then(data=>{
            setMangas(data)
            setLoading(false)
        })
    }

    return(
        <div className="search-bar">
            <input className="search-input" placeholder="Buscar..." autoComplete="off" onChange={e=>{
                handleSearchInputChange(e.target.value)
            }} id='search-manga-input' onKeyDown={e=>{
                if(e.key==='Enter')handleSearchInputSubmit(e.target.value)
            }}></input>
            <div className="suggested-search-container">
                {
                    suggestedSearch
                    ?mangas.filter(manga => manga[0].toLowerCase().includes(searchValue.toLowerCase())).map((value,key)=>{
                        return <MangaSuggestion manga={value} key={key} handleSuggestionClick={handleSuggestionClick}/>
                    })
                    :<></>
                }
            </div>
        </div>
    )
}

export default SearchBar;